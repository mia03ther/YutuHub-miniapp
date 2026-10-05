import { PRIVACY_SECTIONS } from '../../data'
import type { LegalSectionView } from '../types'

Page({
  data: {
    sections: PRIVACY_SECTIONS as LegalSectionView[]
  },

  onShareAppMessage(): WechatMiniprogram.Page.ICustomShareContent {
    return {
      title: 'YutuHub 隐私保护指引',
      path: '/pages/index/index'
    }
  }
})
