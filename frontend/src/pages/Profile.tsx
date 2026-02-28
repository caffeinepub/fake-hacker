import { Shield, Zap, Clock, Target, Award, Activity } from 'lucide-react';

const HACKER_ALIAS = 'gh0st_0p3r4t0r';
const RANK = 'ELITE BLACK HAT';

const STATS = [
  { label: 'MISSIONS', value: '247', icon: <Target size={16} />, color: 'oklch(0.85 0.22 145)' },
  { label: 'BREACHES', value: '1,337', icon: <Zap size={16} />, color: 'oklch(0.6 0.22 25)' },
  { label: 'UPTIME', value: '99.7%', icon: <Activity size={16} />, color: 'oklch(0.75 0.15 200)' },
  { label: 'EXPLOITS', value: '89', icon: <Shield size={16} />, color: 'oklch(0.82 0.18 95)' },
  { label: 'RANK SCORE', value: '9,999', icon: <Award size={16} />, color: 'oklch(0.85 0.22 145)' },
  { label: 'ACTIVE HRS', value: '14,220', icon: <Clock size={16} />, color: 'oklch(0.75 0.15 200)' },
];

const OPERATIONS = [
  { name: 'OPERATION SHADOW VEIL', target: 'FinCorp Global Bank', status: 'COMPLETE', date: '2026-02-14 03:22:11', type: 'DATA EXFIL' },
  { name: 'OPERATION IRON GHOST', target: 'MilTech Defense Ltd', status: 'COMPLETE', date: '2026-01-30 22:47:55', type: 'INFILTRATION' },
  { name: 'OPERATION DARK TIDE', target: 'NovaCorp Systems', status: 'COMPLETE', date: '2026-01-15 01:13:44', type: 'RANSOMWARE' },
  { name: 'OPERATION PHANTOM WIRE', target: 'TeleGov Network', status: 'COMPLETE', date: '2025-12-28 18:05:30', type: 'WIRETAP' },
  { name: 'OPERATION ZERO DAY', target: 'CryptoVault Exchange', status: 'COMPLETE', date: '2025-12-10 09:58:17', type: 'EXPLOIT' },
  { name: 'OPERATION SILENT STORM', target: 'AeroSpace Dynamics', status: 'COMPLETE', date: '2025-11-22 14:33:02', type: 'SABOTAGE' },
  { name: 'OPERATION NEON SERPENT', target: 'MegaCloud Services', status: 'COMPLETE', date: '2025-11-05 07:21:48', type: 'DATA EXFIL' },
];

const SKILLS = [
  { name: 'EXPLOITATION', level: 97 },
  { name: 'CRYPTOGRAPHY', level: 88 },
  { name: 'SOCIAL ENG.', level: 92 },
  { name: 'STEALTH OPS', level: 95 },
  { name: 'REVERSE ENG.', level: 84 },
];

