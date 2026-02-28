import { useState } from 'react';
import { weapons, WeaponType } from '../data/weapons';

type FilterType = 'All' | WeaponType;

const filters: FilterType[] = ['All', 'AR', 'SMG', 'Sniper', 'Shotgun', 'Pistol'];

const typeColors: Record<WeaponType, string> = {
  AR: 'oklch(0.72 0.19 42)',
  SMG: 'oklch(0.72 0.12 200)',
  Sniper: 'oklch(0.82 0.18 80)',
  Shotgun: 'oklch(0.58 0.22 25)',
  Pistol: 'oklch(0.65 0.10 145)',
};

interface StatBarProps {
  label: string;
  value: number;
  color?: string;
}

function StatBar({ label, value, color }: StatBarProps) {
  const barColor = color ?? 'oklch(0.72 0.19 42)';
  return (
    <div className="space-y-0.5">
      <div className="flex justify-between items-center">
        <span
          className="text-xs font-medium tracking-wide"
          style={{ color: 'oklch(0.55 0.05 50)', fontFamily: 'Rajdhani, sans-serif' }}
        >
          {label}
        </span>
        <span
          className="text-xs font-bold"
          style={{ color: 'oklch(0.75 0.05 55)', fontFamily: 'Orbitron, sans-serif' }}
        >
          {value}
        </span>
      </div>
      <div className="ff-stat-bar">
        <div
          style={{
            height: '100%',
            width: `${value}%`,
            borderRadius: '3px',
            background: `linear-gradient(90deg, ${barColor}, oklch(0.82 0.18 80))`,
            transition: 'width 0.6s ease',
          }}
        />
      </div>
    </div>
  );
}

export default function Weapons() {
  const [activeFilter, setActiveFilter] = useState<FilterType>('All');

  const filtered = activeFilter === 'All'
    ? weapons
    : weapons.filter((w) => w.type === activeFilter);

  return (
    <div className="h-full overflow-y-auto">
      <div className="p-4 space-y-4 pb-6">
        {/* Header */}
        <div>
          <h2
            className="text-lg font-bold tracking-widest uppercase"
            style={{ color: 'oklch(0.92 0.04 60)', fontFamily: 'Orbitron, sans-serif' }}
          >
            Weapons
          </h2>
          <p
            className="text-xs mt-0.5"
            style={{ color: 'oklch(0.55 0.05 50)', fontFamily: 'Rajdhani, sans-serif' }}
          >
            {filtered.length} weapons available
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex gap-2 flex-wrap">
          {filters.map((f) => {
            const isActive = activeFilter === f;
            return (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className="px-3 py-1.5 rounded text-xs font-bold tracking-widest uppercase transition-all duration-200"
                style={{
                  fontFamily: 'Rajdhani, sans-serif',
                  background: isActive ? 'oklch(0.72 0.19 42)' : 'oklch(0.13 0.018 30)',
                  color: isActive ? 'oklch(0.08 0.01 30)' : 'oklch(0.55 0.05 50)',
                  border: `1px solid ${isActive ? 'oklch(0.72 0.19 42)' : 'oklch(0.22 0.03 35)'}`,
                  boxShadow: isActive ? '0 0 10px oklch(0.72 0.19 42 / 0.4)' : 'none',
                }}
              >
                {f}
              </button>
            );
          })}
        </div>

        {/* Weapons Grid */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {filtered.map((weapon) => {
            const typeColor = typeColors[weapon.type];
            return (
              <div
                key={weapon.id}
                className="ff-card p-4 space-y-3"
                style={{ borderColor: `${typeColor.replace(')', ' / 0.3)')}` }}
              >
                {/* Weapon Header */}
                <div className="flex items-center justify-between">
                  <h3
                    className="text-base font-bold tracking-wider"
                    style={{ color: 'oklch(0.92 0.04 60)', fontFamily: 'Orbitron, sans-serif' }}
                  >
                    {weapon.name}
                  </h3>
                  <span
                    className="text-xs font-bold px-2 py-0.5 rounded"
                    style={{
                      background: `${typeColor.replace(')', ' / 0.15)')}`,
                      color: typeColor,
                      border: `1px solid ${typeColor.replace(')', ' / 0.4)')}`,
                      fontFamily: 'Rajdhani, sans-serif',
                    }}
                  >
                    {weapon.type}
                  </span>
                </div>

                {/* Stats */}
                <div className="space-y-2">
                  <StatBar label="Damage" value={weapon.damage} color={typeColor} />
                  <StatBar label="Range" value={weapon.range} color={typeColor} />
                  <StatBar label="Fire Rate" value={weapon.fireRate} color={typeColor} />
                  <StatBar label="Reload" value={weapon.reloadSpeed} color={typeColor} />
                  <StatBar label="Magazine" value={weapon.magazineSize} color={typeColor} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
