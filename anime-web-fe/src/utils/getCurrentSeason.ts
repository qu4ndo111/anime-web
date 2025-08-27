export default function getCurrentSeason(): { year: number; season: 'winter' | 'spring' | 'summer' | 'fall' } {
  const now = new Date()
  const year = now.getFullYear()
  const month = now.getMonth() + 1

  let season: 'winter' | 'spring' | 'summer' | 'fall'
  if (month >= 1 && month <= 3) season = 'winter'
  else if (month >= 4 && month <= 6) season = 'spring'
  else if (month >= 7 && month <= 9) season = 'summer'
  else season = 'fall'

  return { year, season }
}