import { useState, useEffect, useRef } from 'react';

export interface TerminalLine {
  id: number;
  text: string;
  type: 'command' | 'output' | 'error' | 'success' | 'info' | 'warning';
  timestamp?: string;
}

const BOOT_SEQUENCE: Array<{ text: string; type: TerminalLine['type']; delay: number }> = [
  { text: 'GHOST_OS v4.2.1 — Initializing kernel modules...', type: 'info', delay: 300 },
  { text: 'Loading cryptographic libraries... [OK]', type: 'success', delay: 500 },
  { text: 'Establishing anonymous routing via TOR network...', type: 'info', delay: 700 },
  { text: '> Connecting to node: 185.220.101.47 [RELAY]', type: 'output', delay: 400 },
  { text: '> Connecting to node: 62.102.148.69 [RELAY]', type: 'output', delay: 400 },
  { text: '> Connecting to node: 199.249.230.87 [EXIT]', type: 'output', delay: 400 },
  { text: 'TOR circuit established. Identity masked. [OK]', type: 'success', delay: 600 },
  { text: 'Scanning local network topology...', type: 'info', delay: 800 },
  { text: 'Found 14 active hosts on subnet 192.168.1.0/24', type: 'output', delay: 500 },
  { text: 'Loading exploit database... 47,291 entries loaded', type: 'info', delay: 600 },
  { text: 'Initializing payload generator...', type: 'info', delay: 400 },
  { text: 'Bypassing IDS/IPS signatures... [OK]', type: 'success', delay: 700 },
  { text: 'Spoofing MAC address: DE:AD:BE:EF:CA:FE', type: 'output', delay: 500 },
  { text: 'WARNING: Firewall detected on target 192.168.1.1', type: 'warning', delay: 600 },
  { text: 'Attempting firewall bypass via port 443 tunnel...', type: 'info', delay: 800 },
  { text: 'Firewall bypassed. [OK]', type: 'success', delay: 500 },
  { text: 'Injecting polymorphic shellcode...', type: 'info', delay: 700 },
  { text: 'Privilege escalation: root@target [OK]', type: 'success', delay: 600 },
  { text: '████████████████████ ACCESS GRANTED ████████████████████', type: 'success', delay: 800 },
  { text: 'System compromised. Establishing persistent backdoor...', type: 'output', delay: 600 },
  { text: 'Backdoor installed at /etc/.hidden/svc_daemon', type: 'output', delay: 400 },
  { text: 'Exfiltrating target data... 2.4 GB transferred', type: 'output', delay: 700 },
  { text: 'Covering tracks... log files purged [OK]', type: 'success', delay: 500 },
  { text: 'GHOST_OS ready. Type "help" for available commands.', type: 'info', delay: 600 },
];

export function useTerminalScript() {
  const [lines, setLines] = useState<TerminalLine[]>([]);
  const [isBooting, setIsBooting] = useState(true);
  const lineIdRef = useRef(0);
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const getTimestamp = () => {
    const now = new Date();
    return `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;
  };

  const addLine = (text: string, type: TerminalLine['type']) => {
    setLines(prev => [...prev, {
      id: lineIdRef.current++,
      text,
      type,
      timestamp: getTimestamp(),
    }]);
  };

  useEffect(() => {
    let cumulativeDelay = 0;

    BOOT_SEQUENCE.forEach((item) => {
      cumulativeDelay += item.delay;
      const t = setTimeout(() => {
        addLine(item.text, item.type);
      }, cumulativeDelay);
      timeoutsRef.current.push(t);
    });

    const finalTimeout = setTimeout(() => {
      setIsBooting(false);
    }, cumulativeDelay + 200);
    timeoutsRef.current.push(finalTimeout);

    return () => {
      timeoutsRef.current.forEach(clearTimeout);
    };
  }, []);

  return { lines, isBooting, addLine };
}
