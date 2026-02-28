import { characters } from '../data/characters';
import { Zap, Shield, Clock } from 'lucide-react';

export default function Characters() {
  return (
    <div className="h-full overflow-y-auto">
      <div className="p-4 space-y-4 pb-6">
        {/* Header */}
        <div>
          <h2
            className="text-lg font-bold tracking-widest uppercase"
            style={{ color: 'oklch(0.92 0.04 60)', fontFamily: 'Orbitron, sans-serif' }}
          >
            Characters
          </h2>
          <p
            className="text-xs mt-0.5"
            style={{ color: 'oklch(0.55 0.05 50)', fontFamily: 'Rajdhani, sans-serif' }}
          >
            {characters.length} characters available
          </p>
        </div>

        {/* Characters Grid */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {characters.map((char) => {
            const isActive = char.type === 'Active';
            const accentColor = isActive ? 'oklch(0.72 0.19 42)' : 'oklch(0.72 0.12 200)';
            const accentGlow = isActive
              ? 'oklch(0.72 0.19 42 / 0.3)'
              : 'oklch(0.72 0.12 200 / 0.3)';

            return (
              <div
                key={char.id}
                className="ff-card p-4 space-y-3 transition-all duration-200"
                style={{
                  borderColor: `${accentColor.replace(')', ' / 0.3)')}`,
                }}
              >
                {/* Character Header */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{
                        background: `${accentColor.replace(')', ' / 0.12)')}`,
                        border: `1px solid ${accentColor.replace(')', ' / 0.4)')}`,
                        boxShadow: `0 0 8px ${accentGlow}`,
                      }}
                    >
                      {isActive ? (
                        <Zap size={16} style={{ color: accentColor }} />
                      ) : (
                        <Shield size={16} style={{ color: accentColor }} />
                      )}
                    </div>
                    <div>
                      <h3
                        className="text-sm font-bold tracking-wide leading-tight"
                        style={{ color: 'oklch(0.92 0.04 60)', fontFamily: 'Orbitron, sans-serif' }}
                      >
                        {char.name}
                      </h3>
                      <p
                        className="text-xs font-semibold"
                        style={{ color: accentColor, fontFamily: 'Rajdhani, sans-serif' }}
                      >
                        {char.abilityName}
                      </p>
                    </div>
                  </div>
                  <span
                    className="text-xs font-bold px-2 py-0.5 rounded flex-shrink-0"
                    style={{
                      background: `${accentColor.replace(')', ' / 0.12)')}`,
                      color: accentColor,
                      border: `1px solid ${accentColor.replace(')', ' / 0.35)')}`,
                      fontFamily: 'Rajdhani, sans-serif',
                    }}
                  >
                    {char.type}
                  </span>
                </div>

                {/* Description */}
                <p
                  className="text-xs leading-relaxed"
                  style={{ color: 'oklch(0.65 0.04 55)', fontFamily: 'Rajdhani, sans-serif' }}
                >
                  {char.abilityDescription}
                </p>

                {/* Cooldown / Duration */}
                {(char.cooldown || char.duration) && (
                  <div className="flex gap-3 pt-1 border-t" style={{ borderColor: 'oklch(0.18 0.02 30)' }}>
                    {char.cooldown && (
                      <div className="flex items-center gap-1">
                        <Clock size={11} style={{ color: 'oklch(0.55 0.05 50)' }} />
                        <span
                          className="text-xs"
                          style={{ color: 'oklch(0.55 0.05 50)', fontFamily: 'Rajdhani, sans-serif' }}
                        >
                          CD: <span style={{ color: 'oklch(0.82 0.18 80)', fontWeight: 700 }}>{char.cooldown}</span>
                        </span>
                      </div>
                    )}
                    {char.duration && (
                      <div className="flex items-center gap-1">
                        <Zap size={11} style={{ color: 'oklch(0.55 0.05 50)' }} />
                        <span
                          className="text-xs"
                          style={{ color: 'oklch(0.55 0.05 50)', fontFamily: 'Rajdhani, sans-serif' }}
                        >
                          Dur: <span style={{ color: 'oklch(0.82 0.18 80)', fontWeight: 700 }}>{char.duration}</span>
                        </span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
