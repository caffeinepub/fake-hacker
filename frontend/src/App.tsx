import { useState } from 'react';
import BottomNav, { TabId } from './components/BottomNav';
import ScanlineOverlay from './components/ScanlineOverlay';
import Terminal from './pages/Terminal';
import Scanner from './pages/Scanner';
import Profile from './pages/Profile';
import { Heart } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabId>('terminal');

  const appId = typeof window !== 'undefined'
    ? encodeURIComponent(window.location.hostname)
    : 'fake-hacker-app';

  return (
    <div
      className="flex flex-col h-screen w-screen overflow-hidden"
      style={{
        background: 'oklch(0.06 0.015 145)',
        fontFamily: '"Share Tech Mono", "Courier New", Courier, monospace',
        maxWidth: '480px',
        margin: '0 auto',
        position: 'relative',
      }}
    >
      {/* CRT Effects */}
      <ScanlineOverlay />

      {/* Main Content */}
      <main className="flex-1 overflow-hidden relative">
        <div className={activeTab === 'terminal' ? 'h-full' : 'hidden h-full'}>
          <Terminal />
        </div>
        <div className={activeTab === 'scanner' ? 'h-full' : 'hidden h-full'}>
          <Scanner />
        </div>
        <div className={activeTab === 'profile' ? 'h-full overflow-y-auto' : 'hidden h-full'}>
          <Profile />
        </div>
      </main>

      {/* Bottom Navigation */}
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Footer */}
      <footer
        className="flex-shrink-0 flex items-center justify-center py-1.5 border-t"
        style={{
          background: 'oklch(0.06 0.015 145)',
          borderColor: 'oklch(0.15 0.04 145)',
        }}
      >
        <p
          className="text-xs flex items-center gap-1"
          style={{
            color: 'oklch(0.35 0.08 145)',
            fontFamily: '"Share Tech Mono", monospace',
          }}
        >
          © {new Date().getFullYear()} Built with{' '}
          <Heart
            size={10}
            style={{ color: 'oklch(0.6 0.22 25)', fill: 'oklch(0.6 0.22 25)' }}
          />{' '}
          using{' '}
          <a
            href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${appId}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'oklch(0.55 0.15 145)', textDecoration: 'underline' }}
          >
            caffeine.ai
          </a>
        </p>
      </footer>
    </div>
  );
}
