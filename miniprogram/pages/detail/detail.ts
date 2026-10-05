/**
 * Detail page. Data is now fetched through the service layer so the page has
 * real loading / error / empty states, and every piece of content has a
 * reachable reporting entry point.
 */

import type { Comment, DetailItem } from '../../data'
import { DETAIL_MOCK_DATA, MOCK_USER } from '../../data'
import { fetchComments, fetchDetail } from '../../services/feed'
import { openReportSheet } from '../../services/report'

Page({
  data: {
    detail: DETAIL_MOCK_DATA[0] as DetailItem,
    paragraphs: [] as string[],
    images: [] as number[],
    comments: [] as Comment[],
    detailId: '',
    liked: false,
    favorited: false,
    likes: 0,
    favorites: 0,
    commentCount: 0,
    commentDraft: '',
    loading: true,
    error: '',
    commentsLoading: false,
    commentsError: '',
    me: MOCK_USER
  },

  onLoad(options: Record<string, string | undefined>) {
    const id = options && options.id ? options.id : DETAIL_MOCK_DATA[0].id
    this.setData({ detailId: id })
    void this.loadDetail()
    void this.loadComments()
  },

  onRetry() {
    this.setData({ loading: true, error: '' })
    void this.loadDetail()
  },

  onRetryComments() {
    void this.loadComments()
  },

  loadDetail(): Promise<void> {
    this.setData({ loading: true, error: '' })

    return fetchDetail(this.data.detailId)
      .then(detail => {
        this.setData({
          detail,
          paragraphs: detail.content
            .split('\n')
            .filter(line => line.length > 0),
          images: [1, 2, 3].slice(0, detail.imageCount),
          liked: false,
          favorited: false,
          likes: detail.likes,
          favorites: detail.favorites,
          commentCount: detail.commentCount,
          loading: false
        })
      })
      .catch((err: Error) => {
        this.setData({ loading: false, error: err.message })
      })
  },

  loadComments(): Promise<void> {
    this.setData({ commentsLoading: true, commentsError: '' })

    return fetchComments(this.data.detailId)
      .then(comments => {
        this.setData({ comments, commentsLoading: false })
      })
      .catch((err: Error) => {
        this.setData({ commentsLoading: false, commentsError: err.message })
      })
  },

  onToggleLike() {
    this.setData({
      liked: !this.data.liked,
      likes: this.data.liked ? this.data.likes - 1 : this.data.likes + 1
    })
  },

  onToggleFavorite() {
    this.setData({
      favorited: !this.data.favorited,
      favorites: this.data.favorited
        ? this.data.favorites - 1
        : this.data.favorites + 1
    })
  },

  onCommentInput(e: WechatMiniprogram.Input) {
    this.setData({ commentDraft: e.detail.value })
  },

  onSubmitComment() {
    const content = this.data.commentDraft.trim()
    if (!content) {
      wx.showToast({ title: '先写点什么吧', icon: 'none' })
      return
    }

    const comment: Comment = {
      id: `local_${Date.now()}`,
      author: this.data.me.nickname,
      avatar: '屿',
      avatarTone: 'purple',
      content,
      time: '刚刚',
      likes: 0
    }

    this.setData({
      comments: [comment, ...this.data.comments],
      commentCount: this.data.commentCount + 1,
      commentDraft: ''
    })
  },

  onImageTap() {
    wx.showToast({ title: '图片预览开发中', icon: 'none' })
  },

  onTypeTap() {
    const app = getApp<IAppOption>()
    app.globalData.pendingChannel = this.data.detail.typeKey
    wx.switchTab({ url: '/pages/explore/explore' })
  },

  onReportTap() {
    openReportSheet({ targetId: this.data.detailId, targetType: 'post' })
  },

  onReportComment(e: WechatMiniprogram.TouchEvent) {
    const id = String(e.currentTarget.dataset.id || '')
    if (!id) {
      return
    }
    openReportSheet({ targetId: id, targetType: 'comment' })
  },

  onShareAppMessage(): WechatMiniprogram.Page.ICustomShareContent {
    return {
      title: this.data.detail.title,
      path: `/pages/detail/detail?id=${this.data.detailId}`
    }
  }
})
