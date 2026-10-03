/**
 * Brand tokens and home hero copy.
 */

export type Tone = 'purple' | 'orange' | 'mint' | 'pink' | 'blue'

export interface BrandInfo {
  name: string
  slogan: string
}

export const BRAND: BrandInfo = {
  name: '屿途校园',
  slogan: '发现校园里的每一份价值'
}

export function greetingByHour(hour: number): string {
  if (hour < 6) {
    return '夜深了，注意休息'
  }
  if (hour < 11) {
    return '早上好，今天也要元气满满'
  }
  if (hour < 14) {
    return '中午好，先去干饭吧'
  }
  if (hour < 18) {
    return '下午好，来点灵感'
  }
  return '晚上好，欢迎回到屿途'
}
