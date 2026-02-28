import { useState, useRef, useCallback } from 'react';

export interface ScanResult {
  id: number;
  ip: string;
  port: number;
  service: string;
  status: 'VULNERABLE' | 'OPEN' | 'ENCRYPTED' | 'FILTERED';
  cve?: string;
  severity?: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
}

const FAKE_IPS = [
  '10.0.0.1', '10.0.0.5', '10.0.0.12', '10.0.0.23', '10.0.0.47',
  '192.168.1.1', '192.168.1.5', '192.168.1.14', '192.168.1.22', '192.168.1.88',
  '172.16.0.1', '172.16.0.8', '172.16.0.15', '172.16.0.31', '172.16.0.99',
  '203.0.113.5', '198.51.100.12', '185.220.101.47', '62.102.148.69', '199.249.230.87',
];

const SERVICES = [
  { port: 22, service: 'SSH', status: 'VULNERABLE' as const, cve: 'CVE-2024-6387', severity: 'CRITICAL' as const },
  { port: 80, service: 'HTTP', status: 'OPEN' as const },
  { port: 443, service: 'HTTPS', status: 'ENCRYPTED' as const },
  { port: 21, service: 'FTP', status: 'VULNERABLE' as const, cve: 'CVE-2023-4911', severity: 'HIGH' as const },
  { port: 3306, service: 'MySQL', status: 'VULNERABLE' as const, cve: 'CVE-2024-20961', severity: 'CRITICAL' as const },
  { port: 8080, service: 'HTTP-ALT', status: 'OPEN' as const },
  { port: 25, service: 'SMTP', status: 'OPEN' as const },
  { port: 445, service: 'SMB', status: 'VULNERABLE' as const, cve: 'CVE-2017-0144', severity: 'CRITICAL' as const },
  { port: 3389, service: 'RDP', status: 'VULNERABLE' as const, cve: 'CVE-2019-0708', severity: 'CRITICAL' as const },
  { port: 8443, service: 'HTTPS-ALT', status: 'ENCRYPTED' as const },
  { port: 5432, service: 'PostgreSQL', status: 'FILTERED' as const },
  { port: 6379, service: 'Redis', status: 'VULNERABLE' as const, cve: 'CVE-2022-0543', severity: 'HIGH' as const },
  { port: 27017, service: 'MongoDB', status: 'VULNERABLE' as const, cve: 'CVE-2021-32030', severity: 'MEDIUM' as const },
  { port: 9200, service: 'Elasticsearch', status: 'OPEN' as const },
  { port: 2181, service: 'Zookeeper', status: 'OPEN' as const },
];

function generateScanResults(count: number): ScanResult[] {
  const results: ScanResult[] = [];
  for (let i = 0; i < count; i++) {
    const ip = FAKE_IPS[Math.floor(Math.random() * FAKE_IPS.length)];
    const svc = SERVICES[Math.floor(Math.random() * SERVICES.length)];
    results.push({
      id: i,
      ip,
      port: svc.port,
      service: svc.service,
      status: svc.status,
      cve: svc.cve,
      severity: svc.severity,
    });
  }
  return results;
}

export function useFakeScan() {
  const [isScanning, setIsScanning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [results, setResults] = useState<ScanResult[]>([]);
  const [isComplete, setIsComplete] = useState(false);
  const [scanPhase, setScanPhase] = useState('');
  const intervalsRef = useRef<ReturnType<typeof setInterval>[]>([]);
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearTimers = () => {
    intervalsRef.current.forEach(clearInterval);
    timeoutsRef.current.forEach(clearTimeout);
    intervalsRef.current = [];
    timeoutsRef.current = [];
  };

  const startScan = useCallback(() => {
    clearTimers();
    setIsScanning(true);
    setIsComplete(false);
    setResults([]);
    setProgress(0);
    setScanPhase('Initializing scanner...');

    const allResults = generateScanResults(18);
    const phases = [
      'Initializing scanner...',
      'Probing network topology...',
      'Sending SYN packets...',
      'Analyzing responses...',
      'Checking vulnerabilities...',
      'Running exploit checks...',
      'Correlating CVE database...',
      'Generating report...',
    ];

    let phaseIndex = 0;
    const phaseInterval = setInterval(() => {
      phaseIndex = (phaseIndex + 1) % phases.length;
      setScanPhase(phases[phaseIndex]);
    }, 1200);
    intervalsRef.current.push(phaseInterval);

    // Progress animation
    let currentProgress = 0;
    const progressInterval = setInterval(() => {
      currentProgress += Math.random() * 3 + 0.5;
      if (currentProgress >= 100) {
        currentProgress = 100;
        clearInterval(progressInterval);
      }
      setProgress(Math.min(currentProgress, 100));
    }, 80);
    intervalsRef.current.push(progressInterval);

    // Populate results over time
    allResults.forEach((result, index) => {
      const t = setTimeout(() => {
        setResults(prev => [...prev, result]);
      }, (index + 1) * 450);
      timeoutsRef.current.push(t);
    });

    // Complete scan
    const completionTimeout = setTimeout(() => {
      clearInterval(phaseInterval);
      clearInterval(progressInterval);
      setProgress(100);
      setIsScanning(false);
      setIsComplete(true);
      setScanPhase('Scan complete.');
    }, allResults.length * 450 + 800);
    timeoutsRef.current.push(completionTimeout);
  }, []);

  const resetScan = useCallback(() => {
    clearTimers();
    setIsScanning(false);
    setIsComplete(false);
    setResults([]);
    setProgress(0);
    setScanPhase('');
  }, []);

  const vulnerableCount = results.filter(r => r.status === 'VULNERABLE').length;

  return { isScanning, progress, results, isComplete, scanPhase, startScan, resetScan, vulnerableCount };
}
