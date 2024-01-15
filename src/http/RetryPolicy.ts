export class RetryPolicy {
  private maxRetries: number;
  private baseDelayMs: number;
  private maxDelayMs: number;

  constructor(maxRetries = 3, baseDelayMs = 500, maxDelayMs = 10000) {
    this.maxRetries = maxRetries;
    this.baseDelayMs = baseDelayMs;
    this.maxDelayMs = maxDelayMs;
  }

  public shouldRetry(status: number, retryCount: number): boolean {
    if (retryCount >= this.maxRetries) {
      return false;
    }

    // Safe failures to retry: Rate limit, or 5xx server errors
    const retryableStatuses = [429, 500, 502, 503, 504];
    return retryableStatuses.includes(status);
  }

  public getDelay(retryCount: number): number {
    // Exponential backoff
    const delay = this.baseDelayMs * Math.pow(2, retryCount);
    
    // Add jitter (randomized 0-20% extra delay)
    const jitter = delay * 0.2 * Math.random();
    
    const finalDelay = delay + jitter;
    return Math.min(finalDelay, this.maxDelayMs);
  }

  public async wait(retryCount: number): Promise<void> {
    const delay = this.getDelay(retryCount);
    return new Promise((resolve) => setTimeout(resolve, delay));
  }
}
