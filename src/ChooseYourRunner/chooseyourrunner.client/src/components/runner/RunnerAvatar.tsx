import { useState } from 'react';
import type { TrainingLevel, Sex } from '../../types/models';

interface RunnerAvatarProps {
  age: number;
  sex: Sex;
  trainingLevel: TrainingLevel;
  side: 'left' | 'right';
}

function getAgeGroup(age: number): 'young' | 'mid' | 'veteran' {
  if (age <= 0 || age < 30) return 'young';
  if (age < 50) return 'mid';
  return 'veteran';
}

const images = import.meta.glob<{ default: string }>(
  '../../assets/runners/runner_*.webp',
  { eager: true }
);

function getImageUrl(sex: Sex, age: number, trainingLevel: TrainingLevel): string | null {
  const ageGroup = getAgeGroup(age);
  const level = trainingLevel.toLowerCase();
  const key = `../../assets/runners/runner_${sex}_${ageGroup}_${level}.webp`;
  return images[key]?.default ?? null;
}

const gradients = {
  left: 'linear-gradient(135deg, #1E3A8A 0%, #2563EB 50%, #3B82F6 100%)',
  right: 'linear-gradient(135deg, #9A3412 0%, #E84D1A 50%, #F97316 100%)',
};

export function RunnerAvatar({ age, sex, trainingLevel, side }: RunnerAvatarProps) {
  const [imgError, setImgError] = useState(false);

  const imageUrl = getImageUrl(sex, age, trainingLevel);
  const showImage = imageUrl && !imgError;

  return (
    <div
      style={{
        background: gradients[side],
        height: '380px',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {showImage ? (
        <img
          key={imageUrl}
          src={imageUrl}
          alt={`${sex} ${getAgeGroup(age)} ${trainingLevel} runner`}
          onError={() => setImgError(true)}
          style={{
            height: '95%',
            width: 'auto',
            objectFit: 'contain',
            filter: 'drop-shadow(0 4px 16px rgba(0,0,0,0.5))',
            transition: 'all 300ms ease',
          }}
        />
      ) : (
        <svg
          viewBox="0 0 64 64"
          style={{ width: '7rem', height: '7rem', opacity: 0.5, marginBottom: '4rem' }}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="32" cy="14" r="7" fill="white" />
          <path
            d="M26 22h12c2 0 3.5 1.5 3.5 3.5V38l5 10-3 1.5-5.5-9H32l-4 9-3-1.5 4.5-9.5V25.5C29.5 23.5 27.5 22 26 22z"
            fill="white"
          />
          <path
            d="M24 38l-5 8 3 1.5 5-7.5M40 38l4 8-3 1.5-4-7.5"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      )}
    </div>
  );
}
