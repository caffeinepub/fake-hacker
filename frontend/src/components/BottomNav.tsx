import { Terminal, Wifi, User } from 'lucide-react';

export type TabId = 'terminal' | 'scanner' | 'profile';

interface BottomNavProps {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
}

const tabs: { id: TabId; label: string; icon: React.ReactNode }[] = [
  { id: 'terminal', label: 'TERMINAL', icon: <Terminal size={20} /> },
  { id: 'scanner', label: 'SCANNER', icon: <Wifi size={20} /> },
  { id: 'profile', label: 'PROFILE', icon: <User size={20} /> },
];

export default function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  return (
    <nav
      className="flex-shrink-0 border-t"
      style={{
        background: 'oklch(0.07 0.02 145)',
        borderColor: 'oklch(0.25 0.08 145)',
        boxShadow: '0 -4px 20px oklch(0.85 0.22 145 / 0.1)',
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
                color: isActive ? 'oklch(0.95 0.25 145)' : 'oklch(0.45 0.1 145)',
                background: isActive ? 'oklch(0.85 0.22 145 / 0.05)' : 'transparent',
                fontFamily: '"Share Tech Mono", monospace',
              }}
            >
              {isActive && (
                <div
                  className="absolute top-0 left-0 right-0 h-0.5"
                  style={{
                    background: 'oklch(0.85 0.22 145)',
                    boxShadow: '0 0 8px oklch(0.85 0.22 145 / 0.8)',
                  }}
                />
              )}
              <span
                style={{
                  filter: isActive ? 'drop-shadow(0 0 6px oklch(0.85 0.22 145 / 0.8))' : 'none',
                }}
              >
                {tab.icon}
              </span>
              <span
                className="text-xs tracking-widest"
                style={{
                  textShadow: isActive ? '0 0 8px oklch(0.85 0.22 145 / 0.8)' : 'none',
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
