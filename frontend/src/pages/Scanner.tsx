import { useFakeScan, ScanResult } from '../hooks/useFakeScan';
import { Shield, AlertTriangle, Lock, Filter, Wifi } from 'lucide-react';

function StatusBadge({ status }: { status: ScanResult['status'] }) {
  const config = {
    VULNERABLE: {
      color: 'oklch(0.6 0.22 25)',
      shadow: '0 0 8px oklch(0.6 0.22 25 / 0.6)',
      bg: 'oklch(0.6 0.22 25 / 0.1)',
      border: 'oklch(0.6 0.22 25 / 0.4)',
      icon: <AlertTriangle size={10} />,
    },
    OPEN: {
      color: 'oklch(0.82 0.18 95)',
      shadow: '0 0 8px oklch(0.82 0.18 95 / 0.6)',
      bg: 'oklch(0.82 0.18 95 / 0.1)',
      border: 'oklch(0.82 0.18 95 / 0.4)',
      icon: <Wifi size={10} />,
    },
    ENCRYPTED: {
      color: 'oklch(0.85 0.22 145)',
      shadow: '0 0 8px oklch(0.85 0.22 145 / 0.6)',
      bg: 'oklch(0.85 0.22 145 / 0.1)',
      border: 'oklch(0.85 0.22 145 / 0.4)',
      icon: <Lock size={10} />,
    },
    FILTERED: {
      color: 'oklch(0.75 0.15 200)',
      shadow: '0 0 8px oklch(0.75 0.15 200 / 0.5)',
      bg: 'oklch(0.75 0.15 200 / 0.1)',
      border: 'oklch(0.75 0.15 200 / 0.4)',
      icon: <Filter size={10} />,
    },
  };

  const c = config[status];
  return (
    <span
      className="inline-flex items-center gap-1 px-1.5 py-0.5 text-xs rounded-sm"
      style={{
        color: c.color,
        textShadow: c.shadow,
        background: c.bg,
        border: `1px solid ${c.border}`,
        fontFamily: '"Share Tech Mono", monospace',
      }}
    >
      {c.icon}
      {status}
    </span>
  );
}

function SeverityBadge({ severity }: { severity?: ScanResult['severity'] }) {
  if (!severity) return null;
  const colors = {
    CRITICAL: 'oklch(0.55 0.25 25)',
    HIGH: 'oklch(0.65 0.22 35)',
    MEDIUM: 'oklch(0.82 0.18 95)',
    LOW: 'oklch(0.75 0.15 200)',
  };
  return (
    <span
      className="text-xs px-1 rounded-sm"
      style={{
        color: colors[severity],
        border: `1px solid ${colors[severity]}`,
        fontFamily: '"Share Tech Mono", monospace',
        fontSize: '10px',
      }}
    >
      {severity}
    </span>
  );
}

