/**
 * Skill-exchange domain.
 *
 * Kept separate from feed.ts because the real backend will model exchange
 * offers (what you can teach, what you want in return) as their own resource.
 */

import { DETAIL_MOCK_DATA } from '../data'
import type { DetailItem } from '../data'
import { isMockMode, mockDelay, request } from './request'

export interface SkillQuery {
  keyword?: string
  category?: string
  page?: number
  limit?: number
}

export interface SkillResult {
  items: DetailItem[]
  total: number
  page: number
  limit: number
  hasMore: boolean
}

export interface SkillOfferInput {
  title: string
  /** What the author is able to teach. */
  canTeach: string
  /** What the author wants in return. */
  wantsInReturn: string
  images: string[]
}

const SKILL_CATEGORY = 'market'

/** GET /api/posts?category=market */
export function fetchSkillList(query: SkillQuery = {}): Promise<SkillResult> {
  const page = query.page || 1
  const limit = query.limit || 20

  if (isMockMode()) {
    let all = DETAIL_MOCK_DATA.filter(
      item => item.typeKey === SKILL_CATEGORY
    ).map(item => ({ ...item }))

    if (query.keyword) {
      const kw = query.keyword.toLowerCase()
      all = all.filter(item => item.title.toLowerCase().includes(kw))
    }
    if (query.category) {
      all = all.filter(item => item.type === query.category)
    }

    const start = (page - 1) * limit
    const items = all.slice(start, start + limit)

    return mockDelay<SkillResult>({
      items,
      total: all.length,
      page,
      limit,
      hasMore: start + items.length < all.length
    })
  }

  return request<SkillResult>({
    url: '/posts',
    data: {
      category: query.category || SKILL_CATEGORY,
      search: query.keyword,
      page,
      limit
    }
  })
}

/** GET /api/posts/:id restricted to skill-exchange offers. */
export function fetchSkillDetail(id: string): Promise<DetailItem> {
  if (isMockMode()) {
    const found = DETAIL_MOCK_DATA.find(
      item => item.id === id && item.typeKey === SKILL_CATEGORY
    )
    return mockDelay<DetailItem>(found || DETAIL_MOCK_DATA[0])
  }
  return request<DetailItem>({ url: `/posts/${id}` })
}

/** POST /api/posts — creates a skill-exchange offer. */
export function createSkillOffer(
  input: SkillOfferInput
): Promise<{ id: number }> {
  if (isMockMode()) {
    return mockDelay({ id: Date.now() % 100000 })
  }
  return request<{ id: number }>({
    url: '/posts',
    method: 'POST',
    data: {
      category_id: SKILL_CATEGORY,
      title: input.title,
      content: `${input.canTeach}\n\n想换：${input.wantsInReturn}`,
      images: input.images
    }
  })
}
