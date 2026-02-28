import { Flame } from 'lucide-react';

export default function Header() {
  return (
    <header
      className="flex-shrink-0 relative overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, oklch(0.10 0.015 30) 0%, oklch(0.08 0.01 30) 100%)',
        borderBottom: '1px solid oklch(0.72 0.19 42 / 0.4)',
        boxShadow: '0 2px 20px oklch(0.72 0.19 42 / 0.2)',
      }}
    >
      {/* Banner background image */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: 'url(/assets/generated/ff-header-banner.dim_1200x300.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      <div className="relative flex items-center gap-3 px-4 py-3">
        {/* Logo */}
        <div className="flex-shrink-0 relative">
          <img
            src="/assets/generated/ff-panel-logo.dim_256x256.png"
            alt="Free Fire Panel Logo"
            className="w-10 h-10 object-contain"
            style={{ filter: 'drop-shadow(0 0 8px oklch(0.72 0.19 42 / 0.8))' }}
          />
        </div>

        {/* Title */}
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5">
            <Flame
              size={14}
              style={{ color: 'oklch(0.72 0.19 42)', filter: 'drop-shadow(0 0 4px oklch(0.72 0.19 42 / 0.8))' }}
            />
            <span
              className="text-xs font-semibold tracking-[0.2em] uppercase"
              style={{ color: 'oklch(0.72 0.19 42)', fontFamily: 'Orbitron, sans-serif' }}
            >
              Free Fire
            </span>
          </div>
          <span
            className="text-lg font-bold leading-tight tracking-wider uppercase"
            style={{
              color: 'oklch(0.92 0.04 60)',
              fontFamily: 'Orbitron, sans-serif',
              textShadow: '0 0 12px oklch(0.72 0.19 42 / 0.5)',
            }}
          >
            PANEL
          </span>
        </div>

        {/* Decorative right element */}
        <div className="ml-auto flex items-center gap-2">
          <div
            className="w-2 h-2 rounded-full animate-ff-pulse"
            style={{ background: 'oklch(0.72 0.19 42)' }}
          />
          <span
            className="text-xs tracking-widest uppercase"
            style={{ color: 'oklch(0.55 0.05 50)', fontFamily: 'Rajdhani, sans-serif' }}
          >
            LIVE
          </span>
        </div>
      </div>
    </header>
  );
}
