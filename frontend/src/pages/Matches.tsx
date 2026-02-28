import { matchHistory } from '../data/matchHistory';
import { Trophy, Skull, Zap, Clock, Map } from 'lucide-react';

const modeColors: Record<string, string> = {
  Classic: 'oklch(0.72 0.12 200)',
  'Clash Squad': 'oklch(0.72 0.19 42)',
  Ranked: 'oklch(0.82 0.18 80)',
};

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
}

export default function Matches() {
  return (
    <div className="h-full overflow-y-auto">
      <div className="p-4 space-y-4 pb-6">
        {/* Header */}
        <div>
          <h2
            className="text-lg font-bold tracking-widest uppercase"
            style={{ color: 'oklch(0.92 0.04 60)', fontFamily: 'Orbitron, sans-serif' }}
          >
            Match History
          </h2>
          <p
            className="text-xs mt-0.5"
            style={{ color: 'oklch(0.55 0.05 50)', fontFamily: 'Rajdhani, sans-serif' }}
          >
            {matchHistory.length} recent matches
          </p>
        </div>

        {/* Match List */}
        <div className="space-y-3">
          {matchHistory.map((match) => {
            const isBooyah = match.placement === 1;
            const modeColor = modeColors[match.mode] ?? 'oklch(0.55 0.05 50)';

            return (
              <div
                key={match.id}
                className="ff-card p-4 transition-all duration-200"
                style={
                  isBooyah
                    ? {
                        borderColor: 'oklch(0.82 0.18 80 / 0.6)',
                        boxShadow: '0 0 16px oklch(0.82 0.18 80 / 0.2)',
                        background: 'linear-gradient(135deg, oklch(0.12 0.02 30), oklch(0.13 0.025 55))',
                      }
                    : {}
                }
              >
                {/* Top Row */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    {/* Placement */}
                    {isBooyah ? (
                      <div
                        className="flex items-center gap-1.5 px-2.5 py-1 rounded"
                        style={{
                          background: 'oklch(0.82 0.18 80 / 0.15)',
                          border: '1px solid oklch(0.82 0.18 80 / 0.5)',
                        }}
                      >
                        <Trophy size={13} style={{ color: 'oklch(0.82 0.18 80)' }} />
                        <span
                          className="text-sm font-bold tracking-wide"
                          style={{
                            color: 'oklch(0.82 0.18 80)',
                            fontFamily: 'Orbitron, sans-serif',
                            textShadow: '0 0 8px oklch(0.82 0.18 80 / 0.6)',
                          }}
                        >
                          BOOYAH!
                        </span>
                      </div>
                    ) : (
                      <div
                        className="px-2.5 py-1 rounded"
                        style={{
                          background: 'oklch(0.14 0.02 30)',
                          border: '1px solid oklch(0.22 0.03 35)',
                        }}
                      >
                        <span
                          className="text-sm font-bold"
                          style={{ color: 'oklch(0.75 0.05 55)', fontFamily: 'Orbitron, sans-serif' }}
                        >
                          #{match.placement}
                        </span>
                      </div>
                    )}

                    {/* Map */}
                    <div className="flex items-center gap-1">
                      <Map size={12} style={{ color: 'oklch(0.55 0.05 50)' }} />
                      <span
                        className="text-sm font-semibold"
                        style={{ color: 'oklch(0.75 0.05 55)', fontFamily: 'Rajdhani, sans-serif' }}
                      >
                        {match.mapName}
                      </span>
                    </div>
                  </div>

                  {/* Mode Badge */}
                  <span
                    className="text-xs font-bold px-2 py-0.5 rounded"
                    style={{
                      background: `${modeColor.replace(')', ' / 0.12)')}`,
                      color: modeColor,
                      border: `1px solid ${modeColor.replace(')', ' / 0.35)')}`,
                      fontFamily: 'Rajdhani, sans-serif',
                    }}
                  >
                    {match.mode}
                  </span>
                </div>

                {/* Stats Row */}
                <div className="grid grid-cols-3 gap-2">
                  <div className="flex items-center gap-1.5">
                    <Skull size={13} style={{ color: 'oklch(0.58 0.22 25)' }} />
                    <div>
                      <div
                        className="text-base font-bold leading-none"
                        style={{ color: 'oklch(0.92 0.04 60)', fontFamily: 'Orbitron, sans-serif' }}
                      >
                        {match.kills}
                      </div>
                      <div
                        className="text-xs"
                        style={{ color: 'oklch(0.45 0.04 50)', fontFamily: 'Rajdhani, sans-serif' }}
                      >
                        Kills
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <Zap size={13} style={{ color: 'oklch(0.72 0.19 42)' }} />
                    <div>
                      <div
                        className="text-base font-bold leading-none"
                        style={{ color: 'oklch(0.92 0.04 60)', fontFamily: 'Orbitron, sans-serif' }}
                      >
                        {match.damageDealt.toLocaleString()}
                      </div>
                      <div
                        className="text-xs"
                        style={{ color: 'oklch(0.45 0.04 50)', fontFamily: 'Rajdhani, sans-serif' }}
                      >
                        Damage
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <Clock size={13} style={{ color: 'oklch(0.82 0.18 80)' }} />
                    <div>
                      <div
                        className="text-base font-bold leading-none"
                        style={{ color: 'oklch(0.92 0.04 60)', fontFamily: 'Orbitron, sans-serif' }}
                      >
                        {match.survivalTime}
                      </div>
                      <div
                        className="text-xs"
                        style={{ color: 'oklch(0.45 0.04 50)', fontFamily: 'Rajdhani, sans-serif' }}
                      >
                        Survived
                      </div>
                    </div>
                  </div>
                </div>

                {/* Timestamp */}
                <div
                  className="mt-2 pt-2 border-t text-xs"
                  style={{
                    borderColor: 'oklch(0.18 0.02 30)',
                    color: 'oklch(0.40 0.03 50)',
                    fontFamily: 'Rajdhani, sans-serif',
                  }}
                >
                  {formatDate(match.timestamp)}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
