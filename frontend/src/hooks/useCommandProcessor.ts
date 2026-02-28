import { TerminalLine } from './useTerminalScript';

type AddLineFn = (text: string, type: TerminalLine['type']) => void;

export interface CommandResult {
  shouldClear: boolean;
  hackTarget?: string; // set when 'hack' command is issued
}

const COMMANDS: Record<string, (args: string[], addLine: AddLineFn) => void> = {
  help: (_args, addLine) => {
    addLine('Available commands:', 'info');
    addLine('  help       — Show this help menu', 'output');
    addLine('  scan       — Scan network for vulnerabilities', 'output');
    addLine('  hack       — Initiate breach on target IP', 'output');
    addLine('  trace      — Trace route to target', 'output');
    addLine('  decrypt    — Decrypt intercepted payload', 'output');
    addLine('  exploit    — Run exploit against target', 'output');
    addLine('  whoami     — Display current user identity', 'output');
    addLine('  ifconfig   — Show network interfaces', 'output');
    addLine('  nmap       — Network mapper scan', 'output');
    addLine('  clear      — Clear terminal output', 'output');
    addLine('  status     — Show system status', 'output');
  },

  scan: (args, addLine) => {
    const target = args[0] || '192.168.1.0/24';
    addLine(`Initiating network scan on ${target}...`, 'info');
    addLine('Sending SYN packets...', 'output');
    addLine('Host 192.168.1.1   — OPEN  [ports: 22, 80, 443, 8080]', 'output');
    addLine('Host 192.168.1.5   — OPEN  [ports: 21, 22, 3306]', 'output');
    addLine('Host 192.168.1.12  — OPEN  [ports: 80, 8443]', 'output');
    addLine('Host 192.168.1.23  — OPEN  [ports: 22, 25, 587]', 'output');
    addLine('Scan complete. 4 hosts found, 12 open ports detected.', 'success');
  },

  // hack is handled specially in the component — no addLine here
  hack: (_args, _addLine) => {
    // handled in Terminal component via hackTarget
  },

  trace: (args, addLine) => {
    const target = args[0] || '8.8.8.8';
    addLine(`Tracing route to ${target}...`, 'info');
    addLine('1  192.168.1.1       1.2ms', 'output');
    addLine('2  10.0.0.1          8.4ms', 'output');
    addLine('3  185.220.101.47    22.1ms  [TOR RELAY]', 'output');
    addLine('4  62.102.148.69     45.7ms  [TOR RELAY]', 'output');
    addLine('5  199.249.230.87    89.3ms  [TOR EXIT]', 'output');
    addLine(`6  ${target}         112.5ms [TARGET]`, 'output');
    addLine('Trace complete. Identity obfuscated via TOR.', 'success');
  },

  decrypt: (args, addLine) => {
    const payload = args[0] || 'intercepted_payload.enc';
    addLine(`Loading encrypted payload: ${payload}`, 'info');
    addLine('Detecting cipher: AES-256-CBC', 'output');
    addLine('Running dictionary attack...', 'info');
    addLine('Trying 847,291 keys...', 'output');
    addLine('Key found: 0xDEADBEEFCAFEBABE', 'success');
    addLine('Decryption successful. Contents:', 'success');
    addLine('  USER: admin | PASS: Tr0ub4dor&3', 'output');
    addLine('  DB_HOST: 10.0.0.5 | DB_PASS: s3cr3t!', 'output');
    addLine('Payload decrypted and saved to /tmp/decrypted.txt', 'success');
  },

  exploit: (args, addLine) => {
    const target = args[0] || '192.168.1.5';
    addLine(`Loading exploit modules for ${target}...`, 'info');
    addLine('Module: ms17_010_eternalblue loaded', 'output');
    addLine('Setting RHOSTS to ' + target, 'output');
    addLine('Running exploit...', 'warning');
    addLine('[*] Started reverse TCP handler on 0.0.0.0:4444', 'output');
    addLine('[*] Sending stage (200774 bytes) to ' + target, 'output');
    addLine('[*] Meterpreter session 1 opened', 'success');
    addLine('meterpreter > ', 'success');
  },

  whoami: (_args, addLine) => {
    addLine('ghost_operator', 'output');
    addLine('uid=0(root) gid=0(root) groups=0(root)', 'output');
    addLine('Identity: CLASSIFIED', 'info');
    addLine('Location: [REDACTED] via TOR', 'info');
  },

  ifconfig: (_args, addLine) => {
    addLine('eth0: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>', 'output');
    addLine('      inet 192.168.1.100  netmask 255.255.255.0', 'output');
    addLine('      ether DE:AD:BE:EF:CA:FE  txqueuelen 1000', 'output');
    addLine('lo:   flags=73<UP,LOOPBACK,RUNNING>', 'output');
    addLine('      inet 127.0.0.1  netmask 255.0.0.0', 'output');
    addLine('tun0: flags=4305<UP,POINTOPOINT,RUNNING,NOARP,MULTICAST>', 'output');
    addLine('      inet 10.8.0.2  netmask 255.255.255.0  [TOR TUNNEL]', 'output');
  },

  nmap: (args, addLine) => {
    const target = args[0] || '192.168.1.1';
    addLine(`Starting Nmap 7.94 scan on ${target}`, 'info');
    addLine('PORT     STATE  SERVICE    VERSION', 'output');
    addLine('22/tcp   open   ssh        OpenSSH 8.9p1', 'output');
    addLine('80/tcp   open   http       Apache 2.4.52', 'output');
    addLine('443/tcp  open   https      nginx 1.18.0', 'output');
    addLine('3306/tcp open   mysql      MySQL 8.0.32', 'output');
    addLine('8080/tcp open   http-proxy Squid 5.7', 'output');
    addLine(`Nmap done: 1 IP address scanned in 4.23 seconds`, 'success');
  },

  status: (_args, addLine) => {
    addLine('=== GHOST_OS SYSTEM STATUS ===', 'info');
    addLine('TOR Circuit:    ACTIVE [3 hops]', 'success');
    addLine('VPN Tunnel:     ACTIVE [AES-256]', 'success');
    addLine('Firewall:       BYPASSED', 'success');
    addLine('IDS/IPS:        EVADED', 'success');
    addLine('Active Sessions: 3', 'output');
    addLine('Uptime:         47d 12h 33m', 'output');
    addLine('CPU Usage:      12%', 'output');
    addLine('Memory:         2.1GB / 16GB', 'output');
  },

  clear: (_args, _addLine) => {
    // handled in component
  },
};

export function processCommand(input: string, addLine: AddLineFn): CommandResult {
  const trimmed = input.trim().toLowerCase();
  if (!trimmed) return { shouldClear: false };

  const parts = trimmed.split(/\s+/);
  const cmd = parts[0];
  const args = parts.slice(1);

  addLine(`ghost@operator:~$ ${input}`, 'command');

  if (cmd === 'clear') {
    return { shouldClear: true };
  }

  if (cmd === 'hack') {
    const target = args[0] || '192.168.1.1';
    return { shouldClear: false, hackTarget: target };
  }

  const handler = COMMANDS[cmd];
  if (handler) {
    handler(args, addLine);
  } else {
    addLine(`Command not found: ${cmd}. Type "help" for available commands.`, 'error');
  }

  return { shouldClear: false };
}
