/**
 * Second-hand marketplace domain.
 *
 * Kept separate from feed.ts because the real backend will model listings,
 * prices and campus-only pickup rules as their own resource.
 */

import { DETAIL_MOCK_DATA } from '../data'
import type { DetailItem } from '../data'
import { isMockMode, mockDelay, request } from './request'

export interface MarketQuery {
  keyword?: string
  maxPrice?: number
  page?: number
  limit?: number
}

export interface MarketResult {
  items: DetailItem[]
  total: number
  page: number
  limit: number
  hasMore: boolean
}

export interface MarketPublishInput {
  title: string
  content: string
  price: string
  images: string[]
}

const MARKET_CATEGORY = 'market'

/** GET /api/posts?category=market */
export function fetchMarketList(
  query: MarketQuery = {}
): Promise<MarketResult> {
  const page = query.page || 1
  const limit = query.limit || 20

  if (isMockMode()) {
    let all = DETAIL_MOCK_DATA.filter(
      (item) => item.typeKey === MARKET_CATEGORY
    ).map((item) => ({ ...item }))

    if (query.keyword) {
      const kw = query.keyword.toLowerCase()
      all = all.filter((item) => item.title.toLowerCase().includes(kw))
    }

    const start = (page - 1) * limit
    const items = all.slice(start, start + limit)

    return mockDelay<MarketResult>({
      items,
      total: all.length,
      page,
      limit,
      hasMore: start + items.length < all.length
    })
  }

  return request<MarketResult>({
    url: '/posts',
    data: {
      category: MARKET_CATEGORY,
      search: query.keyword,
      page,
      limit
    }
  })
}

/** GET /api/posts/:id restricted to marketplace listings. */
export function fetchMarketDetail(id: string): Promise<DetailItem> {
  if (isMockMode()) {
    const found = DETAIL_MOCK_DATA.find(
      (item) => item.id === id && item.typeKey === MARKET_CATEGORY
    )
    return mockDelay<DetailItem>(found || DETAIL_MOCK_DATA[0])
  }
  return request<DetailItem>({ url: `/posts/${id}` })
}

/** POST /api/posts — creates a marketplace listing. */
export function createMarketItem(
  input: MarketPublishInput
): Promise<{ id: number }> {
  if (isMockMode()) {
    return mockDelay({ id: Date.now() % 100000 })
  }
  return request<{ id: number }>({
    url: '/posts',
    method: 'POST',
    data: {
      category_id: 6,
      title: input.title,
      content: input.content,
      price: input.price,
      images: input.images
    }
  })
}