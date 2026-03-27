import type { RunnerInput } from '../../types/models';
import { RunnerAvatar } from './RunnerAvatar';
import { RunnerForm } from './RunnerForm';

interface RunnerPanelProps {
  side: 'left' | 'right';
  runner: RunnerInput;
  onChange: (runner: RunnerInput) => void;
}

export function RunnerPanel({ side, runner, onChange }: RunnerPanelProps) {
  const animationClass = side === 'left' ? 'animate-slide-in-left' : 'animate-slide-in-right';

  return (
    <div
      className={animationClass}
      style={{
        borderRadius: '0.75rem',
        boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -4px rgba(0,0,0,0.1)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <RunnerAvatar age={runner.age} sex={runner.sex} trainingLevel={runner.trainingLevel} side={side} />
      <RunnerForm runner={runner} onChange={onChange} side={side} />
    </div>
  );
}
