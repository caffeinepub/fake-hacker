import { useEffect, useRef } from 'react';

interface Props {
  status: 'idle' | 'running' | 'success' | 'failure';
  stageIndex: number;
  progress: number;
  stages: Array<{ label: string; detail: string; duration: number }>;
  currentStage: { label: string; detail: string; duration: number } | null;
  completionMessage: string;
  target: string;
}

export default function HackProgressBar({
  status,
  stageIndex,
  progress,
  stages,
  currentStage,
  completionMessage,
  target,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [progress]);

  if (status === 'idle') return null;

  const isSuccess = status === 'success';
  const isFailure = status === 'failure';
  const isDone = isSuccess || isFailure;

  const barGlow = isFailure
    ? '0 0 8px oklch(0.6 0.22 25 / 0.7)'
    : '0 0 8px oklch(0.85 0.22 145 / 0.7)';
  const textColor = isFailure
    ? 'oklch(0.6 0.22 25)'
    : 'oklch(0.85 0.22 145)';

  return (
    <div
      ref={containerRef}
      className="my-2 px-1"
      style={{ fontFamily: '"Share Tech Mono", "Courier New", monospace' }}
    >
      {/* Target header */}
      <div className="text-xs mb-1" style={{ color: 'oklch(0.65 0.12 145)' }}>
        <span style={{ color: 'oklch(0.5 0.1 145)' }}>[HACK] </span>
        Targeting{' '}
        <span style={{ color: 'oklch(0.95 0.25 145)', textShadow: '0 0 6px oklch(0.85 0.22 145 / 0.5)' }}>
          {target}
        </span>
      </div>

      {/* Stage list */}
      <div className="mb-2 space-y-0.5">
        {stages.map((stage, idx) => {
          const isActive = idx === stageIndex && status === 'running';
          const isDoneStage = isDone ? true : idx < stageIndex;

          return (
            <div key={idx} className="flex items-center gap-2 text-xs">
              <span
                style={{
                  color: isDoneStage
                    ? (isFailure && idx === stages.length - 1 ? 'oklch(0.6 0.22 25)' : 'oklch(0.85 0.22 145)')
                    : isActive
                    ? 'oklch(0.95 0.25 145)'
                    : 'oklch(0.3 0.06 145)',
                  textShadow: isActive ? '0 0 6px oklch(0.85 0.22 145 / 0.6)' : 'none',
                  minWidth: '12px',
                }}
              >
                {isDoneStage ? (isFailure && idx >= stageIndex ? '✗' : '✓') : isActive ? '▶' : '·'}
              </span>
              <span
                style={{
                  color: isDoneStage
                    ? 'oklch(0.55 0.1 145)'
                    : isActive
                    ? 'oklch(0.95 0.25 145)'
                    : 'oklch(0.3 0.06 145)',
                  textShadow: isActive ? '0 0 4px oklch(0.85 0.22 145 / 0.4)' : 'none',
                }}
              >
                {stage.label}
                {isActive && (
                  <span
                    className="ml-1 opacity-60"
                    style={{ color: 'oklch(0.65 0.12 145)', fontSize: '0.65rem' }}
                  >
                    {stage.detail}
                  </span>
                )}
              </span>
            </div>
          );
        })}
      </div>

      {/* Progress bar */}
      <div className="mb-1">
        <div className="flex justify-between text-xs mb-0.5" style={{ color: 'oklch(0.5 0.1 145)' }}>
          <span>PROGRESS</span>
          <span style={{ color: textColor }}>{Math.round(progress)}%</span>
        </div>
        <div
          className="w-full h-3 relative overflow-hidden"
          style={{
            background: 'oklch(0.12 0.03 145)',
            border: '1px solid oklch(0.25 0.08 145)',
          }}
        >
          {/* Animated fill */}
          <div
            className="h-full relative"
            style={{
              width: `${progress}%`,
              background: isFailure
                ? 'oklch(0.6 0.22 25)'
                : 'oklch(0.85 0.22 145)',
              boxShadow: barGlow,
              transition: 'width 0.15s linear',
            }}
          >
            {/* Shimmer effect */}
            {status === 'running' && (
              <div
                className="absolute inset-0 opacity-40"
                style={{
                  background: 'linear-gradient(90deg, transparent 0%, oklch(1 0 0 / 0.3) 50%, transparent 100%)',
                  animation: 'shimmer 1s infinite linear',
                }}
              />
            )}
          </div>
          {/* Block characters overlay */}
          <div
            className="absolute inset-0 flex items-center px-1 text-xs pointer-events-none"
            style={{
              color: 'oklch(0.06 0.015 145)',
              fontFamily: '"Share Tech Mono", monospace',
              fontSize: '0.55rem',
              letterSpacing: '0.05em',
              mixBlendMode: 'difference',
            }}
          >
            {'█'.repeat(Math.floor(progress / 5))}
          </div>
        </div>
      </div>

      {/* Completion message */}
      {isDone && (
        <div
          className="mt-2 text-xs py-1 px-2 border"
          style={{
            color: isSuccess ? 'oklch(0.95 0.25 145)' : 'oklch(0.7 0.22 25)',
            borderColor: isSuccess ? 'oklch(0.35 0.12 145)' : 'oklch(0.35 0.12 25)',
            background: isSuccess ? 'oklch(0.1 0.03 145)' : 'oklch(0.1 0.03 25)',
            textShadow: isSuccess
              ? '0 0 8px oklch(0.85 0.22 145 / 0.6)'
              : '0 0 8px oklch(0.6 0.22 25 / 0.6)',
          }}
        >
          {isSuccess ? '[ SUCCESS ] ' : '[ FAILURE ] '}
          {completionMessage}
        </div>
      )}
    </div>
  );
}
