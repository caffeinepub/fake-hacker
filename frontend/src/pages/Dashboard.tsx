import { playerStats } from '../data/playerStats';
import { Shield, Target, Trophy, Crosshair, Zap, Clock, Star } from 'lucide-react';

const rankColors: Record<string, { color: string; glow: string }> = {
  Bronze: { color: 'oklch(0.60 0.12 55)', glow: 'oklch(0.60 0.12 55 / 0.5)' },
  Silver: { color: 'oklch(0.75 0.04 60)', glow: 'oklch(0.75 0.04 60 / 0.5)' },
  Gold: { color: 'oklch(0.82 0.18 80)', glow: 'oklch(0.82 0.18 80 / 0.5)' },
  Platinum: { color: 'oklch(0.72 0.12 200)', glow: 'oklch(0.72 0.12 200 / 0.5)' },
  Diamond: { color: 'oklch(0.70 0.18 240)', glow: 'oklch(0.70 0.18 240 / 0.5)' },
  Heroic: { color: 'oklch(0.72 0.19 42)', glow: 'oklch(0.72 0.19 42 / 0.5)' },
  Grandmaster: { color: 'oklch(0.82 0.18 80)', glow: 'oklch(0.82 0.18 80 / 0.6)' },
};

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  sub?: string;
  accent?: boolean;
}

function StatCard({ icon, label, value, sub, accent }: StatCardProps) {
  return (
    <div
      className="ff-card p-3 flex flex-col gap-1"
      style={
        accent
          ? {
              borderColor: 'oklch(0.72 0.19 42 / 0.5)',
              boxShadow: '0 0 12px oklch(0.72 0.19 42 / 0.15)',
            }
          : {}
      }
    >
      <div className="flex items-center gap-2">
        <span style={{ color: 'oklch(0.72 0.19 42)' }}>{icon}</span>
        <span
          className="text-xs font-semibold tracking-widest uppercase"
          style={{ color: 'oklch(0.55 0.05 50)', fontFamily: 'Rajdhani, sans-serif' }}
        >
          {label}
        </span>
      </div>
      <div
        className="text-2xl font-bold leading-none"
        style={{
          color: accent ? 'oklch(0.82 0.22 42)' : 'oklch(0.92 0.04 60)',
          fontFamily: 'Orbitron, sans-serif',
          textShadow: accent ? '0 0 10px oklch(0.72 0.19 42 / 0.5)' : 'none',
        }}
      >
        {value}
      </div>
      {sub && (
        <div
          className="text-xs"
          style={{ color: 'oklch(0.55 0.05 50)', fontFamily: 'Rajdhani, sans-serif' }}
        >
          {sub}
        </div>
      )}
    </div>
  );
}

