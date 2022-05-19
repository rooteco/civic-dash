import { Redis } from "@upstash/redis"
export const redis = Redis.fromEnv()

export async function getFromRedis(redisKey: string): Promise<Any>{
  const value = await redis.get(redisKey)
  return value
}
