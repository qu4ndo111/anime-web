import { Cache } from 'cache-manager';

export async function getOrSetCache<T>(
  cacheManager: Cache,
  key: string,
  fetchFn: () => Promise<T>,
  ttl = 60,
): Promise<T> {
  const cached = await cacheManager.get<T>(key);
  if (cached) {
    return cached;
  }

  const result = await fetchFn();

  await cacheManager.set(key, result, ttl);

  return result;
}
