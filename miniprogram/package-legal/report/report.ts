import { REPORT_DETAIL_OPTIONS } from '../../data'
import { submitReport } from '../../services/report'
import type { ReportReason } from '../../services/report'
import type { OptionView } from '../types'

Page({
  data: {
    categories: REPORT_DETAIL_OPTIONS as OptionView[],
    selected: '' as string,
    note: '',
    submitting: false,
    targetId: '',
    targetType: 'post' as 'post' | 'comment'
  },

  onLoad(options: Record<string, string | undefined>) {
    this.setData({
      targetId: options && options.id ? options.id : '',
      targetType: options && options.type === 'comment' ? 'comment' : 'post'
    })
  },

  onSelect(e: WechatMiniprogram.TouchEvent) {
    this.setData({ selected: String(e.currentTarget.dataset.value) })
  },

  onNoteInput(e: WechatMiniprogram.Input) {
    this.setData({ note: e.detail.value.slice(0, 200) })
  },

  onSubmit() {
    if (!this.data.selected) {
      wx.showToast({ title: '请选择举报原因', icon: 'none' })
      return
    }
    if (!this.data.targetId) {
      wx.showToast({ title: '缺少内容标识', icon: 'none' })
      return
    }
    if (this.data.submitting) {
      return
    }

    this.setData({ submitting: true })
    wx.showLoading({ title: '提交中', mask: true })

    submitReport({
      targetId: this.data.targetId,
      targetType: this.data.targetType,
      reason: this.data.selected as ReportReason,
      detail: this.data.note.trim() || undefined
    })
      .then(() => {
        wx.hideLoading()
        wx.showToast({
          title: '已收到，我们会尽快处理',
          icon: 'none',
          duration: 1800
        })
        setTimeout(() => {
          wx.navigateBack()
        }, 1200)
      })
      .catch((err: Error) => {
        wx.hideLoading()
        this.setData({ submitting: false })
        wx.showToast({ title: err.message, icon: 'none', duration: 2000 })
      })
  }
})
