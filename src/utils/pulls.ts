export type BannerMap = Record<string, string | null | undefined>

export function mergePlayerBanners(oldData: BannerMap, newData: BannerMap): BannerMap {
  const result: BannerMap = { ...oldData }

  for (const key of Object.keys(newData)) {
    const newVal = newData[key]
    const oldVal = oldData[key]

    if (newVal == null || newVal === '') {
      // ignore empty updates, keep old value
      continue
    }

    // Try JSON array merge if both are arrays
    if (typeof newVal === 'string') {
      try {
        const parsedNew = JSON.parse(newVal)
        const parsedOld = typeof oldVal === 'string' ? JSON.parse(oldVal) : []
        if (Array.isArray(parsedNew) && Array.isArray(parsedOld)) {
          const merged = Array.from(new Set([...parsedOld, ...parsedNew]))
          result[key] = JSON.stringify(merged)
          continue
        }
      } catch {
        // not JSON arrays; fall through to overwrite with new string
      }
    }

    // Default: prefer the new value
    result[key] = newVal
  }

  return result
}
