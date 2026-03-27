export function VsBadge() {
  return (
    <div className="animate-pop-in relative z-20 flex items-center justify-center"
         style={{ marginInline: '-1.25rem' }}>
      <div
        className="w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center"
        style={{
          background: 'linear-gradient(135deg, #D97706, #F59E0B, #FBBF24)',
          boxShadow: '0 0 20px rgba(245, 158, 11, 0.4)',
        }}
      >
        <span className="text-2xl md:text-3xl font-black text-white tracking-wider">
          VS
        </span>
      </div>
    </div>
  );
}
