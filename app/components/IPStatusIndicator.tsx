'use client';
import { Shield, ShieldCheck, Clock, AlertTriangle } from 'lucide-react';

interface IPStatusIndicatorProps {
  variant?: 'registered' | 'pending' | 'unregistered';
  txHash?: string;
  timestamp?: string;
}

export function IPStatusIndicator({ 
  variant = 'unregistered', 
  txHash,
  timestamp 
}: IPStatusIndicatorProps) {
  const getStatusConfig = () => {
    switch (variant) {
      case 'registered':
        return {
          icon: <ShieldCheck className="w-5 h-5 text-accent" />,
          title: 'IP Protected',
          description: 'Your content is registered on the blockchain',
          bgColor: 'bg-accent bg-opacity-20',
          borderColor: 'border-accent'
        };
      case 'pending':
        return {
          icon: <Clock className="w-5 h-5 text-yellow-400 animate-pulse" />,
          title: 'Registration Pending',
          description: 'Blockchain registration in progress',
          bgColor: 'bg-yellow-400 bg-opacity-20',
          borderColor: 'border-yellow-400'
        };
      default:
        return {
          icon: <Shield className="w-5 h-5 text-text-secondary" />,
          title: 'Not Protected',
          description: 'Register your IP for blockchain protection',
          bgColor: 'bg-surface',
          borderColor: 'border-text-secondary'
        };
    }
  };

  const config = getStatusConfig();

  return (
    <div className={`p-4 cyber-border ${config.bgColor} ${config.borderColor}`}>
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0 mt-0.5">
          {config.icon}
        </div>
        
        <div className="flex-1 min-w-0">
          <h4 className="font-medium text-fg mb-1">{config.title}</h4>
          <p className="text-sm text-text-secondary mb-3">{config.description}</p>
          
          {variant === 'registered' && txHash && (
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-xs">
                <span className="text-text-secondary">Transaction:</span>
                <code className="text-accent font-mono bg-surface px-2 py-1 rounded">
                  {txHash.slice(0, 10)}...{txHash.slice(-8)}
                </code>
              </div>
              {timestamp && (
                <div className="flex items-center space-x-2 text-xs">
                  <span className="text-text-secondary">Registered:</span>
                  <span className="text-fg">{timestamp}</span>
                </div>
              )}
            </div>
          )}
          
          {variant === 'unregistered' && (
            <button className="btn-secondary text-xs px-4 py-2">
              Register IP (1 credit)
            </button>
          )}
          
          {variant === 'pending' && (
            <div className="flex items-center space-x-2 text-xs text-yellow-400">
              <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
              <span>Confirming on Base network...</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
