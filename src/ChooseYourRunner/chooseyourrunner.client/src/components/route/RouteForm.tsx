import type { RouteInput } from '../../types/models';
import { HOLMENKOLLSTAFETTEN_LEGS } from '../../types/models';

interface RouteFormProps {
  route: RouteInput;
  onChange: (route: RouteInput) => void;
}

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

export function RouteForm({ route, onChange }: RouteFormProps) {
  const handlePresetChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const index = parseInt(e.target.value);
    if (index >= 0) {
      const leg = HOLMENKOLLSTAFETTEN_LEGS[index];
      onChange({ distanceKm: leg.distanceKm, elevationGainM: leg.elevationGainM });
    }
  };

  const matchedPreset = HOLMENKOLLSTAFETTEN_LEGS.findIndex(
    (leg) => leg.distanceKm === route.distanceKm && leg.elevationGainM === route.elevationGainM
  );

  const selectedLeg = matchedPreset >= 0 ? HOLMENKOLLSTAFETTEN_LEGS[matchedPreset] : null;

  return (
    <div
      className="animate-slide-up"
      data-size="sm"
      style={{
        background: 'white',
        borderRadius: '0.75rem',
        boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)',
        padding: '1.25rem',
      }}
    >
      <p style={{
        fontSize: '0.75rem',
        fontWeight: 600,
        textTransform: 'uppercase',
        letterSpacing: '0.1em',
        color: '#94A3B8',
        marginBottom: '1rem',
      }}>
        Holmenkollstafetten 2026
      </p>

      <select
        style={selectStyle}
        value={matchedPreset >= 0 ? String(matchedPreset) : ''}
        onChange={handlePresetChange}
      >
        <option value="">— Velg etappe / Choose a leg —</option>
        {HOLMENKOLLSTAFETTEN_LEGS.map((leg, i) => (
          <option key={i} value={String(i)}>
            {leg.label} ({leg.distanceKm} km, {leg.elevationGainM}m ↑, {leg.profile})
          </option>
        ))}
      </select>

      {selectedLeg && (
        <div style={{
          display: 'flex',
          gap: '1.5rem',
          marginTop: '0.75rem',
          fontSize: '0.8rem',
          color: '#64748B',
        }}>
          <span><strong style={{ color: '#1E293B' }}>{selectedLeg.distanceKm} km</strong> distance</span>
          <span><strong style={{ color: '#1E293B' }}>{selectedLeg.elevationGainM}m</strong> elevation</span>
          <span>{selectedLeg.profile}</span>
        </div>
      )}
    </div>
  );
}
