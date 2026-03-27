import type { ComparisonResult as ComparisonResultType } from '../../types/models';

interface ComparisonResultProps {
  result: ComparisonResultType;
}

function formatTime(timeStr: string): string {
  // Parse "HH:MM:SS" or "HH:MM:SS.fff" format from C# TimeSpan
  const parts = timeStr.split(':');
  if (parts.length >= 2) {
    const hours = parseInt(parts[0]);
    const minutes = parseInt(parts[1]);
    const seconds = Math.round(parseFloat(parts[2] || '0'));

    if (hours > 0) {
      return `${hours}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }
    return `${minutes}:${String(seconds).padStart(2, '0')}`;
  }
  return timeStr;
}

function formatPace(paceMinPerKm: number): string {
  const mins = Math.floor(paceMinPerKm);
  const secs = Math.round((paceMinPerKm - mins) * 60);
  return `${mins}:${String(secs).padStart(2, '0')}/km`;
}

function formatDifference(timeStr: string): string {
  const parts = timeStr.split(':');
  if (parts.length >= 2) {
    const hours = parseInt(parts[0]);
    const minutes = parseInt(parts[1]);
    const seconds = Math.round(parseFloat(parts[2] || '0'));
    const totalSeconds = hours * 3600 + minutes * 60 + seconds;

    if (totalSeconds < 60) return `${totalSeconds}s`;
    if (totalSeconds < 3600) {
      const m = Math.floor(totalSeconds / 60);
      const s = totalSeconds % 60;
      return s > 0 ? `${m}m ${s}s` : `${m}m`;
    }
    return formatTime(timeStr);
  }
  return timeStr;
}

export function ComparisonResultDisplay({ result }: ComparisonResultProps) {
  const isClose = !result.winnerName;
  const aIsWinner = result.winnerName === result.runnerA.name;
  const bIsWinner = result.winnerName === result.runnerB.name;

  return (
    <div className="animate-slide-up space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4 items-stretch">
        {/* Runner A result */}
        <div
          className={`rounded-xl p-5 text-center transition-all ${
            aIsWinner
              ? 'bg-gradient-to-br from-runner-a-dark/20 to-runner-a/10 border-2 border-accent animate-winner-glow'
              : 'bg-white border border-slate-200'
          }`}
        >
          <p className={`text-sm font-semibold uppercase tracking-wider mb-2 ${aIsWinner ? 'text-accent' : 'text-slate-400'}`}>
            {result.runnerA.name}
          </p>
          <p className={`text-4xl font-bold tabular-nums ${aIsWinner ? 'text-white' : 'text-text-primary'}`}>
            {formatTime(result.runnerA.predictedTime)}
          </p>
          <p className={`text-sm mt-1 ${aIsWinner ? 'text-slate-300' : 'text-slate-500'}`}>
            {formatPace(result.runnerA.paceMinPerKm)}
          </p>
          {aIsWinner && (
            <span className="inline-block mt-3 px-3 py-1 bg-accent text-slate-900 text-xs font-bold uppercase rounded-full">
              Winner
            </span>
          )}
        </div>

        {/* Difference */}
        <div className="flex flex-col items-center justify-center px-4 py-3">
          <p className="text-3xl font-bold text-accent tabular-nums">
            {formatDifference(result.timeDifference)}
          </p>
          <p className="text-xs text-slate-400 uppercase tracking-wider mt-1">
            {isClose ? 'apart' : 'faster'}
          </p>
        </div>

        {/* Runner B result */}
        <div
          className={`rounded-xl p-5 text-center transition-all ${
            bIsWinner
              ? 'bg-gradient-to-br from-runner-b-dark/20 to-runner-b/10 border-2 border-accent animate-winner-glow'
              : 'bg-white border border-slate-200'
          }`}
        >
          <p className={`text-sm font-semibold uppercase tracking-wider mb-2 ${bIsWinner ? 'text-accent' : 'text-slate-400'}`}>
            {result.runnerB.name}
          </p>
          <p className={`text-4xl font-bold tabular-nums ${bIsWinner ? 'text-white' : 'text-text-primary'}`}>
            {formatTime(result.runnerB.predictedTime)}
          </p>
          <p className={`text-sm mt-1 ${bIsWinner ? 'text-slate-300' : 'text-slate-500'}`}>
            {formatPace(result.runnerB.paceMinPerKm)}
          </p>
          {bIsWinner && (
            <span className="inline-block mt-3 px-3 py-1 bg-accent text-slate-900 text-xs font-bold uppercase rounded-full">
              Winner
            </span>
          )}
        </div>
      </div>

      {/* Summary */}
      <div className="text-center">
        <p className="inline-block px-6 py-3 bg-slate-800/80 rounded-lg text-slate-200 text-sm font-medium">
          {result.summary}
        </p>
      </div>
    </div>
  );
}
