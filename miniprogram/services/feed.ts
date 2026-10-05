/**
 * Feed, detail and recommendation reads plus like / favourite mutations.
 */

import {
  DETAIL_COMMENTS,
  DETAIL_MOCK_DATA,
  FEED_ITEMS,
  RECOMMEND_ITEMS,
  findDetailById
} from '../data'
import type { Comment, DetailItem, FeedItem, RecommendItem } from '../data'
import { isMockMode, mockDelay, request } from './request'

export type FeedSort = 'recommended' | 'latest' | 'most_liked'

export interface FeedQuery {
  channel?: string
  keyword?: string
  sort?: FeedSort
  page?: number
  limit?: number
}

export interface FeedResult {
  items: FeedItem[]
  total: number
  page: number
  limit: number
  hasMore: boolean
}

function filterMockFeed(query: FeedQuery): FeedItem[] {
  let items = FEED_ITEMS.map(item => ({ ...item }))

  if (query.channel) {
    items = items.filter(item => item.channel === query.channel)
  }
  if (query.keyword) {
    const kw = query.keyword.toLowerCase()
    items = items.filter(
      item =>
        item.title.toLowerCase().includes(kw) ||
        item.summary.toLowerCase().includes(kw)
    )
  }

  const sort = query.sort || 'recommended'
  if (sort === 'most_liked') {
    items.sort((a, b) => b.likes - a.likes)
  } else if (sort === 'latest') {
    items.reverse()
  }

  return items
}

/** GET /api/posts */
export function fetchFeed(query: FeedQuery = {}): Promise<FeedResult> {
  const page = query.page || 1
  const limit = query.limit || 20

  if (isMockMode()) {
    const all = filterMockFeed(query)
    const start = (page - 1) * limit
    const items = all.slice(start, start + limit)
    return mockDelay<FeedResult>({
      items,
      total: all.length,
      page,
      limit,
      hasMore: start + items.length < all.length
    })
  }

  return request<FeedResult>({
    url: '/posts',
    data: {
      channel: query.channel,
      search: query.keyword,
      sort: query.sort,
      page,
      limit
    }
  })
}

/** GET /api/posts/:id */
export function fetchDetail(id: string): Promise<DetailItem> {
  if (isMockMode()) {
    const found = findDetailById(id)
    return mockDelay<DetailItem>(found ? { ...found } : DETAIL_MOCK_DATA[0])
  }
  return request<DetailItem>({ url: `/posts/${id}` })
}

/** GET /api/posts/:id/comments */
export function fetchComments(id: string): Promise<Comment[]> {
  if (isMockMode()) {
    const list = DETAIL_COMMENTS[id] || []
    return mockDelay<Comment[]>(list.map(item => ({ ...item })))
  }
  return request<Comment[]>({ url: `/posts/${id}/comments` })
}

/** POST /api/posts/:id/like */
export function setLiked(
  id: string,
  liked: boolean
): Promise<{ likes: number }> {
  if (isMockMode()) {
    const found = findDetailById(id)
    const base = found ? found.likes : 0
    return mockDelay({ likes: liked ? base + 1 : base })
  }
  return request<{ likes: number }>({
    url: `/posts/${id}/like`,
    method: 'POST',
    data: { liked }
  })
}

/** POST /api/posts/:id/favorite */
export function setFavorited(
  id: string,
  favorited: boolean
): Promise<{ favorites: number }> {
  if (isMockMode()) {
    const found = findDetailById(id)
    const base = found ? found.favorites : 0
    return mockDelay({ favorites: favorited ? base + 1 : base })
  }
  return request<{ favorites: number }>({
    url: `/posts/${id}/favorite`,
    method: 'POST',
    data: { favorited }
  })
}

/** Home page recommendation rail, optionally narrowed to one group. */
export function fetchRecommends(group?: string): Promise<RecommendItem[]> {
  if (isMockMode()) {
    const items = group
      ? RECOMMEND_ITEMS.filter(item => item.group === group)
      : RECOMMEND_ITEMS
    return mockDelay<RecommendItem[]>(items.map(item => ({ ...item })))
  }
  return request<RecommendItem[]>({
    url: '/recommends',
    data: { group }
  })
}
