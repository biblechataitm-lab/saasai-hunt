import React from 'react';
import { AlertTriangle } from 'lucide-react';

export function Maintenance({ message }: { message?: string | null }) {
  return (
    <div className="maintenance-container">
      <div className="maintenance-badge">
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
          <AlertTriangle size={14} /> Scheduled Maintenance
        </span>
      </div>
      <h1 className="maintenance-title">We'll be back shortly</h1>
      <p className="maintenance-message">
        {message || 'SaaSHunt is currently undergoing scheduled maintenance and upgrades. Please check back in a few minutes.'}
      </p>
    </div>
  );
}
