/**
 * Detail page content and its comment threads.
 */

import type { Tone } from './brand'

export interface Comment {
  id: string
  author: string
  avatar: string
  avatarTone: Tone
  content: string
  time: string
  likes: number
}

export interface DetailItem {
  id: string
  type: string
  typeKey: string
  title: string
  author: string
  avatar: string
  avatarTone: Tone
  school: string
  time: string
  content: string
  imageCount: number
  tags: string[]
  likes: number
  favorites: number
  commentCount: number
}

export const DETAIL_MOCK_DATA: DetailItem[] = [
  {
    id: 'd_cat',
    type: '猫咪地图',
    typeKey: 'cat',
    title: '校园猫咪地图 · 5 个常驻点位实拍',
    author: '猫猫观测站',
    avatar: '猫',
    avatarTone: 'mint',
    school: '屿途大学 · 动学院',
    time: '昨天 18:20',
    content:
      '花了三周把校内 5 个固定出没点位全部实拍整理了一遍。\n\n1. 图书馆后花园三花 —— 中午 12:00-14:00，三楼连廊尽头花坛旁\n2. 教三草坪橘猫 —— 下午 16:00 后，喜欢躺在长椅晒太阳\n3. 体育馆侧门玳瑁 —— 晚上 19:30 前后出现，情绪稳定可摸\n4. 南门快递柜奶牛猫 —— 全天候，但中午会消失一小时\n5. 研究生院楼下白猫 —— 怕生，保持两米距离即可\n\n每一只都做过体检驱虫，性格稳定。欢迎补充你发现的点位。',
    imageCount: 3,
    tags: ['云吸猫', '出没时间', '实拍'],
    likes: 654,
    favorites: 288,
    commentCount: 96
  },
  {
    id: 'd_food',
    type: '校园美食',
    typeKey: 'food',
    title: '食堂测评 · 三楼那家被低估的窗口',
    author: '干饭第一名',
    avatar: '干',
    avatarTone: 'orange',
    school: '屿途大学 · 经管学院',
    time: '3 小时前',
    content:
      '试了整整两周，把三楼的窗口基本吃了一遍，结论有点意外。\n\n推荐：\n· 三楼最里侧的麻辣香锅 —— 15 元能装两碗饭，分量给得比一楼实在\n· 二楼转角的手擀面 —— 现擀现煮，排队 8 分钟左右\n· 一楼西侧的烧腊 —— 11 点半前去能买到最后一批\n\n避雷：靠门口那家麻辣烫，汤底重复，口味偏咸。\n\n人均预算控制在 20 元以内，学生党友好。',
    imageCount: 4,
    tags: ['食堂测评', '探店', '平价'],
    likes: 421,
    favorites: 176,
    commentCount: 73
  },
  {
    id: 'd_study',
    type: '学习交流',
    typeKey: 'study',
    title: '期末速通 · 高数上下册重点整理',
    author: '林一一',
    avatar: '林',
    avatarTone: 'blue',
    school: '屿途大学 · 计算机学院',
    time: '6 小时前',
    content:
      '把上学期的重点压缩成了 12 页讲义，配套 200 道精选题和学长手写批注。\n\n覆盖范围：\n· 极限与连续（含洛必达易错点）\n· 导数应用（中值定理证明题模板）\n· 多元微分（隐函数与条件极值）\n· 二重积分（坐标变换真题频次）\n\n建议先看讲末的易错清单再刷题，能省下至少三小时。\n\n祝各位都能顺利过关。',
    imageCount: 2,
    tags: ['高数', '期末', '资料共享'],
    likes: 876,
    favorites: 542,
    commentCount: 142
  },
  {
    id: 'd_market',
    type: '闲置交易',
    typeKey: 'market',
    title: '毕业清仓｜九成新机械键盘 送键帽',
    author: '屿途官方',
    avatar: '屿',
    avatarTone: 'orange',
    school: '屿途大学 · 计算机学院',
    time: '1 小时前',
    content:
      '宿舍搬迁出一把 cherry 轴机械键盘，87 键白色款。\n\n成色：九成新，半年内使用，无进灰无拔键，轴体手感正常\n附赠：原装键帽、PBT 二色键帽一套、收纳包\n价格：150 可小刀，仅限校内当面自提\n\n毕业季宿舍清仓高峰，后续还会陆续出闲置，欢迎留言蹲。',
    imageCount: 3,
    tags: ['闲置', '自提', '毕业季'],
    likes: 128,
    favorites: 64,
    commentCount: 31
  },
  {
    id: 'd_ai',
    type: 'AI 工具',
    typeKey: 'ai',
    title: '用 AI 把一整学期笔记压成一页知识地图',
    author: 'AI 小屿',
    avatar: 'AI',
    avatarTone: 'blue',
    school: '屿途大学 · 人工智能学院',
    time: '昨天 09:05',
    content:
      '实测有效的四步提示词模板，论文和考研资料都能套用。\n\n第一步：先让 AI 输出章节骨架，不要直接总结\n第二步：逐章喂入原始笔记，要求输出「易错点 + 公式 + 例题」三段式\n第三步：要求生成 Anki 卡片格式，导入后每天刷 20 张\n第四步：让 AI 出三道跨章节综合题，检验是否真的串起来了\n\n最大的提升不是省时间，而是把零散笔记变成了可以反复调用的结构化资产。\n\n提示词模板放在评论区置顶。',
    imageCount: 2,
    tags: ['提示词', '效率', '收藏'],
    likes: 932,
    favorites: 610,
    commentCount: 158
  }
]

