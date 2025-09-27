'use client';
import { Coins, Plus } from 'lucide-react';
import { User } from '@/lib/types';

interface CreditBalanceDisplayProps {
  variant?: 'small' | 'large';
  user?: User | null;
  onPurchaseCredits?: (amount: number) => void;
}

export function CreditBalanceDisplay({ variant = 'small', user, onPurchaseCredits }: CreditBalanceDisplayProps) {
  const credits = user?.creditsBalance || 0;

  if (variant === 'small') {
    return (
      <div className="flex items-center space-x-2 bg-surface px-3 py-2 cyber-border">
        <Coins className="w-4 h-4 text-accent" />
        <span className="text-sm font-medium">
          {credits} Credits
        </span>
      </div>
    );
  }

  return (
    <div className="cyber-card p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold neon-text">Credit Balance</h3>
        <Coins className="w-6 h-6 text-accent" />
      </div>

      <div className="text-center mb-6">
        <div className="text-4xl font-bold neon-text mb-2">
          {credits}
        </div>
        <p className="text-text-secondary text-sm">Available Credits</p>
      </div>

      <div className="space-y-3">
        <div className="grid grid-cols-3 gap-2 mb-4">
          {[10, 20, 50].map((amount) => (
            <button
              key={amount}
              onClick={() => onPurchaseCredits?.(amount)}
              className="btn-secondary text-xs py-2"
            >
              {amount}
            </button>
          ))}
        </div>

        <button
          onClick={() => onPurchaseCredits?.(20)}
          className="btn-primary w-full flex items-center justify-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Buy Credits</span>
        </button>

        <div className="text-xs text-text-secondary text-center">
          <p>• Basic Video: 1 credit</p>
          <p>• Premium Video: 2-3 credits</p>
          <p>• IP Registration: 1 credit</p>
        </div>
      </div>
    </div>
  );
}
