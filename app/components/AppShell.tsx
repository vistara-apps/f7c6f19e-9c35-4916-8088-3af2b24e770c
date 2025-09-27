'use client';
import { ReactNode } from 'react';
import { ConnectWallet, Wallet } from '@coinbase/onchainkit/wallet';
import { Name, Avatar } from '@coinbase/onchainkit/identity';
import { Play, Zap, Shield, Users } from 'lucide-react';

interface AppShellProps {
  children: ReactNode;
  variant?: 'default' | 'glass';
}

export function AppShell({ children, variant = 'default' }: AppShellProps) {
  const shellClass = variant === 'glass' ? 'glass-card' : 'cyber-card';

  return (
    <div className="min-h-screen bg-bg">
      {/* Header */}
      <header className="border-b-2 border-accent bg-surface bg-opacity-50 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Play className="w-8 h-8 text-accent" />
                <h1 className="text-2xl font-bold neon-text">BlockVideo</h1>
              </div>
              <div className="hidden md:flex items-center space-x-6 ml-8">
                <div className="flex items-center space-x-2 text-text-secondary">
                  <Zap className="w-4 h-4" />
                  <span className="text-sm">Auto Generation</span>
                </div>
                <div className="flex items-center space-x-2 text-text-secondary">
                  <Shield className="w-4 h-4" />
                  <span className="text-sm">IP Protection</span>
                </div>
                <div className="flex items-center space-x-2 text-text-secondary">
                  <Users className="w-4 h-4" />
                  <span className="text-sm">Cross-Promotion</span>
                </div>
              </div>
            </div>
            
            <Wallet>
              <ConnectWallet>
                <div className="flex items-center space-x-3 bg-surface px-4 py-2 cyber-border">
                  <Avatar className="w-8 h-8" />
                  <Name className="text-fg font-medium" />
                </div>
              </ConnectWallet>
            </Wallet>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className={`max-w-7xl mx-auto px-6 py-8 ${shellClass}`}>
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t-2 border-accent bg-surface bg-opacity-50 backdrop-blur-md mt-16">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="text-center text-text-secondary">
            <p className="text-sm">
              Powered by Base Network • Decentralized Video Creation Platform
            </p>
            <div className="flex justify-center items-center space-x-4 mt-4">
              <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
              <span className="text-xs uppercase tracking-wider">Blockchain Secured</span>
              <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
