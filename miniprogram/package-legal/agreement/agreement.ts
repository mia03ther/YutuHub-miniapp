import { AGREEMENT_SECTIONS } from '../../data'
import type { LegalSectionView } from '../types'

Page({
  data: {
    sections: AGREEMENT_SECTIONS as LegalSectionView[]
  },

  onGoPoints() {
    wx.navigateTo({ url: '/package-legal/points/points' })
  },

  onShareAppMessage(): WechatMiniprogram.Page.ICustomShareContent {
    return {
      title: 'YutuHub 社区公约',
      path: '/pages/index/index'
    }
  }
})
