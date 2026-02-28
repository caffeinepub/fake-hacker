import { useState } from 'react';
import BottomNav, { TabId } from './components/BottomNav';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import Weapons from './pages/Weapons';
import Characters from './pages/Characters';
import Matches from './pages/Matches';
import { Heart } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabId>('dashboard');

  const appId =
    typeof window !== 'undefined'
      ? encodeURIComponent(window.location.hostname)
      : 'free-fire-panel';

  return (
    <div
      className="flex flex-col h-screen w-screen overflow-hidden"
      style={{
        background: 'oklch(0.08 0.01 30)',
        fontFamily: 'Rajdhani, Arial, sans-serif',
        maxWidth: '480px',
        margin: '0 auto',
        position: 'relative',
      }}
    >
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-1 overflow-hidden relative">
        <div className={activeTab === 'dashboard' ? 'h-full' : 'hidden h-full'}>
          <Dashboard />
        </div>
        <div className={activeTab === 'weapons' ? 'h-full' : 'hidden h-full'}>
          <Weapons />
        </div>
        <div className={activeTab === 'characters' ? 'h-full' : 'hidden h-full'}>
          <Characters />
        </div>
        <div className={activeTab === 'matches' ? 'h-full' : 'hidden h-full'}>
          <Matches />
        </div>
      </main>

      {/* Bottom Navigation */}
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Footer */}
      <footer
        className="flex-shrink-0 flex items-center justify-center py-1.5 border-t"
        style={{
          background: 'oklch(0.09 0.012 30)',
          borderColor: 'oklch(0.20 0.025 35)',
        }}
      >
        <p
          className="text-xs flex items-center gap-1"
          style={{
            color: 'oklch(0.38 0.04 50)',
            fontFamily: 'Rajdhani, sans-serif',
          }}
        >
          © {new Date().getFullYear()} Built with{' '}
          <Heart
            size={10}
            style={{ color: 'oklch(0.58 0.22 25)', fill: 'oklch(0.58 0.22 25)' }}
          />{' '}
          using{' '}
          <a
            href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${appId}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'oklch(0.65 0.14 42)', textDecoration: 'underline' }}
          >
            caffeine.ai
          </a>
        </p>
      </footer>
    </div>
  );
}
