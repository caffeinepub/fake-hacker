import { useState, useRef, useEffect, KeyboardEvent, useCallback } from 'react';
import { useTerminalScript, TerminalLine } from '../hooks/useTerminalScript';
import { processCommand } from '../hooks/useCommandProcessor';
import MatrixRain from '../components/MatrixRain';
import HackProgressBar from '../components/HackProgressBar';
import { useHackProgress } from '../hooks/useHackProgress';

interface PendingOutput {
  id: number;
  lines: string[];
  type: TerminalLine['type'];
  timestamp: string;
}

export default function Terminal() {
  const { lines, isBooting, addLine } = useTerminalScript();
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [allLines, setAllLines] = useState(lines);
  const [pendingOutputs, setPendingOutputs] = useState<PendingOutput[]>([]);
  const [animatingId, setAnimatingId] = useState<number | null>(null);
  const [hackTarget, setHackTarget] = useState<string | null>(null);
  const outputRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const pendingIdRef = useRef(0);

  // Sync boot lines
  useEffect(() => {
    setAllLines(lines);
  }, [lines]);

  // Auto-scroll
  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [allLines, pendingOutputs, animatingId, hackTarget]);

  // Handle hack completion
  const handleHackComplete = useCallback((success: boolean, target: string) => {
    const msg = success
      ? `root@${target}:~# Shell obtained. Persistent backdoor installed.`
      : `Connection reset by peer. IDS triggered. Abort mission.`;
    const type: TerminalLine['type'] = success ? 'success' : 'error';

    // After a short delay, clear hack UI and add result to history
    setTimeout(() => {
      addLine(msg, type);
      setHackTarget(null);
    }, 800);
  }, [addLine]);

  const hackProgress = useHackProgress(handleHackComplete);

  const getTimestamp = () => {
    const now = new Date();
    return `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;
  };

  // Queue-based typewriter: collect lines added by commands and animate them
  const pendingQueueRef = useRef<PendingOutput[]>([]);
  const isAnimatingRef = useRef(false);

  const flushNextPending = useCallback(() => {
    if (pendingQueueRef.current.length === 0) {
      isAnimatingRef.current = false;
      setAnimatingId(null);
      return;
    }
    const next = pendingQueueRef.current.shift()!;
    isAnimatingRef.current = true;
    setAnimatingId(next.id);
    setPendingOutputs(prev => [...prev, next]);
  }, []);

  const handleAnimationComplete = useCallback((id: number) => {
    // Move from pending to allLines
    setPendingOutputs(prev => {
      const item = prev.find(p => p.id === id);
      if (item) {
        const ts = item.timestamp;
        item.lines.forEach(text => {
          addLine(text, item.type);
        });
      }
      return prev.filter(p => p.id !== id);
    });
    setAnimatingId(null);
    isAnimatingRef.current = false;
    // Process next in queue
    setTimeout(flushNextPending, 30);
  }, [addLine, flushNextPending]);

  // Intercept addLine calls from commands to animate them
  const animatedAddLine = useCallback((text: string, type: TerminalLine['type']) => {
    // For command echo lines, add directly (no typewriter)
    if (type === 'command') {
      addLine(text, type);
      return;
    }
    const id = pendingIdRef.current++;
    const item: PendingOutput = {
      id,
      lines: [text],
      type,
      timestamp: getTimestamp(),
    };
    pendingQueueRef.current.push(item);
    if (!isAnimatingRef.current) {
      flushNextPending();
    }
  }, [addLine, flushNextPending]);

  const handleCommand = () => {
    if (!input.trim()) return;
    if (hackProgress.isRunning) return; // block input during hack

    const result = processCommand(input, animatedAddLine);

    if (result.shouldClear) {
      setAllLines([]);
      setPendingOutputs([]);
      pendingQueueRef.current = [];
      isAnimatingRef.current = false;
      setAnimatingId(null);
    }

    if (result.hackTarget) {
      setHackTarget(result.hackTarget);
      hackProgress.start(result.hackTarget);
    }

    setHistory(prev => [input, ...prev.slice(0, 49)]);
    setHistoryIndex(-1);
    setInput('');
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommand();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const newIndex = Math.min(historyIndex + 1, history.length - 1);
      setHistoryIndex(newIndex);
      setInput(history[newIndex] || '');
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const newIndex = Math.max(historyIndex - 1, -1);
      setHistoryIndex(newIndex);
      setInput(newIndex === -1 ? '' : history[newIndex]);
    }
  };

  const getLineColor = (type: string) => {
    switch (type) {
      case 'command': return 'oklch(0.95 0.25 145)';
      case 'success': return 'oklch(0.85 0.22 145)';
      case 'error': return 'oklch(0.6 0.22 25)';
      case 'warning': return 'oklch(0.82 0.18 95)';
      case 'info': return 'oklch(0.75 0.15 200)';
      default: return 'oklch(0.65 0.12 145)';
    }
  };

  const getLineShadow = (type: string) => {
    switch (type) {
      case 'command': return '0 0 8px oklch(0.95 0.25 145 / 0.6)';
      case 'success': return '0 0 6px oklch(0.85 0.22 145 / 0.5)';
      case 'error': return '0 0 6px oklch(0.6 0.22 25 / 0.5)';
      case 'warning': return '0 0 6px oklch(0.82 0.18 95 / 0.4)';
      case 'info': return '0 0 6px oklch(0.75 0.15 200 / 0.4)';
      default: return 'none';
    }
  };

  const displayLines = allLines.length > 0 ? allLines : lines;
  const isInputDisabled = isBooting || hackProgress.isRunning;

  return (
    <div className="flex flex-col h-full relative overflow-hidden" style={{ background: 'oklch(0.06 0.015 145)' }}>
      {/* Matrix Rain Background */}
      <MatrixRain />

      {/* Header */}
      <div
        className="flex-shrink-0 flex items-center gap-3 px-4 py-3 border-b relative z-10"
        style={{
          background: 'oklch(0.07 0.02 145 / 0.95)',
          borderColor: 'oklch(0.25 0.08 145)',
          backdropFilter: 'blur(4px)',
        }}
      >
        <img
          src="/assets/generated/skull-icon.dim_128x128.png"
          alt="skull"
          className="w-8 h-8 opacity-80"
          style={{ filter: 'drop-shadow(0 0 6px oklch(0.85 0.22 145 / 0.6)) hue-rotate(0deg)' }}
        />
        <div>
          <h1
            className="text-sm font-bold tracking-widest glitch-text"
            style={{
              color: 'oklch(0.95 0.25 145)',
              textShadow: '0 0 10px oklch(0.85 0.22 145 / 0.8)',
              fontFamily: '"Share Tech Mono", monospace',
            }}
          >
            GHOST_OS v4.2.1
          </h1>
          <p className="text-xs tracking-wider" style={{ color: 'oklch(0.5 0.1 145)', fontFamily: '"Share Tech Mono", monospace' }}>
            {isBooting ? '[ INITIALIZING... ]' : hackProgress.isRunning ? '[ BREACH IN PROGRESS ]' : '[ SYSTEM READY ]'}
          </p>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <div
            className="w-2 h-2 rounded-full"
            style={{
              background: hackProgress.isRunning ? 'oklch(0.82 0.18 95)' : 'oklch(0.85 0.22 145)',
              boxShadow: hackProgress.isRunning
                ? '0 0 6px oklch(0.82 0.18 95)'
                : '0 0 6px oklch(0.85 0.22 145)',
              animation: hackProgress.isRunning ? 'flicker 0.5s infinite' : 'none',
            }}
          />
          <span className="text-xs tracking-wider" style={{ color: 'oklch(0.5 0.1 145)', fontFamily: '"Share Tech Mono", monospace' }}>
            {hackProgress.isRunning ? 'BREACH: ACTIVE' : 'TOR: ACTIVE'}
          </span>
        </div>
      </div>

      {/* Terminal Output */}
      <div
        ref={outputRef}
        className="flex-1 overflow-y-auto px-4 py-3 relative z-10"
        style={{
          background: 'oklch(0.06 0.015 145 / 0.85)',
          backdropFilter: 'blur(2px)',
        }}
        onClick={() => inputRef.current?.focus()}
      >
        {/* Committed lines */}
        {displayLines.map((line) => (
          <div
            key={line.id}
            className="text-xs leading-relaxed mb-0.5"
            style={{
              fontFamily: '"Share Tech Mono", "Courier New", monospace',
              color: getLineColor(line.type),
              textShadow: getLineShadow(line.type),
              wordBreak: 'break-all',
            }}
          >
            {line.type !== 'command' && (
              <span style={{ color: 'oklch(0.35 0.08 145)', marginRight: '8px' }}>
                [{line.timestamp}]
              </span>
            )}
            {line.text}
          </div>
        ))}

        {/* Typewriter-animated pending outputs */}
        {pendingOutputs.map((pending) => (
          <TypewriterLine
            key={pending.id}
            pending={pending}
            isActive={animatingId === pending.id}
            getColor={getLineColor}
            getShadow={getLineShadow}
            onComplete={() => handleAnimationComplete(pending.id)}
          />
        ))}

        {/* Hack Progress Bar */}
        {hackTarget && (
          <HackProgressBar
            status={hackProgress.status}
            stageIndex={hackProgress.stageIndex}
            progress={hackProgress.progress}
            stages={hackProgress.stages}
            currentStage={hackProgress.currentStage}
            completionMessage={hackProgress.completionMessage}
            target={hackTarget}
          />
        )}

        {/* Blinking cursor when booting */}
        {isBooting && (
          <div className="flex items-center gap-1 mt-1">
            <span className="text-xs" style={{ color: 'oklch(0.85 0.22 145)', fontFamily: '"Share Tech Mono", monospace' }}>
              ▋
            </span>
            <span className="blink-cursor text-xs" style={{ color: 'oklch(0.85 0.22 145)' }}>█</span>
          </div>
        )}
      </div>

      {/* Command Input */}
      <div
        className="flex-shrink-0 border-t px-4 py-3 relative z-10"
        style={{
          background: 'oklch(0.07 0.02 145 / 0.95)',
          borderColor: 'oklch(0.25 0.08 145)',
          backdropFilter: 'blur(4px)',
        }}
      >
        <div className="flex items-center gap-2">
          <span
            className="text-xs flex-shrink-0"
            style={{
              color: hackProgress.isRunning ? 'oklch(0.82 0.18 95)' : 'oklch(0.85 0.22 145)',
              textShadow: hackProgress.isRunning
                ? '0 0 8px oklch(0.82 0.18 95 / 0.6)'
                : '0 0 8px oklch(0.85 0.22 145 / 0.6)',
              fontFamily: '"Share Tech Mono", monospace',
            }}
          >
            ghost@operator:~$
          </span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isInputDisabled}
            placeholder={
              isBooting
                ? 'Initializing...'
                : hackProgress.isRunning
                ? 'Breach in progress...'
                : 'Enter command...'
            }
            className="terminal-input flex-1 text-xs py-1"
            autoComplete="off"
            spellCheck={false}
          />
          <span
            className="blink-cursor text-sm flex-shrink-0"
            style={{ color: hackProgress.isRunning ? 'oklch(0.82 0.18 95)' : 'oklch(0.85 0.22 145)' }}
          >
            █
          </span>
        </div>
        <p className="text-xs mt-1" style={{ color: 'oklch(0.35 0.08 145)', fontFamily: '"Share Tech Mono", monospace' }}>
          {hackProgress.isRunning
            ? `[ STAGE ${hackProgress.stageIndex + 1}/${hackProgress.stages.length} ] ${hackProgress.currentStage?.label ?? ''}`
            : 'Type "help" for commands • ↑↓ history'}
        </p>
      </div>
    </div>
  );
}

// Internal component for typewriter animation of a single pending output
interface TypewriterLineProps {
  pending: PendingOutput;
  isActive: boolean;
  getColor: (type: string) => string;
  getShadow: (type: string) => string;
  onComplete: () => void;
}

function TypewriterLine({ pending, isActive, getColor, getShadow, onComplete }: TypewriterLineProps) {
  const [visibleText, setVisibleText] = useState('');
  const [done, setDone] = useState(false);
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const text = pending.lines[0] ?? '';

  useEffect(() => {
    if (!isActive) return;

    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
    setVisibleText('');
    setDone(false);

    const CHAR_DELAY = 16;

    for (let i = 0; i <= text.length; i++) {
      const t = setTimeout(() => {
        setVisibleText(text.slice(0, i));
        if (i === text.length) {
          setDone(true);
          onComplete();
        }
      }, i * CHAR_DELAY);
      timeoutsRef.current.push(t);
    }

    return () => {
      timeoutsRef.current.forEach(clearTimeout);
    };
  }, [isActive, text]);

  if (!isActive && !done) return null;

  return (
    <div
      className="text-xs leading-relaxed mb-0.5"
      style={{
        fontFamily: '"Share Tech Mono", "Courier New", monospace',
        color: getColor(pending.type),
        textShadow: getShadow(pending.type),
        wordBreak: 'break-all',
        minHeight: '1.2em',
      }}
    >
      {pending.type !== 'command' && (
        <span style={{ color: 'oklch(0.35 0.08 145)', marginRight: '8px' }}>
          [{pending.timestamp}]
        </span>
      )}
      {visibleText}
      {!done && isActive && (
        <span className="blink-cursor" style={{ color: 'oklch(0.85 0.22 145)', marginLeft: '1px' }}>▋</span>
      )}
    </div>
  );
}

interface PendingOutput {
  id: number;
  lines: string[];
  type: TerminalLine['type'];
  timestamp: string;
}
