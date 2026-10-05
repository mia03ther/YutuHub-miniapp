import { POINTS_SECTIONS } from '../../data'
import type { LegalSectionView } from '../types'

Page({
  data: {
    sections: POINTS_SECTIONS as LegalSectionView[]
  },

  onShareAppMessage(): WechatMiniprogram.Page.ICustomShareContent {
    return {
      title: 'YutuHub 贡献值规则',
      path: '/pages/index/index'
    }
  }
})
