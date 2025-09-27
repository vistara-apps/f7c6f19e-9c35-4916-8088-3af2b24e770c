'use client';
import { useState, useEffect } from 'react';
import { Coins, Plus } from 'lucide-react';

interface CreditBalanceDisplayProps {
  variant?: 'small' | 'large';
  userId?: string;
}

export function CreditBalanceDisplay({ variant = 'small', userId }: CreditBalanceDisplayProps) {
  const [credits, setCredits] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching credits
    const fetchCredits = async () => {
      setLoading(true);
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setCredits(25); // Mock credits
      setLoading(false);
    };

    if (userId) {
      fetchCredits();
    } else {
      setLoading(false);
    }
  }, [userId]);

  if (variant === 'small') {
    return (
      <div className="flex items-center space-x-2 bg-surface px-3 py-2 cyber-border">
        <Coins className="w-4 h-4 text-accent" />
        <span className="text-sm font-medium">
          {loading ? '...' : credits} Credits
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
          {loading ? '...' : credits}
        </div>
        <p className="text-text-secondary text-sm">Available Credits</p>
      </div>

      <div className="space-y-3">
        <button className="btn-primary w-full flex items-center justify-center space-x-2">
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
