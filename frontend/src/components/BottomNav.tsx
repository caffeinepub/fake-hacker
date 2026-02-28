import { Home, Crosshair, Users, History } from 'lucide-react';

export type TabId = 'dashboard' | 'weapons' | 'characters' | 'matches';

interface BottomNavProps {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
}

const tabs: { id: TabId; label: string; icon: React.ReactNode }[] = [
  { id: 'dashboard', label: 'HOME', icon: <Home size={20} /> },
  { id: 'weapons', label: 'WEAPONS', icon: <Crosshair size={20} /> },
  { id: 'characters', label: 'CHARS', icon: <Users size={20} /> },
  { id: 'matches', label: 'MATCHES', icon: <History size={20} /> },
];

export default function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  return (
    <nav
      className="flex-shrink-0 border-t"
      style={{
        background: 'oklch(0.09 0.012 30)',
        borderColor: 'oklch(0.22 0.03 35)',
        boxShadow: '0 -4px 20px oklch(0.72 0.19 42 / 0.1)',
      }}
    >
      <div className="flex">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className="flex-1 flex flex-col items-center justify-center py-3 gap-1 transition-all duration-200 relative"
              style={{
                color: isActive ? 'oklch(0.82 0.22 42)' : 'oklch(0.45 0.05 50)',
                background: isActive ? 'oklch(0.72 0.19 42 / 0.08)' : 'transparent',
                fontFamily: 'Rajdhani, sans-serif',
              }}
            >
              {isActive && (
                <div
                  className="absolute top-0 left-0 right-0 h-0.5"
                  style={{
                    background: 'linear-gradient(90deg, transparent, oklch(0.82 0.22 42), transparent)',
                    boxShadow: '0 0 8px oklch(0.82 0.22 42 / 0.8)',
                  }}
                />
              )}
              <span
                style={{
                  filter: isActive ? 'drop-shadow(0 0 6px oklch(0.82 0.22 42 / 0.8))' : 'none',
                }}
              >
                {tab.icon}
              </span>
              <span
                className="text-xs tracking-widest font-semibold"
                style={{
                  textShadow: isActive ? '0 0 8px oklch(0.82 0.22 42 / 0.8)' : 'none',
                }}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
