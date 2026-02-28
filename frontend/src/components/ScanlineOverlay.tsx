export default function ScanlineOverlay() {
  return (
    <>
      {/* Scanlines */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.07) 2px, rgba(0,0,0,0.07) 4px)',
          zIndex: 9997,
        }}
      />
      {/* Moving scan line */}
      <div
        className="fixed left-0 right-0 pointer-events-none"
        style={{
          height: '2px',
          background: 'linear-gradient(90deg, transparent, oklch(0.85 0.22 145 / 0.15), transparent)',
          animation: 'scan-line 6s linear infinite',
          zIndex: 9998,
        }}
      />
      {/* Vignette */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.6) 100%)',
          zIndex: 9996,
        }}
      />
    </>
  );
}
