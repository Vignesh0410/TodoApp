import { url } from "node:inspector";
import { createClient } from "redis";

export class RedisCache {
  private client = createClient({
    url: `redis://:${process.env.ELASTICACHE_PASSWORD}@${process.env.ELASTICACHE_ENDPOINT}:${process.env.ELASTICACHE_PORT}`,
  });

  constructor() {
    {
      this.client.on("connect", () => console.log("Redis connected"));

      this.client.on("error", (err) => {
        console.error("Redis Client Error", err);
      });
      this.client.connect();
    }
  }

  async exists(key: string): Promise<boolean> {
    const result = await this.client.exists(key);
    return result === 1;
  }

  async expire(key: string, ttl: number) {
    await this.client.expire(key, ttl);
  }

  async set(key: string, value: any, ttl: number = 3600) {
    await this.client.set(key, JSON.stringify(value), {
      EX: ttl,
    });
  }

  async get(key: string) {
    return await this.client.get(key);
  }

  async del(key: string) {
    await this.client.del(key);
  }

  async flush() {
    await this.client.flushAll();
  }

  async disconnect() {
    await this.client.disconnect();
  }
}
