import { useState, useEffect, useRef, useCallback } from 'react';

export interface HackStage {
  label: string;
  detail: string;
  duration: number; // ms
}

const HACK_STAGES: HackStage[] = [
  { label: 'Probing target...', detail: 'Fingerprinting OS and open services', duration: 1200 },
  { label: 'Bypassing firewall...', detail: 'Tunneling through port 443 via SSL', duration: 1500 },
  { label: 'Injecting payload...', detail: 'CVE-2024-1337 buffer overflow exploit', duration: 1800 },
  { label: 'Escalating privileges...', detail: 'Kernel exploit → root access', duration: 1400 },
  { label: 'Extracting data...', detail: 'Exfiltrating /etc/shadow and credentials', duration: 1600 },
  { label: 'Covering tracks...', detail: 'Purging logs, installing backdoor', duration: 1000 },
];

export type HackStatus = 'idle' | 'running' | 'success' | 'failure';

export interface HackProgressState {
  status: HackStatus;
  stageIndex: number;
  progress: number; // 0–100
  stages: HackStage[];
  currentStage: HackStage | null;
  completionMessage: string;
}

export function useHackProgress(onComplete: (success: boolean, target: string) => void) {
  const [status, setStatus] = useState<HackStatus>('idle');
  const [stageIndex, setStageIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [completionMessage, setCompletionMessage] = useState('');
  const targetRef = useRef('');
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearTimers = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
  }, []);

  const start = useCallback((target: string) => {
    clearTimers();
    targetRef.current = target;
    setStatus('running');
    setStageIndex(0);
    setProgress(0);
    setCompletionMessage('');

    let currentStage = 0;
    let cumulativeDelay = 0;

    HACK_STAGES.forEach((stage, idx) => {
      // Animate progress within each stage
      const stageStart = cumulativeDelay;
      const stageEnd = cumulativeDelay + stage.duration;
      const stageProgressStart = (idx / HACK_STAGES.length) * 100;
      const stageProgressEnd = ((idx + 1) / HACK_STAGES.length) * 100;

      const t1 = setTimeout(() => {
        setStageIndex(idx);
        currentStage = idx;
      }, stageStart);
      timeoutsRef.current.push(t1);

      // Smooth progress within stage using small increments
      const steps = 20;
      for (let s = 0; s <= steps; s++) {
        const stepDelay = stageStart + (stage.duration * s) / steps;
        const stepProgress = stageProgressStart + ((stageProgressEnd - stageProgressStart) * s) / steps;
        const t2 = setTimeout(() => {
          setProgress(Math.min(stepProgress, 100));
        }, stepDelay);
        timeoutsRef.current.push(t2);
      }

      cumulativeDelay = stageEnd;
    });

    // Completion
    const successChance = Math.random() > 0.15; // 85% success rate
    const finalDelay = cumulativeDelay + 300;

    const tFinal = setTimeout(() => {
      setProgress(100);
      if (successChance) {
        setStatus('success');
        setCompletionMessage(`ACCESS GRANTED — root@${target} shell obtained`);
        onComplete(true, target);
      } else {
        setStatus('failure');
        setCompletionMessage(`INTRUSION DETECTED — connection terminated by ${target}`);
        onComplete(false, target);
      }
    }, finalDelay);
    timeoutsRef.current.push(tFinal);
  }, [clearTimers, onComplete]);

  const reset = useCallback(() => {
    clearTimers();
    setStatus('idle');
    setStageIndex(0);
    setProgress(0);
    setCompletionMessage('');
  }, [clearTimers]);

  useEffect(() => {
    return () => clearTimers();
  }, [clearTimers]);

  return {
    status,
    stageIndex,
    progress,
    stages: HACK_STAGES,
    currentStage: status === 'running' ? HACK_STAGES[stageIndex] : null,
    completionMessage,
    start,
    reset,
    isRunning: status === 'running',
    isDone: status === 'success' || status === 'failure',
  };
}
