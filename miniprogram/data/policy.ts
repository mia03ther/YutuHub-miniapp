/**
 * Legal and policy copy kept in the data layer so the pages stay presentational
 * and the wording is auditable in one place.
 */

import type { LegalSection } from './legal'

export const PRIVACY_SECTIONS: LegalSection[] = [
  {
    title: '我们收集什么',
    paragraphs: [
      '基础信息：微信昵称、头像、学校与院系。仅在你主动授权后收集，用于展示贡献者身份。',
      '内容数据：你发布的动态、评论、Wiki 修订记录。这部分由你主动提交，用于生成公开内容。',
      '设备信息：仅在出现崩溃时收集错误堆栈，不含通讯录与位置。'
    ]
  },
  {
    title: '我们不收集什么',
    paragraphs: [
      '不收集手机号、精确位置、通讯录、相册整体内容。',
      '不向第三方出售或共享个人信息。',
      '不使用你的内容训练模型。'
    ]
  },
  {
    title: '你如何控制',
    paragraphs: [
      '随时可以在「我的 → 设置 → 隐私设置」中撤回头像昵称授权。',
      '随时可以删除自己发布的内容，删除后贡献值同步扣减。',
      '联系邮箱：privacy@yutuhub.com，我们会在 15 个工作日内处理。'
    ]
  }
]

export const AGREEMENT_SECTIONS: LegalSection[] = [
  {
    title: '社区约定',
    paragraphs: [
      '这是一个知识沉淀社区，不是交易平台。任何形式的代写作业、代考、刷单一律封禁。',
      '不发布未授权的他人内容，引用他人资料需注明来源。',
      '涉及 AI 生成或改写的内容，必须在正文中标注。'
    ]
  },
  {
    title: '贡献值说明',
    paragraphs: [
      '贡献值记录你为社区沉淀的有效知识数量。',
      '贡献值不可提现、不可转让、不可购买。',
      '刷量行为一律清零并降级。'
    ]
  },
  {
    title: '内容处置',
    paragraphs: [
      '所有内容在发布前经过安全检测。',
      '任何人都可以举报，举报经核实后处理。',
      '违规内容按情节删除、限制发布或封禁账号。'
    ]
  }
]

export const POINTS_SECTIONS: LegalSection[] = [
  {
    title: '怎么获得',
    paragraphs: [
      '提交 AI 工具实测记录：+30',
      '发布或修订 Wiki 词条：+20',
      '完成一次技能交换：+40',
      '完成一次被采纳的社区审核：+15',
      '举报内容经核实：+10'
    ]
  },
  {
    title: '怎么扣减',
    paragraphs: [
      '内容被删除：按原贡献值扣减',
      '刷量被核实：清零并降级',
      '举报不成立且恶意举报：扣减 20'
    ]
  },
  {
    title: '等级与权益',
    paragraphs: [
      'Lv.1 探索者：注册即得，可发布与评论',
      'Lv.2 贡献者：200 贡献值，内容加精',
      'Lv.3 搭建者：800 贡献值，可创建 Wiki 词条',
      'Lv.4 领航员：2000 贡献值，可参与内容审核队列',
      'Lv.5 架构师：5000 贡献值，可发起站内活动'
    ]
  },
  {
    title: '重要声明',
    paragraphs: [
      '贡献值仅用于记录贡献，不具备货币价值，不可转让、不可提现、不可用于任何现金交易。'
    ]
  }
]

export const REPORT_CATEGORIES = [
  { value: 'porn', label: '色情低俗' },
  { value: 'political', label: '违法违规' },
  { value: 'ad', label: '广告或垃圾营销' },
  { value: 'plagiarism', label: '抄袭他人内容' },
  { value: 'fraud', label: '欺诈信息' },
  { value: 'abuse', label: '不友善或人身攻击' },
  { value: 'other', label: '其他' }
]

export const REPORT_DETAIL_OPTIONS = [
  { value: 'porn', label: '色情低俗内容' },
  { value: 'political', label: '违法违规内容' },
  { value: 'ad', label: '广告或垃圾营销' },
  { value: 'plagiarism', label: '抄袭他人内容' },
  { value: 'fraud', label: '欺诈信息' },
  { value: 'abuse', label: '不友善或人身攻击' },
  { value: 'other', label: '其他情况' }
]
