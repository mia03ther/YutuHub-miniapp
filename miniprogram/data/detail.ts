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
  /** Required disclosure for content produced or edited with AI assistance. */
  aiAssisted: boolean
}

export const DETAIL_MOCK_DATA: DetailItem[] = [
  {
    id: 'd_cat',
    type: '校园服务',
    typeKey: 'service',
    title: '教学楼自习座位分布 · 按时段整理',
    author: '阿其',
    avatar: '其',
    avatarTone: 'blue',
    school: '本校 · 材料学院',
    time: '昨天 18:20',
    content:
      '按一周三个时段记了两次自习室的使用情况，结论比想象的实际。\n\n上午 9:00-12:00：一教二楼靠窗一整排是空的，三教四楼最满。\n下午 14:00-17:00：一教三楼基本没人，四楼要抢。\n晚上 19:00-22:00：图书馆三楼静音区最紧张，建议提前一小时去，或者去一教五楼。\n\n带插座的座位：一教三楼、四楼靠墙那两排。\n安静程度：图书馆 > 一教四楼 > 一教三楼。\n\n表格是我自己记的，不同学院上课时间不一样，仅供参考。',
    imageCount: 0,
    tags: ['自习', '实用', '整理'],
    likes: 654,
    favorites: 288,
    commentCount: 96,
    aiAssisted: false
  },
  {
    id: 'd_service',
    type: '校园服务',
    typeKey: 'service',
    title: '宿舍网络报修 · 完整流程与常见误区',
    author: '沐与',
    avatar: '沐',
    avatarTone: 'orange',
    school: '本校 · 经济学院',
    time: '3 小时前',
    content:
      '宿舍网络连不上，按这个顺序排查，能省掉大半时间。\n\n第一步：确认是单台设备还是整间宿舍。\n只有你的设备断网，多半是网卡或路由器，重启后仍不行再报修。\n\n第二步：看楼道里的面板指示灯。\n灯灭说明是楼内交换机问题，直接报修，不用再折腾设置。\n\n第三步：确认账号状态。\n连上了但提示认证失败，多半是宽带到期或密码改了，去服务号里看状态就行。\n\n常见误区：\n· 反复重启电脑没用，重启的是墙上的网络面板才有用\n· 报修时把宿舍号写错是最拖时间的\n\n报修入口在宿舍楼的公告栏，也可以在服务号里提交。',
    imageCount: 0,
    tags: ['办事指南', '宿舍', '网络'],
    likes: 421,
    favorites: 176,
    commentCount: 73,
    aiAssisted: false
  },
  {
    id: 'd_study',
    type: '学习交流',
    typeKey: 'study',
    title: '期末速通 · 高数上下册重点整理',
    author: '林一一',
    avatar: '林',
    avatarTone: 'blue',
    school: '本校 · 计算机学院',
    time: '6 小时前',
    content:
      '把上学期的重点压缩成了 12 页讲义，配套 200 道精选题和学长手写批注。\n\n覆盖范围：\n· 极限与连续（含洛必达易错点）\n· 导数应用（中值定理证明题模板）\n· 多元微分（隐函数与条件极值）\n· 二重积分（坐标变换真题频次）\n\n建议先看讲末的易错清单再刷题，能省下至少三小时。\n\n祝各位都能顺利过关。',
    imageCount: 2,
    tags: ['高数', '期末', '资料共享'],
    likes: 876,
    favorites: 542,
    commentCount: 142,
    aiAssisted: false
  },
  {
    id: 'd_market',
    type: '技能交换',
    typeKey: 'market',
    title: '技能交换 · LaTeX 排版换前端部署',
    author: '纳比',
    avatar: '纳',
    avatarTone: 'purple',
    school: '本校 · 数学学院',
    time: '1 小时前',
    content:
      '我这边能教：\n· LaTeX 论文排版：参考文献格式、表格跨页、数学环境冲突\n· 三步解决编译卡住的问题\n\n想换：\n· 前端部署（Vercel / 域名配置），或者简历排版指导\n\n一对一线上约 40 分钟，双方确认完成后积分才结算。',
    imageCount: 0,
    tags: ['技能交换', 'LaTeX', '远程'],
    likes: 128,
    favorites: 64,
    commentCount: 31,
    aiAssisted: false
  },
  {
    id: 'd_ai',
    type: 'AI 工具',
    typeKey: 'ai',
    title: '用 AI 把一整学期笔记压成一页知识地图',
    author: '沈遇白',
    avatar: '沈',
    avatarTone: 'blue',
    school: '本校 · 人工智能学院',
    time: '昨天 09:05',
    content:
      '实测有效的四步提示词模板，论文和考研资料都能套用。\n\n第一步：先让 AI 输出章节骨架，不要直接总结\n第二步：逐章喂入原始笔记，要求输出「易错点 + 公式 + 例题」三段式\n第三步：要求生成 Anki 卡片格式，导入后每天刷 20 张\n第四步：让 AI 出三道跨章节综合题，检验是否真的串起来了\n\n最大的提升不是省时间，而是把零散笔记变成了可以反复调用的结构化资产。\n\n提示词模板放在评论区置顶。',
    imageCount: 2,
    tags: ['提示词', '效率', '收藏'],
    likes: 932,
    favorites: 610,
    commentCount: 158,
    aiAssisted: true
  },
  {
    id: 'd_project',
    type: '项目组队',
    typeKey: 'event',
    title: '组队招募 · 校园问答机器人',
    author: '林知远',
    avatar: '林',
    avatarTone: 'purple',
    school: '本校 · 计算机学院',
    time: '昨天 14:10',
    content:
      '想做一个能回答选课、办事流程问题的校园问答机器人。\n\n已完成：\n· 抓取了三个学院近两年的通知公告，共 400+篇\n· 搭好了基于检索增强的问答链路，命中准确率约七成\n· 前端用小程序原生写了个 demo\n\n还缺：\n· 熟悉向量检索的同学（会用 pgvector 就行）\n· 一位做交互设计的同学，帮忙改提问流程\n\n时间上比较宽松，按自己的节奏来。目标是把通知公告变成真的能问的答案。',
    imageCount: 2,
    tags: ['组队', 'AI', '小程序'],
    likes: 214,
    favorites: 158,
    commentCount: 47,
    aiAssisted: false
  },
  {
    id: 'd_service_map',
    type: '校园服务',
    typeKey: 'service',
    title: '校园办事地图 · 教务 / 财务 / 图书馆',
    author: '陈曦',
    avatar: '曦',
    avatarTone: 'mint',
    school: '本校 · 外国语学院',
    time: '3 天前',
    content:
      '按要办的事情整理，不是按部门排的。每个流程写清材料、窗口、线上能不能办。\n\n教务类：\n· 成绩复核：线上提交，申请后 5 个工作日内在教务系统查结果\n· 培养方案变更：需要纸质申请表 + 导师签字，线下窗口每周二四上午\n\n财务类：\n· 医保报销：把发票和病历一起上传，纸质件交到楼下的窗口\n· 学费缓交：线上申请，需要院系盖章的申请表\n\n图书馆类：\n· 借阅延期：在公众号里自助续，不用跑馆。\n\n每条都实地跑过一遍，流程可能有变，发现不对的直接评论。',
    imageCount: 3,
    tags: ['办事指南', '新生', '避坑'],
    likes: 742,
    favorites: 631,
    commentCount: 88,
    aiAssisted: false
  }
]

