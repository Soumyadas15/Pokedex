export const configuration = {
  redis: {
    host: process.env.REDIS_HOST || "localhost",
    password: process.env.REDIS_PASSWORD || "",
    port: process.env.REDIS_PORT ? parseInt(process.env.REDIS_PORT, 10) : 6379,
  },
};