interface CompareButtonProps {
  onClick: () => void;
  disabled: boolean;
  loading: boolean;
}

export function CompareButton({ onClick, disabled, loading }: CompareButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <button
        onClick={onClick}
        disabled={isDisabled}
        style={{
          width: '100%',
          maxWidth: '28rem',
          padding: '1rem 2rem',
          borderRadius: '0.5rem',
          border: 'none',
          fontWeight: 700,
          fontSize: '1.125rem',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          cursor: isDisabled ? 'not-allowed' : 'pointer',
          background: isDisabled
            ? '#475569'
            : 'linear-gradient(to right, #D97706, #F59E0B, #FBBF24)',
          color: isDisabled ? '#94A3B8' : '#0F172A',
          transition: 'all 150ms',
          transform: 'scale(1)',
          boxShadow: isDisabled ? 'none' : '0 0 15px rgba(245, 158, 11, 0.3)',
        }}
        onMouseEnter={(e) => {
          if (!isDisabled) {
            e.currentTarget.style.transform = 'scale(1.05)';
            e.currentTarget.style.boxShadow = '0 0 25px rgba(245, 158, 11, 0.5)';
          }
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.boxShadow = isDisabled ? 'none' : '0 0 15px rgba(245, 158, 11, 0.3)';
        }}
      >
        {loading ? (
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
            <svg style={{ animation: 'spin 1s linear infinite', height: '1.25rem', width: '1.25rem' }} viewBox="0 0 24 24">
              <circle style={{ opacity: 0.25 }} cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path style={{ opacity: 0.75 }} fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Comparing...
          </span>
        ) : (
          'Compare'
        )}
      </button>
    </div>
  );
}
