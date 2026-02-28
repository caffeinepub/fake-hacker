import { useState, useEffect, useRef, useCallback } from 'react';

interface UseTypewriterOptions {
  lines: string[];
  charDelay?: number; // ms per character
  lineDelay?: number; // ms between lines
  onComplete?: () => void;
}

export function useTypewriter({
  lines,
  charDelay = 18,
  lineDelay = 80,
  onComplete,
}: UseTypewriterOptions) {
  const [visibleLines, setVisibleLines] = useState<string[]>([]);
  const [isComplete, setIsComplete] = useState(false);
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    // Clear previous timers
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
    setVisibleLines([]);
    setIsComplete(false);

    if (!lines || lines.length === 0) {
      setIsComplete(true);
      onCompleteRef.current?.();
      return;
    }

    let cumulativeDelay = 0;

    lines.forEach((line, lineIdx) => {
      // Delay before starting this line
      cumulativeDelay += lineIdx === 0 ? 0 : lineDelay;
      const lineStartDelay = cumulativeDelay;

      // Animate characters in this line
      for (let charIdx = 0; charIdx <= line.length; charIdx++) {
        const charDelayCumulative = lineStartDelay + charIdx * charDelay;
        const partial = line.slice(0, charIdx);
        const t = setTimeout(() => {
          setVisibleLines(prev => {
            const next = [...prev];
            next[lineIdx] = partial;
            return next;
          });
        }, charDelayCumulative);
        timeoutsRef.current.push(t);
      }

      cumulativeDelay += line.length * charDelay;
    });

    // Mark complete after all lines
    const completionDelay = cumulativeDelay + 50;
    const tDone = setTimeout(() => {
      setIsComplete(true);
      onCompleteRef.current?.();
    }, completionDelay);
    timeoutsRef.current.push(tDone);

    return () => {
      timeoutsRef.current.forEach(clearTimeout);
    };
  }, [lines, charDelay, lineDelay]);

  return { visibleLines, isComplete };
}