export default function Dashboard() {
  const stats = playerStats;
  const rankStyle = rankColors[stats.rankName] ?? rankColors['Heroic'];

  const levelPercent = ((stats.level % 10) / 10) * 100;

  return (
    <div className="h-full overflow-y-auto">
      <div className="p-4 space-y-4 pb-6">
        {/* Player Identity Card */}
        <div
          className="ff-card p-4 relative overflow-hidden"
          style={{
            borderColor: 'oklch(0.72 0.19 42 / 0.4)',
            boxShadow: '0 0 20px oklch(0.72 0.19 42 / 0.15)',
          }}
        >
          {/* Background decoration */}
          <div
            className="absolute top-0 right-0 w-32 h-32 opacity-5"
            style={{
              background: 'radial-gradient(circle, oklch(0.72 0.19 42) 0%, transparent 70%)',
            }}
          />

          <div className="flex items-start gap-4 relative">
            {/* Avatar placeholder */}
            <div
              className="w-16 h-16 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{
                background: 'linear-gradient(135deg, oklch(0.15 0.02 30), oklch(0.20 0.03 35))',
                border: '2px solid oklch(0.72 0.19 42 / 0.5)',
                boxShadow: '0 0 12px oklch(0.72 0.19 42 / 0.3)',
              }}
            >
              <Shield size={28} style={{ color: 'oklch(0.72 0.19 42)' }} />
            </div>

            <div className="flex-1 min-w-0">
              <h2
                className="text-xl font-bold tracking-wider truncate"
                style={{
                  color: 'oklch(0.92 0.04 60)',
                  fontFamily: 'Orbitron, sans-serif',
                  textShadow: '0 0 10px oklch(0.72 0.19 42 / 0.4)',
                }}
              >
                {stats.playerNickname}
              </h2>
              <p
                className="text-xs tracking-widest mt-0.5"
                style={{ color: 'oklch(0.55 0.05 50)', fontFamily: 'Rajdhani, sans-serif' }}
              >
                UID: {stats.playerUID}
              </p>

              {/* Level bar */}
              <div className="mt-2 flex items-center gap-2">
                <span
                  className="text-xs font-bold"
                  style={{ color: 'oklch(0.82 0.18 80)', fontFamily: 'Orbitron, sans-serif' }}
                >
                  LV.{stats.level}
                </span>
                <div className="flex-1 ff-stat-bar">
                  <div
                    className="ff-stat-bar-fill"
                    style={{ width: `${levelPercent}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Rank Badge */}
            <div className="flex-shrink-0 flex flex-col items-center gap-1">
              <div
                className="w-12 h-12 rounded-lg flex items-center justify-center"
                style={{
                  background: 'oklch(0.13 0.02 30)',
                  border: `2px solid ${rankStyle.color}`,
                  boxShadow: `0 0 12px ${rankStyle.glow}`,
                }}
              >
                <Star size={20} style={{ color: rankStyle.color }} />
              </div>
              <span
                className="text-xs font-bold tracking-wide"
                style={{
                  color: rankStyle.color,
                  fontFamily: 'Rajdhani, sans-serif',
                  textShadow: `0 0 6px ${rankStyle.glow}`,
                }}
              >
                {stats.rankName}
              </span>
            </div>
          </div>
        </div>

        {/* Primary Stats Grid */}
        <div className="grid grid-cols-2 gap-3">
          <StatCard
            icon={<Target size={16} />}
            label="K/D Ratio"
            value={stats.kdRatio.toFixed(2)}
            sub="Kills per death"
            accent
          />
          <StatCard
            icon={<Trophy size={16} />}
            label="Win Rate"
            value={`${stats.winRate}%`}
            sub={`${stats.totalWins} wins`}
          />
          <StatCard
            icon={<Crosshair size={16} />}
            label="Headshot %"
            value={`${stats.headshotPercentage}%`}
            sub="Precision rating"
          />
          <StatCard
            icon={<Zap size={16} />}
            label="Total Kills"
            value={stats.totalKills.toLocaleString()}
            sub="All time"
          />
        </div>

        {/* Secondary Stats */}
        <div className="grid grid-cols-3 gap-3">
          <div className="ff-card p-3 text-center">
            <div
              className="text-lg font-bold"
              style={{ color: 'oklch(0.82 0.18 80)', fontFamily: 'Orbitron, sans-serif' }}
            >
              {stats.totalMatches.toLocaleString()}
            </div>
            <div
              className="text-xs tracking-wide uppercase mt-0.5"
              style={{ color: 'oklch(0.55 0.05 50)', fontFamily: 'Rajdhani, sans-serif' }}
            >
              Matches
            </div>
          </div>
          <div className="ff-card p-3 text-center">
            <div
              className="text-lg font-bold"
              style={{ color: 'oklch(0.82 0.18 80)', fontFamily: 'Orbitron, sans-serif' }}
            >
              {stats.avgDamage.toLocaleString()}
            </div>
            <div
              className="text-xs tracking-wide uppercase mt-0.5"
              style={{ color: 'oklch(0.55 0.05 50)', fontFamily: 'Rajdhani, sans-serif' }}
            >
              Avg DMG
            </div>
          </div>
          <div className="ff-card p-3 text-center">
            <div className="flex items-center justify-center gap-1">
              <Clock size={12} style={{ color: 'oklch(0.82 0.18 80)' }} />
              <span
                className="text-base font-bold"
                style={{ color: 'oklch(0.82 0.18 80)', fontFamily: 'Orbitron, sans-serif' }}
              >
                {stats.avgSurvivalTime}
              </span>
            </div>
            <div
              className="text-xs tracking-wide uppercase mt-0.5"
              style={{ color: 'oklch(0.55 0.05 50)', fontFamily: 'Rajdhani, sans-serif' }}
            >
              Avg Time
            </div>
          </div>
        </div>

        {/* Performance Bars */}
        <div
          className="ff-card p-4 space-y-3"
          style={{ borderColor: 'oklch(0.22 0.03 35)' }}
        >
          <h3
            className="text-sm font-bold tracking-widest uppercase"
            style={{ color: 'oklch(0.72 0.19 42)', fontFamily: 'Rajdhani, sans-serif' }}
          >
            Performance Overview
          </h3>
          {[
            { label: 'Win Rate', value: stats.winRate, max: 100 },
            { label: 'Headshot %', value: stats.headshotPercentage, max: 100 },
            { label: 'K/D Score', value: Math.min(stats.kdRatio * 10, 100), max: 100 },
          ].map((item) => (
            <div key={item.label} className="space-y-1">
              <div className="flex justify-between items-center">
                <span
                  className="text-xs font-semibold tracking-wide"
                  style={{ color: 'oklch(0.75 0.05 55)', fontFamily: 'Rajdhani, sans-serif' }}
                >
                  {item.label}
                </span>
                <span
                  className="text-xs font-bold"
                  style={{ color: 'oklch(0.82 0.18 80)', fontFamily: 'Orbitron, sans-serif' }}
                >
                  {item.value.toFixed(1)}
                </span>
              </div>
              <div className="ff-stat-bar">
                <div
                  className="ff-stat-bar-fill"
                  style={{ width: `${(item.value / item.max) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
