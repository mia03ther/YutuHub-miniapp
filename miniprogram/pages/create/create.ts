import {
  CREATE_CATEGORIES,
  CreateCategory,
  MOCK_USER
} from '../../data'
import { publishPost } from '../../services/user'

const MAX_IMAGES = 3
const MAX_TITLE = 30
const MAX_CONTENT = 500
const DRAFT_KEY = 'yutuhub_create_draft'

interface CreateDraft {
  selectedKey: string
  title: string
  content: string
}

Page({
  data: {
    categories: CREATE_CATEGORIES,
    selectedKey: CREATE_CATEGORIES[0].key,
    title: '',
    content: '',
    images: [] as number[],
    maxImages: MAX_IMAGES,
    maxTitle: MAX_TITLE,
    maxContent: MAX_CONTENT,
    submitting: false,
    draftSaved: false,
    me: MOCK_USER
  },

  onLoad() {
    const draft = this.readDraft()
    if (!draft) {
      return
    }
    this.setData({
      selectedKey: draft.selectedKey,
      title: draft.title,
      content: draft.content,
      draftSaved: true
    })
  },

  onUnload() {
    this.saveDraft()
  },

  readDraft(): CreateDraft | null {
    const stored = wx.getStorageSync(DRAFT_KEY)
    if (!stored || (!stored.title && !stored.content)) {
      return null
    }
    return stored as CreateDraft
  },

  saveDraft() {
    const draft: CreateDraft = {
      selectedKey: this.data.selectedKey,
      title: this.data.title,
      content: this.data.content
    }

    if (!draft.title && !draft.content) {
      wx.removeStorageSync(DRAFT_KEY)
      return
    }
    wx.setStorageSync(DRAFT_KEY, draft)
  },

  clearDraft() {
    wx.removeStorageSync(DRAFT_KEY)
  },

  onSelectCategory(e: WechatMiniprogram.TouchEvent) {
    const key = String(e.currentTarget.dataset.key)
    this.setData({ selectedKey: key })
    this.saveDraft()
  },

  onTitleInput(e: WechatMiniprogram.Input) {
    this.setData({ title: e.detail.value.slice(0, MAX_TITLE) })
    this.saveDraft()
  },

  onContentInput(e: WechatMiniprogram.Input) {
    this.setData({ content: e.detail.value.slice(0, MAX_CONTENT) })
    this.saveDraft()
  },

  onAddImage() {
    if (this.data.images.length >= MAX_IMAGES) {
      wx.showToast({ title: `最多添加 ${MAX_IMAGES} 张图片`, icon: 'none' })
      return
    }
    // Mock only — placeholder tiles, no media picker and no upload.
    const next = this.data.images.length + 1
    this.setData({ images: [...this.data.images, next] })
  },

  onRemoveImage(e: WechatMiniprogram.TouchEvent) {
    const index = Number(e.currentTarget.dataset.index)
    this.setData({
      images: this.data.images.filter((_, i) => i !== index)
    })
  },

  onDiscardDraft() {
    wx.showModal({
      title: '放弃草稿？',
      content: '已自动保存的内容将被清空',
      success: (res) => {
        if (!res.confirm) {
          return
        }
        this.clearDraft()
        this.setData({
          title: '',
          content: '',
          draftSaved: false
        })
      }
    })
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

    this.setData({ submitting: true })

    publishPost({
      category_id: this.data.selectedKey,
      title,
      content,
      images: []
    })
      .then(() => {
        this.clearDraft()
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
        this.setData({ submitting: false })
        wx.showToast({ title: err.message, icon: 'none' })
      })
  }
})