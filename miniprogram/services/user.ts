/**
 * Profile reads and content publishing.
 */

import { MOCK_USER } from '../data'
import type { FeedItem } from '../data'
import { isMockMode, mockDelay, request } from './request'
import type { CurrentUser } from './auth'
import { readStorage, writeStorage } from '../utils/storage'

const PROFILE_KEY = 'yutuhub_profile'

export interface ProfilePatch {
  nickname?: string
  avatar?: string
  school?: string
  signature?: string
}

export interface PublishInput {
  category_id: string
  title: string
  content: string
  images: string[]
}

/** Reads the cached profile first so the page paints instantly. */
export function getCachedProfile(): Promise<CurrentUser | null> {
  return readStorage<CurrentUser>(PROFILE_KEY).then(stored =>
    stored && stored.nickname ? stored : null
  )
}

export function saveCachedProfile(user: CurrentUser): Promise<void> {
  return writeStorage(PROFILE_KEY, user)
}

/** GET /api/users/me */
export function fetchProfile(): Promise<CurrentUser> {
  if (isMockMode()) {
    return mockDelay<CurrentUser>({ ...MOCK_USER })
  }
  return request<CurrentUser>({ url: '/users/me' })
}

/** PATCH /api/users/me */
export function updateProfile(patch: ProfilePatch): Promise<CurrentUser> {
  if (isMockMode()) {
    return mockDelay<CurrentUser>({ ...MOCK_USER, ...patch })
  }
  return request<CurrentUser>({
    url: '/users/me',
    method: 'PUT',
    data: patch
  })
}

/** GET /api/users/me/posts */
export function fetchMyPosts(): Promise<FeedItem[]> {
  if (isMockMode()) {
    return mockDelay<FeedItem[]>([])
  }
  return request<FeedItem[]>({ url: '/users/me/posts' })
}

/**
 * POST /api/posts
 * Returns the new post id so the caller can navigate to it.
 */
export function publishPost(input: PublishInput): Promise<{ id: number }> {
  if (isMockMode()) {
    return mockDelay({ id: Date.now() % 100000 })
  }
  return request<{ id: number }>({
    url: '/posts',
    method: 'POST',
    data: {
      category_id: Number(input.category_id),
      title: input.title,
      content: input.content,
      images: input.images
    }
  })
}
