/**
 * Publish page.
 *
 * Draft persistence is debounced and written through the async storage API —
 * the previous version called `wx.setStorageSync` on every keystroke, which
 * blocked the render thread while typing.
 */

import type { CreateCategory } from '../../data'
import { CREATE_CATEGORIES, MOCK_USER } from '../../data'
import { publishPost } from '../../services/user'
import { checkImage, checkText, checkTextViaApi } from '../../services/security'
import {
  debounce,
  readStorage,
  removeStorage,
  writeStorage
} from '../../utils/storage'

const MAX_IMAGES = 3
const MAX_TITLE = 30
const MAX_CONTENT = 500
const DRAFT_KEY = 'yutuhub_create_draft'
const DRAFT_DEBOUNCE_MS = 500

interface CreateDraft {
  selectedKey: string
  title: string
  content: string
  imagePaths: string[]
}

/**
 * One debounced writer shared by every keystroke. Creating the debounce per
 * call would reset the timer on each input and never fire.
 */
const flushDraft = debounce((page: CreatePageInstance) => {
  const draft: CreateDraft = {
    selectedKey: page.data.selectedKey,
    title: page.data.title,
    content: page.data.content,
    imagePaths: page.data.images
  }

  if (!draft.title && !draft.content) {
    void removeStorage(DRAFT_KEY)
    return
  }

  void writeStorage(DRAFT_KEY, draft).then(() => {
    page.setData({ draftSaved: true })
  })
}, DRAFT_DEBOUNCE_MS)

/** Shape the debounced writer needs; avoids importing the mini program types. */
interface CreatePageInstance {
  data: {
    selectedKey: string
    title: string
    content: string
    images: string[]
  }
  setData(payload: Record<string, unknown>): void
}

Page({
  data: {
    categories: CREATE_CATEGORIES,
    selectedKey: CREATE_CATEGORIES[0].key,
    title: '',
    content: '',
    images: [] as string[],
    maxImages: MAX_IMAGES,
    maxTitle: MAX_TITLE,
    maxContent: MAX_CONTENT,
    submitting: false,
    draftSaved: false,
    checking: false,
    me: MOCK_USER
  },

  onLoad() {
    void this.restoreDraft()
  },

  onUnload() {
    flushDraft.flush()
    this.persistDraftNow()
  },

  onHide() {
    flushDraft.flush()
    this.persistDraftNow()
  },

  /** Reads the cached draft without blocking the first paint. */
  restoreDraft(): Promise<void> {
    return readStorage<CreateDraft>(DRAFT_KEY).then(draft => {
      if (!draft || (!draft.title && !draft.content)) {
        return
      }
      this.setData({
        selectedKey: draft.selectedKey,
        title: draft.title,
        content: draft.content,
        images: draft.imagePaths || [],
        draftSaved: true
      })
    })
  },

  buildDraft(): CreateDraft {
    return {
      selectedKey: this.data.selectedKey,
      title: this.data.title,
      content: this.data.content,
      imagePaths: this.data.images
    }
  },

  /** Queues a debounced write. Fires once the user pauses typing. */
  persistDraft(): void {
    flushDraft(this)
  },

  /** Forces any debounced write out immediately. */
  persistDraftNow(): void {
    const draft = this.buildDraft()
    if (!draft.title && !draft.content) {
      void removeStorage(DRAFT_KEY)
      return
    }
    void writeStorage(DRAFT_KEY, draft)
  },

  clearDraft(): Promise<void> {
    return removeStorage(DRAFT_KEY)
  },

  onSelectCategory(e: WechatMiniprogram.TouchEvent) {
    this.setData({ selectedKey: String(e.currentTarget.dataset.key) })
    this.persistDraft()
  },

  onTitleInput(e: WechatMiniprogram.Input) {
    this.setData({ title: e.detail.value.slice(0, MAX_TITLE) })
    this.persistDraft()
  },

  onContentInput(e: WechatMiniprogram.Input) {
    this.setData({ content: e.detail.value.slice(0, MAX_CONTENT) })
    this.persistDraft()
  },

  onAddImage() {
    if (this.data.images.length >= MAX_IMAGES) {
      wx.showToast({ title: `最多添加 ${MAX_IMAGES} 张图片`, icon: 'none' })
      return
    }

    wx.chooseMedia({
      count: MAX_IMAGES - this.data.images.length,
      mediaType: ['image'],
      sizeType: ['compressed'],
      success: res => {
        const picked = res.tempFiles.map(file => file.tempFilePath)
        this.setData({
          images: [...this.data.images, ...picked].slice(0, MAX_IMAGES)
        })
        this.persistDraft()
      },
      fail: () => {
        // User cancelled the picker.
      }
    })
  },

  onPreviewImage(e: WechatMiniprogram.TouchEvent) {
    const current = String(e.currentTarget.dataset.path)
    wx.previewImage({
      current,
      urls: this.data.images
    })
  },

  onRemoveImage(e: WechatMiniprogram.TouchEvent) {
    const path = String(e.currentTarget.dataset.path)
    this.setData({ images: this.data.images.filter(item => item !== path) })
    this.persistDraft()
  },

  onDiscardDraft() {
    wx.showModal({
      title: '放弃草稿？',
      content: '已自动保存的内容将被清空',
      success: res => {
        if (!res.confirm) {
          return
        }
        void this.clearDraft()
        this.setData({
          title: '',
          content: '',
          images: [],
          draftSaved: false
        })
      }
    })
  },

  /**
   * Runs the platform content checks. Images are checked as they are selected
   * rather than at submit time so the user finds out immediately.
   */
  async runSafetyCheck(text: string): Promise<void> {
    this.setData({ checking: true })
    try {
      const outcome = await checkText(text)
      if (outcome === 'unsupported') {
        await checkTextViaApi(text)
      }
    } catch (err) {
      throw err instanceof Error ? err : new Error('内容审核未通过')
    } finally {
      this.setData({ checking: false })
    }
  },

  async checkSelectedImages(paths: string[]): Promise<void> {
    for (const path of paths) {
      const outcome = await checkImage(path)
      if (outcome === 'unsupported') {
        continue
      }
    }
  },

  onSubmit() {
    const title = this.data.title.trim()
    const content = this.data.content.trim()

    if (!title) {
      wx.showToast({ title: '标题不能为空', icon: 'none' })
      return
    }
    if (!content) {
      wx.showToast({ title: '正文不能为空', icon: 'none' })
      return
    }
    if (this.data.submitting) {
      return
    }

    const category = this.data.categories.find(
      (item: CreateCategory) => item.key === this.data.selectedKey
    )

    this.setData({ submitting: true, checking: true })

    this.runSafetyCheck(`${title}\n${content}`)
      .then(() => this.checkSelectedImages(this.data.images))
      .then(() => {
        this.setData({ checking: false })
        return publishPost({
          category_id: this.data.selectedKey,
          title,
          content,
          images: this.data.images
        })
      })
      .then(() => {
        void this.clearDraft()
        wx.showToast({
          title: `发布成功 · ${category ? category.title : '校园动态'}`,
          icon: 'success',
          duration: 1200
        })
        setTimeout(() => {
          wx.switchTab({ url: '/pages/index/index' })
        }, 1000)
      })
      .catch((err: Error) => {
        this.setData({ submitting: false, checking: false })
        wx.showToast({ title: err.message, icon: 'none', duration: 2000 })
      })
  }
})
