import {Mutex} from "async-mutex";

interface RateLimitOptions {
  // 调用间隔时间（默认 10s）
  intervalMs: number;
  // 最大重试次数
  maxRetries?: number;
  // 重试基础延迟时间
  retryDelayMs?: number;
  // 是否添加随机抖动
  jitter?: boolean;
}

export function withRateLimit<Args extends any[], Return>(
  fn: (...args: Args) => Promise<Return>,
  options: RateLimitOptions = {
    intervalMs: 10_000,
    maxRetries: 2,
    retryDelayMs: 1000,
    jitter: true
  }
) {
  const mutex = new Mutex();
  let lastCallTime = 0;
  let pendingDelay: Promise<void> | null = null;

  // 计算需要等待的时间
  const calculateDelay = () => {
    const elapsed = Date.now() - lastCallTime;
    return Math.max(options.intervalMs - elapsed, 0);
  };

  // 带抖动的延迟
  const delayed = (ms: number) => {
    if (options.jitter) {
      ms = ms * (0.8 + 0.4 * Math.random()); // 添加 20% 抖动
    }
    return new Promise<void>(resolve => setTimeout(resolve, ms));
  };

  return async (...args: Args): Promise<Return> => {
    const release = await mutex.acquire();

    try {
      // 处理重试逻辑
      let retries = 0;
      const maxRetries = options.maxRetries ?? 0;

      while (true) {
        try {
          // 等待必要的延迟时间
          const delay = calculateDelay();
          if (delay > 0) {
            pendingDelay = delayed(delay);
            await pendingDelay;
          }

          // 执行实际调用
          const result = await fn(...args);
          lastCallTime = Date.now();
          return result;
        } catch (error) {
          if (retries >= maxRetries) {
            throw error; // 重试次数用尽
          }

          // 计算重试延迟
          const retryDelay = (options.retryDelayMs ?? 1000) * (2 ** retries);
          await delayed(retryDelay);
          retries++;
        } finally {
          pendingDelay = null;
        }
      }
    } finally {
      release();
    }
  };
}
