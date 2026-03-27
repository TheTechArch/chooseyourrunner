import type { ComparisonRequest, ComparisonResult } from '../types/models';

export async function compareRunners(request: ComparisonRequest): Promise<ComparisonResult> {
  const response = await fetch('/api/comparison', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => null);
    throw new Error(error?.errors?.[0] ?? 'Comparison failed');
  }

  return response.json();
}
