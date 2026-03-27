import { useState } from 'react';
import type { RunnerInput, RouteInput } from '../../types/models';
import { useComparison } from '../../hooks/useComparison';
import { RunnerPanel } from '../runner/RunnerPanel';
import { VsBadge } from './VsBadge';
import { RouteForm } from '../route/RouteForm';
import { CompareButton } from '../CompareButton';
import { ComparisonResultDisplay } from '../result/ComparisonResult';
import logoSrc from '../../assets/logo.png';

const defaultRunnerA: RunnerInput = { name: '', age: 0, sex: 'male', trainingLevel: 'Regular' };
const defaultRunnerB: RunnerInput = { name: '', age: 0, sex: 'female', trainingLevel: 'Regular' };
const defaultRoute: RouteInput = { distanceKm: 0, elevationGainM: 0 };

export function MatchupScreen() {
  const [runnerA, setRunnerA] = useState<RunnerInput>(defaultRunnerA);
  const [runnerB, setRunnerB] = useState<RunnerInput>(defaultRunnerB);
  const [route, setRoute] = useState<RouteInput>(defaultRoute);
  const { status, result, error, compare } = useComparison();

  const isValid =
    runnerA.name.trim() !== '' &&
    runnerA.age >= 16 && runnerA.age <= 99 &&
    runnerB.name.trim() !== '' &&
    runnerB.age >= 16 && runnerB.age <= 99 &&
    route.distanceKm >= 0.1 && route.distanceKm <= 50;

  const handleCompare = () => {
    if (!isValid) return;
    compare({ runnerA, runnerB, route });
  };

  return (
    <div style={{ minHeight: '100vh', padding: '2rem 1rem' }}>
      <div style={{ maxWidth: '72rem', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        {/* Logo + Title */}
        <div style={{ textAlign: 'center' }}>
          <img
            src={logoSrc}
            alt="Choose Your Runner"
            style={{
              width: '64px',
              height: '64px',
              margin: '0 auto 0.75rem',
              filter: 'drop-shadow(0 2px 8px rgba(128, 0, 255, 0.4))',
            }}
          />
          <h1
            style={{
              fontSize: 'clamp(1.8rem, 5vw, 3rem)',
              fontWeight: 900,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              color: '#F8FAFC',
              textShadow: '0 2px 8px rgba(0,0,0,0.3)',
              margin: 0,
            }}
          >
            Choose Your Runners
          </h1>
        </div>

        {/* Runner panels + VS */}
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 0, position: 'relative' }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <RunnerPanel side="left" runner={runnerA} onChange={setRunnerA} />
          </div>
          <div style={{ position: 'relative', zIndex: 20, alignSelf: 'center' }}>
            <VsBadge />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <RunnerPanel side="right" runner={runnerB} onChange={setRunnerB} />
          </div>
        </div>

        {/* Route */}
        <RouteForm route={route} onChange={setRoute} />

        {/* Compare */}
        <CompareButton
          onClick={handleCompare}
          disabled={!isValid}
          loading={status === 'loading'}
        />

        {/* Error */}
        {status === 'error' && error && (
          <div
            className="animate-slide-up"
            style={{
              background: 'rgba(127, 29, 29, 0.5)',
              border: '1px solid rgba(239, 68, 68, 0.5)',
              color: '#FCA5A5',
              borderRadius: '0.5rem',
              padding: '1rem',
              textAlign: 'center',
              fontSize: '0.875rem',
            }}
          >
            {error}. Please check your inputs and try again.
          </div>
        )}

        {/* Results */}
        {status === 'success' && result && (
          <ComparisonResultDisplay result={result} />
        )}
      </div>
    </div>
  );
}