export const DETAIL_COMMENTS: Record<string, Comment[]> = {
  d_cat: [
    {
      id: 'c_01',
      author: '小满',
      avatar: '满',
      avatarTone: 'purple',
      content: '四楼确实空，上周去还找到靠窗的位置。',
      time: '2 小时前',
      likes: 24
    },
    {
      id: 'c_02',
      author: '南风',
      avatar: '南',
      avatarTone: 'mint',
      content: '插座位具体在几楼？我们那栋楼好像没有。',
      time: '1 小时前',
      likes: 8
    },
    {
      id: 'c_03',
      author: '阿其',
      avatar: '其',
      avatarTone: 'blue',
      content: '@南风 一教三楼和四楼靠墙两排，你们楼可能要去图书馆。',
      time: '40 分钟前',
      likes: 15
    }
  ],
  d_service: [
    {
      id: 'c_11',
      author: '沐与',
      avatar: '沐',
      avatarTone: 'orange',
      content: '补充：面板灯闪是接触不良，拧紧面板背面那颗螺丝就行。',
      time: '2 小时前',
      likes: 31
    },
    {
      id: 'c_12',
      author: '阿柚',
      avatar: '柚',
      avatarTone: 'pink',
      content: '账号到期这个最容易漏，服务号里的状态是准的。',
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
      content: '讲义已更新，补充了几道真题变式。',
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
      content: '@渐层 已加一节证明题模板，注意分类讨论的两种情况。',
      time: '2 小时前',
      likes: 18
    }
  ],
  d_market: [
    {
      id: 'c_31',
      author: '林一一',
      avatar: '林',
      avatarTone: 'purple',
      content: '可以教我 LaTeX 吗？我想排版开题报告。',
      time: '50 分钟前',
      likes: 4
    },
    {
      id: 'c_32',
      author: '纳比',
      avatar: '纳',
      avatarTone: 'purple',
      content: '我这周有空，约一次就行。',
      time: '20 分钟前',
      likes: 2
    }
  ],
  d_project: [
    {
      id: 'c_51',
      author: '陈曦',
      avatar: '曦',
      avatarTone: 'mint',
      content: '做交互设计，我可以，私信你。',
      time: '2 小时前',
      likes: 12
    },
    {
      id: 'c_52',
      author: '纳比',
      avatar: '纳',
      avatarTone: 'purple',
      content: '检索这块我能搭一版，先对齐数据格式再动手。',
      time: '1 小时前',
      likes: 18
    }
  ],
  d_service_map: [
    {
      id: 'c_61',
      author: '沐与',
      avatar: '沐',
      avatarTone: 'orange',
      content: '医保报销那部分已经过时了，今年改成线上全流程了。',
      time: '昨天 18:30',
      likes: 24
    },
    {
      id: 'c_62',
      author: '陈曦',
      avatar: '曦',
      avatarTone: 'mint',
      content: '收到，我核一下这周改掉。谢谢提醒。',
      time: '昨天 19:02',
      likes: 15
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
      author: '沈遇白',
      avatar: '沈',
      avatarTone: 'blue',
      content: '模板已置顶，评论区自取。后续会出一篇完整的对话示例。',
      time: '昨天 10:40',
      likes: 61
    }
  ]
}

export function findDetailById(id: string): DetailItem | undefined {
  return DETAIL_MOCK_DATA.find(item => item.id === id)
}
