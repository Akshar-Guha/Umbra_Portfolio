import React from 'react';

// Placeholder system log entries
const logEntries = [
  {
    timestamp: '██:██:██', // Placeholder timestamp
    message: 'Connection established. Data integrity verified.', // Thematic message
    source: '[REDACTED]', // Placeholder source
  },
  {
    timestamp: '██:██:██',
    message: 'Protocol analysis complete. Vulnerabilities patched.',
    source: '[ANONYMOUS]',
  },
  {
    timestamp: '██:██:██',
    message: 'System footprint minimized. Evasion successful.',
    source: '[CLASSIFIED]',
  },
  // Add more placeholder entries as needed
];

const SystemLogs: React.FC = () => {
  return (
    <section id="systemlogs" className="py-16 bg-black text-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">&lbrace; System Logs &rbrace;</h2>{/* Thematic heading */}
        <div className="space-y-6">
          {logEntries.map((log, index) => (
            <div key={index} className="bg-gray-900 rounded-lg p-6 shadow-xl border border-gray-800 font-mono text-sm text-gray-400">
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">{log.timestamp}</span>
                <span className="text-gray-500">Source: {log.source}</span>
              </div>
              <p>{log.message}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SystemLogs; 