export default function Scanner() {
  const { isScanning, progress, results, isComplete, scanPhase, startScan, resetScan, vulnerableCount } = useFakeScan();

  return (
    <div className="flex flex-col h-full" style={{ background: 'oklch(0.06 0.015 145)' }}>
      {/* Header */}
      <div
        className="flex-shrink-0 px-4 py-3 border-b"
        style={{
          background: 'oklch(0.07 0.02 145)',
          borderColor: 'oklch(0.25 0.08 145)',
        }}
      >
        <div className="flex items-center justify-between">
          <div>
            <h1
              className="text-sm font-bold tracking-widest glitch-text"
              style={{
                color: 'oklch(0.95 0.25 145)',
                textShadow: '0 0 10px oklch(0.85 0.22 145 / 0.8)',
                fontFamily: '"Share Tech Mono", monospace',
              }}
            >
              NETWORK SCANNER
            </h1>
            <p className="text-xs tracking-wider mt-0.5" style={{ color: 'oklch(0.5 0.1 145)', fontFamily: '"Share Tech Mono", monospace' }}>
              VULNERABILITY ASSESSMENT MODULE v2.7
            </p>
          </div>
          <Shield size={24} style={{ color: 'oklch(0.85 0.22 145)', filter: 'drop-shadow(0 0 6px oklch(0.85 0.22 145 / 0.6))' }} />
        </div>
      </div>

      {/* Scan Control */}
      <div
        className="flex-shrink-0 px-4 py-4 border-b"
        style={{ borderColor: 'oklch(0.2 0.06 145)' }}
      >
        {/* Target info */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs" style={{ color: 'oklch(0.5 0.1 145)', fontFamily: '"Share Tech Mono", monospace' }}>
            TARGET:
          </span>
          <span className="text-xs" style={{ color: 'oklch(0.85 0.22 145)', fontFamily: '"Share Tech Mono", monospace' }}>
            192.168.0.0/16 — 65,536 hosts
          </span>
        </div>

        {/* Progress bar */}
        {(isScanning || isComplete) && (
          <div className="mb-3">
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs" style={{ color: 'oklch(0.65 0.12 145)', fontFamily: '"Share Tech Mono", monospace' }}>
                {scanPhase}
              </span>
              <span className="text-xs" style={{ color: 'oklch(0.85 0.22 145)', fontFamily: '"Share Tech Mono", monospace' }}>
                {Math.round(progress)}%
              </span>
            </div>
            <div
              className="h-2 rounded-sm overflow-hidden"
              style={{ background: 'oklch(0.12 0.03 145)', border: '1px solid oklch(0.25 0.08 145)' }}
            >
              <div
                className="h-full transition-all duration-100"
                style={{
                  width: `${progress}%`,
                  background: 'linear-gradient(90deg, oklch(0.55 0.15 145), oklch(0.85 0.22 145))',
                  boxShadow: '0 0 8px oklch(0.85 0.22 145 / 0.6)',
                  transition: 'width 0.1s linear',
                }}
              />
            </div>
          </div>
        )}

        {/* Buttons */}
        <div className="flex gap-3">
          {!isScanning && !isComplete && (
            <button
              onClick={startScan}
              className="btn-terminal px-6 py-2 text-sm tracking-widest"
            >
              [ START SCAN ]
            </button>
          )}
          {isScanning && (
            <button
              disabled
              className="btn-terminal px-6 py-2 text-sm tracking-widest opacity-60"
            >
              [ SCANNING... ]
            </button>
          )}
          {isComplete && (
            <>
              <button
                onClick={resetScan}
                className="btn-terminal px-6 py-2 text-sm tracking-widest"
              >
                [ NEW SCAN ]
              </button>
            </>
          )}
        </div>

        {/* Complete summary */}
        {isComplete && (
          <div
            className="mt-3 px-3 py-2 rounded-sm border"
            style={{
              background: 'oklch(0.6 0.22 25 / 0.08)',
              borderColor: 'oklch(0.6 0.22 25 / 0.4)',
            }}
          >
            <p
              className="text-xs"
              style={{
                color: 'oklch(0.7 0.22 25)',
                textShadow: '0 0 6px oklch(0.6 0.22 25 / 0.5)',
                fontFamily: '"Share Tech Mono", monospace',
              }}
            >
              ⚠ SCAN COMPLETE — {results.length} hosts scanned — {vulnerableCount} VULNERABILITIES FOUND
            </p>
          </div>
        )}
      </div>

      {/* Results */}
      <div className="flex-1 overflow-y-auto px-4 py-2">
        {results.length === 0 && !isScanning && !isComplete && (
          <div className="flex flex-col items-center justify-center h-full gap-3">
            <Wifi size={40} style={{ color: 'oklch(0.3 0.08 145)' }} />
            <p className="text-sm tracking-widest" style={{ color: 'oklch(0.35 0.08 145)', fontFamily: '"Share Tech Mono", monospace' }}>
              NO SCAN DATA
            </p>
            <p className="text-xs" style={{ color: 'oklch(0.3 0.06 145)', fontFamily: '"Share Tech Mono", monospace' }}>
              Press START SCAN to begin
            </p>
          </div>
        )}

        {results.map((result) => (
          <div
            key={result.id}
            className="flex items-center gap-2 py-2 border-b text-xs"
            style={{
              borderColor: 'oklch(0.15 0.04 145)',
              fontFamily: '"Share Tech Mono", monospace',
              animation: 'fadeIn 0.3s ease-in',
            }}
          >
            <span style={{ color: 'oklch(0.75 0.15 200)', minWidth: '110px', fontSize: '11px' }}>
              {result.ip}
            </span>
            <span style={{ color: 'oklch(0.65 0.12 145)', minWidth: '40px', fontSize: '11px' }}>
              :{result.port}
            </span>
            <span style={{ color: 'oklch(0.55 0.1 145)', minWidth: '70px', fontSize: '11px' }}>
              {result.service}
            </span>
            <StatusBadge status={result.status} />
            {result.cve && (
              <span style={{ color: 'oklch(0.55 0.18 25)', fontSize: '10px' }}>
                {result.cve}
              </span>
            )}
            <SeverityBadge severity={result.severity} />
          </div>
        ))}
      </div>
    </div>
  );
}
