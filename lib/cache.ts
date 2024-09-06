import { createRedisInstance, POKEMON_CACHE_EXPIRY } from "@/lib/redis";

const redis = createRedisInstance();

export const getCachedPokemon = async (key: string) => {
  const cachedData = await redis.get(key);
  return cachedData ? JSON.parse(cachedData) : null;
};

export const setCachedPokemon = async (key: string, data: any) => {
  await redis.set(key, JSON.stringify(data), "EX", POKEMON_CACHE_EXPIRY);
};