export const DETAIL_COMMENTS: Record<string, Comment[]> = {
  d_cat: [
    {
      id: 'c_01',
      author: '小满',
      avatar: '满',
      avatarTone: 'purple',
      content: '教三那只橘猫昨天也在，抱着猫粮盆等我，绝了。',
      time: '2 小时前',
      likes: 24
    },
    {
      id: 'c_02',
      author: '南风',
      avatar: '南',
      avatarTone: 'mint',
      content: '求补研究生院那只是不是白瞳？我上周去只看到橘色的。',
      time: '1 小时前',
      likes: 8
    },
    {
      id: 'c_03',
      author: '猫猫观测站',
      avatar: '猫',
      avatarTone: 'mint',
      content: '@南风 白瞳白猫，别的那只是三花，下午三点左右最容易遇到。',
      time: '40 分钟前',
      likes: 15
    }
  ],
  d_food: [
    {
      id: 'c_11',
      author: '干饭第一名',
      avatar: '干',
      avatarTone: 'orange',
      content: '补充：周五中午三楼会多一个窗口卖煲仔饭，强烈推荐。',
      time: '2 小时前',
      likes: 31
    },
    {
      id: 'c_12',
      author: '阿柚',
      avatar: '柚',
      avatarTone: 'pink',
      content: '手擀面那个我加一，分量确实足，18 块吃到撑。',
      time: '1 小时前',
      likes: 12
    }
  ],
  d_study: [
    {
      id: 'c_21',
      author: '林一一',
      avatar: '林',
      avatarTone: 'purple',
      content: '讲义已更新，补充了三道 2024 真题的变式。',
      time: '5 小时前',
      likes: 46
    },
    {
      id: 'c_22',
      author: '渐层',
      avatar: '渐',
      avatarTone: 'blue',
      content: '中值定理那部分讲得太快了，有没有更细的拆解？',
      time: '3 小时前',
      likes: 9
    },
    {
      id: 'c_23',
      author: '林一一',
      avatar: '林',
      avatarTone: 'purple',
      content: '@渐层 已加一节证明题模板在第 8 页，注意分类讨论的两种情况。',
      time: '2 小时前',
      likes: 18
    }
  ],
  d_market: [
    {
      id: 'c_31',
      author: '屿途官方',
      avatar: '屿',
      avatarTone: 'orange',
      content: '150 我要了，明天下午图书馆门口自提可以吗？',
      time: '50 分钟前',
      likes: 4
    },
    {
      id: 'c_32',
      author: '键帽收藏家',
      avatar: '键',
      avatarTone: 'purple',
      content: 'PBT 二色键帽还有吗？分开出也行。',
      time: '20 分钟前',
      likes: 2
    }
  ],
  d_ai: [
    {
      id: 'c_41',
      author: '研一狗',
      avatar: '研',
      avatarTone: 'purple',
      content: '第二步的「易错点」输出是关键，用过之后笔记质量高很多。',
      time: '昨天 21:30',
      likes: 52
    },
    {
      id: 'c_42',
      author: 'Iris',
      avatar: 'Ir',
      avatarTone: 'pink',
      content: '第四步太真实了，跨章节题做不出来才发现自己其实没学会。',
      time: '昨天 19:12',
      likes: 37
    },
    {
      id: 'c_43',
      author: 'AI 小屿',
      avatar: 'AI',
      avatarTone: 'blue',
      content: '模板已置顶，评论区自取。后续会出一篇完整的对话示例。',
      time: '昨天 10:40',
      likes: 61
    }
  ]
}

export function findDetailById(id: string): DetailItem | undefined {
  return DETAIL_MOCK_DATA.find((item) => item.id === id)
}
