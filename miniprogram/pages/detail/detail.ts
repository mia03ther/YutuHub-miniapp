import {
  Comment,
  DETAIL_COMMENTS,
  DETAIL_MOCK_DATA,
  DetailItem,
  MOCK_USER,
  findDetailById
} from '../../data'

Page({
  data: {
    detail: DETAIL_MOCK_DATA[0],
    paragraphs: [] as string[],
    images: [] as number[],
    comments: [] as Comment[],
    liked: false,
    favorited: false,
    likes: 0,
    favorites: 0,
    commentCount: 0,
    commentDraft: '',
    me: MOCK_USER
  },

  onLoad(options: Record<string, string | undefined>) {
    const id = options ? options.id : undefined
    const detail: DetailItem =
      (id ? findDetailById(id) : undefined) || DETAIL_MOCK_DATA[0]

    this.setData({
      detail,
      paragraphs: detail.content.split('\n').filter((line) => line.length > 0),
      images: [1, 2, 3].slice(0, detail.imageCount),
      comments: DETAIL_COMMENTS[detail.id] || [],
      liked: false,
      favorited: false,
      likes: detail.likes,
      favorites: detail.favorites,
      commentCount: detail.commentCount
    })
  },

  onToggleLike() {
    const liked = !this.data.liked
    this.setData({
      liked,
      likes: liked ? this.data.likes + 1 : this.data.likes - 1
    })
  },

  onToggleFavorite() {
    const favorited = !this.data.favorited
    this.setData({
      favorited,
      favorites: favorited ? this.data.favorites + 1 : this.data.favorites - 1
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
  }
})