import { Textfield, ToggleGroup } from '@digdir/designsystemet-react';
import type { RunnerInput, TrainingLevel, Sex } from '../../types/models';
import { TRAINING_LEVELS } from '../../types/models';

const selectStyle: React.CSSProperties = {
  width: '100%',
  padding: '0.5rem 0.75rem',
  borderRadius: '0.375rem',
  border: '1px solid #CBD5E1',
  fontSize: '0.875rem',
  color: '#1E293B',
  background: 'white',
  cursor: 'pointer',
};

interface RunnerFormProps {
  runner: RunnerInput;
  onChange: (runner: RunnerInput) => void;
  side: 'left' | 'right';
}

const labelStyle: React.CSSProperties = {
  fontSize: '0.8rem',
  fontWeight: 500,
  color: '#1E293B',
  marginBottom: '0.25rem',
  display: 'block',
};

const accentColors = {
  left: '#2563EB',
  right: '#E84D1A',
};

export function RunnerForm({ runner, onChange, side }: RunnerFormProps) {
  const accent = accentColors[side];

  return (
    <div
      data-size="sm"
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem',
        padding: '1rem 1.25rem 1.25rem',
        background: 'white',
      }}
    >
      {/* Name */}
      <Textfield
        label="Name"
        value={runner.name}
        onChange={(e) => onChange({ ...runner, name: e.target.value })}
        placeholder="Runner name"
      />

      {/* Age slider */}
      <div>
        <label style={labelStyle}>
          Age: <strong style={{ color: accent }}>{runner.age > 0 ? runner.age : '—'}</strong>
        </label>
        <input
          type="range"
          min={16}
          max={80}
          value={runner.age || 30}
          onChange={(e) => onChange({ ...runner, age: parseInt(e.target.value) })}
          style={{
            width: '100%',
            accentColor: accent,
            cursor: 'pointer',
            height: '6px',
          }}
        />
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          fontSize: '0.65rem',
          color: '#94A3B8',
          marginTop: '2px',
        }}>
          <span>16</span>
          <span>30</span>
          <span>50</span>
          <span>80</span>
        </div>
      </div>

      {/* Sex */}
      <div>
        <label style={labelStyle}>Sex</label>
        <ToggleGroup
          data-size="sm"
          value={runner.sex}
          onChange={(value) => onChange({ ...runner, sex: value as Sex })}
        >
          <ToggleGroup.Item value="male">Male</ToggleGroup.Item>
          <ToggleGroup.Item value="female">Female</ToggleGroup.Item>
        </ToggleGroup>
      </div>

      {/* Training Level */}
      <div>
        <label style={labelStyle}>Training Level</label>
        <select
          style={selectStyle}
          value={runner.trainingLevel}
          onChange={(e) => onChange({ ...runner, trainingLevel: e.target.value as TrainingLevel })}
        >
          {TRAINING_LEVELS.map((level) => (
            <option key={level} value={level}>{level}</option>
          ))}
        </select>
      </div>
    </div>
  );
}