export default function Profile() {
  return (
    <div className="flex flex-col h-full overflow-y-auto" style={{ background: 'oklch(0.06 0.015 145)' }}>
      {/* Header */}
      <div
        className="flex-shrink-0 px-4 py-4 border-b"
        style={{
          background: 'oklch(0.07 0.02 145)',
          borderColor: 'oklch(0.25 0.08 145)',
        }}
      >
        <div className="flex items-center gap-4">
          {/* Avatar */}
          <div
            className="w-16 h-16 rounded-sm flex items-center justify-center flex-shrink-0 relative"
            style={{
              background: 'oklch(0.1 0.03 145)',
              border: '2px solid oklch(0.85 0.22 145)',
              boxShadow: '0 0 20px oklch(0.85 0.22 145 / 0.3)',
            }}
          >
            <img
              src="/assets/generated/skull-icon.dim_128x128.png"
              alt="avatar"
              className="w-12 h-12"
              style={{ filter: 'drop-shadow(0 0 4px oklch(0.85 0.22 145 / 0.8))' }}
            />
            <div
              className="absolute -bottom-1 -right-1 w-3 h-3 rounded-full"
              style={{ background: 'oklch(0.85 0.22 145)', boxShadow: '0 0 6px oklch(0.85 0.22 145)' }}
            />
          </div>

          <div>
            <h1
              className="text-lg font-bold tracking-widest glitch-text"
              style={{
                color: 'oklch(0.95 0.25 145)',
                textShadow: '0 0 12px oklch(0.85 0.22 145 / 0.8)',
                fontFamily: '"Share Tech Mono", monospace',
              }}
            >
              {HACKER_ALIAS}
            </h1>
            <div
              className="inline-block px-2 py-0.5 mt-1 text-xs tracking-widest"
              style={{
                color: 'oklch(0.6 0.22 25)',
                border: '1px solid oklch(0.6 0.22 25 / 0.5)',
                background: 'oklch(0.6 0.22 25 / 0.08)',
                textShadow: '0 0 8px oklch(0.6 0.22 25 / 0.6)',
                fontFamily: '"Share Tech Mono", monospace',
              }}
            >
              ◆ {RANK}
            </div>
            <p className="text-xs mt-1" style={{ color: 'oklch(0.45 0.1 145)', fontFamily: '"Share Tech Mono", monospace' }}>
              ID: 0x4GH057 | CLEARANCE: OMEGA
            </p>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="flex-shrink-0 px-4 py-3 border-b" style={{ borderColor: 'oklch(0.15 0.04 145)' }}>
        <p className="text-xs tracking-widest mb-2" style={{ color: 'oklch(0.45 0.1 145)', fontFamily: '"Share Tech Mono", monospace' }}>
          ── OPERATOR STATS ──
        </p>
        <div className="grid grid-cols-3 gap-2">
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="px-2 py-2 rounded-sm text-center"
              style={{
                background: 'oklch(0.09 0.025 145)',
                border: '1px solid oklch(0.2 0.06 145)',
              }}
            >
              <div className="flex justify-center mb-1" style={{ color: stat.color }}>
                {stat.icon}
              </div>
              <div
                className="text-base font-bold"
                style={{
                  color: stat.color,
                  textShadow: `0 0 8px ${stat.color} / 0.6`,
                  fontFamily: '"Share Tech Mono", monospace',
                }}
              >
                {stat.value}
              </div>
              <div className="text-xs mt-0.5" style={{ color: 'oklch(0.4 0.08 145)', fontFamily: '"Share Tech Mono", monospace', fontSize: '10px' }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Skills */}
      <div className="flex-shrink-0 px-4 py-3 border-b" style={{ borderColor: 'oklch(0.15 0.04 145)' }}>
        <p className="text-xs tracking-widest mb-2" style={{ color: 'oklch(0.45 0.1 145)', fontFamily: '"Share Tech Mono", monospace' }}>
          ── SKILL MATRIX ──
        </p>
        <div className="space-y-2">
          {SKILLS.map((skill) => (
            <div key={skill.name}>
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs" style={{ color: 'oklch(0.75 0.15 145)', fontFamily: '"Share Tech Mono", monospace', fontSize: '11px' }}>
                  {skill.name}
                </span>
                <span className="text-xs" style={{ color: 'oklch(0.85 0.22 145)', fontFamily: '"Share Tech Mono", monospace', fontSize: '11px' }}>
                  {skill.level}%
                </span>
              </div>
              <div
                className="h-1.5 rounded-sm overflow-hidden"
                style={{ background: 'oklch(0.12 0.03 145)', border: '1px solid oklch(0.2 0.06 145)' }}
              >
                <div
                  className="h-full"
                  style={{
                    width: `${skill.level}%`,
                    background: `linear-gradient(90deg, oklch(0.45 0.15 145), oklch(0.85 0.22 145))`,
                    boxShadow: '0 0 6px oklch(0.85 0.22 145 / 0.5)',
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Operations Log */}
      <div className="flex-shrink-0 px-4 py-3">
        <p className="text-xs tracking-widest mb-2" style={{ color: 'oklch(0.45 0.1 145)', fontFamily: '"Share Tech Mono", monospace' }}>
          ── COMPLETED OPERATIONS ──
        </p>
        <div className="space-y-2">
          {OPERATIONS.map((op, i) => (
            <div
              key={i}
              className="px-3 py-2 rounded-sm border"
              style={{
                background: 'oklch(0.08 0.02 145)',
                borderColor: 'oklch(0.18 0.05 145)',
              }}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <p
                    className="text-xs font-bold truncate"
                    style={{
                      color: 'oklch(0.85 0.22 145)',
                      textShadow: '0 0 6px oklch(0.85 0.22 145 / 0.4)',
                      fontFamily: '"Share Tech Mono", monospace',
                    }}
                  >
                    {op.name}
                  </p>
                  <p className="text-xs mt-0.5" style={{ color: 'oklch(0.5 0.1 145)', fontFamily: '"Share Tech Mono", monospace', fontSize: '10px' }}>
                    TARGET: {op.target}
                  </p>
                </div>
                <div className="flex flex-col items-end gap-1 flex-shrink-0">
                  <span
                    className="text-xs px-1.5 py-0.5 rounded-sm"
                    style={{
                      color: 'oklch(0.85 0.22 145)',
                      background: 'oklch(0.85 0.22 145 / 0.1)',
                      border: '1px solid oklch(0.85 0.22 145 / 0.3)',
                      fontFamily: '"Share Tech Mono", monospace',
                      fontSize: '10px',
                    }}
                  >
                    {op.type}
                  </span>
                </div>
              </div>
              <p className="text-xs mt-1" style={{ color: 'oklch(0.35 0.07 145)', fontFamily: '"Share Tech Mono", monospace', fontSize: '10px' }}>
                {op.date} — <span style={{ color: 'oklch(0.65 0.18 145)' }}>{op.status}</span>
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Footer padding */}
      <div className="h-4" />
    </div>
  );
}
