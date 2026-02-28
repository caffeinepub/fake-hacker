import { useTypewriter } from '../hooks/useTypewriter';

interface TypewriterOutputProps {
  lines: string[];
  lineType?: string;
  charDelay?: number;
  lineDelay?: number;
  onComplete?: () => void;
  getColor: (type: string) => string;
  getShadow: (type: string) => string;
  timestamp?: string;
}

export default function TypewriterOutput({
  lines,
  lineType = 'output',
  charDelay = 18,
  lineDelay = 80,
  onComplete,
  getColor,
  getShadow,
  timestamp,
}: TypewriterOutputProps) {
  const { visibleLines, isComplete } = useTypewriter({
    lines,
    charDelay,
    lineDelay,
    onComplete,
  });

  return (
    <>
      {visibleLines.map((text, idx) => (
        <div
          key={idx}
          className="text-xs leading-relaxed mb-0.5"
          style={{
            fontFamily: '"Share Tech Mono", "Courier New", monospace',
            color: getColor(lineType),
            textShadow: getShadow(lineType),
            wordBreak: 'break-all',
            minHeight: '1.2em',
          }}
        >
          {lineType !== 'command' && timestamp && (
            <span style={{ color: 'oklch(0.35 0.08 145)', marginRight: '8px' }}>
              [{timestamp}]
            </span>
          )}
          {text}
          {/* Blinking cursor on last line while animating */}
          {!isComplete && idx === visibleLines.length - 1 && (
            <span
              className="blink-cursor"
              style={{ color: 'oklch(0.85 0.22 145)', marginLeft: '1px' }}
            >
              ▋
            </span>
          )}
        </div>
      ))}
    </>
  );
}
