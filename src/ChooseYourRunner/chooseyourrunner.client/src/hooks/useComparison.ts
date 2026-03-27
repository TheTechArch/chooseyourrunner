import { useState, useCallback } from 'react';
import type { ComparisonRequest, ComparisonResult } from '../types/models';
import { compareRunners } from '../api/comparisonApi';

type Status = 'idle' | 'loading' | 'success' | 'error';

export function useComparison() {
  const [status, setStatus] = useState<Status>('idle');
  const [result, setResult] = useState<ComparisonResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const compare = useCallback(async (request: ComparisonRequest) => {
    setStatus('loading');
    setError(null);
    try {
      const data = await compareRunners(request);
      setResult(data);
      setStatus('success');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
      setStatus('error');
    }
  }, []);

  const reset = useCallback(() => {
    setStatus('idle');
    setResult(null);
    setError(null);
  }, []);

  return { status, result, error, compare, reset };
}
