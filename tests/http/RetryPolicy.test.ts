import { describe, it, expect, vi } from 'vitest';
import { RetryPolicy } from '../../src/http/RetryPolicy';

describe('RetryPolicy', () => {
  it('should not retry if max retries reached', () => {
    const policy = new RetryPolicy(3);
    expect(policy.shouldRetry(500, 3)).toBe(false);
  });

  it('should retry for safe failures', () => {
    const policy = new RetryPolicy(3);
    expect(policy.shouldRetry(429, 0)).toBe(true);
    expect(policy.shouldRetry(500, 0)).toBe(true);
    expect(policy.shouldRetry(503, 0)).toBe(true);
  });

  it('should not retry for client errors (other than 429)', () => {
    const policy = new RetryPolicy(3);
    expect(policy.shouldRetry(400, 0)).toBe(false);
    expect(policy.shouldRetry(401, 0)).toBe(false);
    expect(policy.shouldRetry(403, 0)).toBe(false);
    expect(policy.shouldRetry(404, 0)).toBe(false);
  });

  it('should calculate exponential backoff delay', () => {
    const policy = new RetryPolicy(3, 100, 5000);
    
    // Test base delay with no jitter to ensure base calculation is correct
    // (Jitter makes exact testing tricky, so we test bounds)
    const delay0 = policy.getDelay(0);
    expect(delay0).toBeGreaterThanOrEqual(100);
    expect(delay0).toBeLessThanOrEqual(120);

    const delay1 = policy.getDelay(1);
    expect(delay1).toBeGreaterThanOrEqual(200);
    expect(delay1).toBeLessThanOrEqual(240);
  });
});
