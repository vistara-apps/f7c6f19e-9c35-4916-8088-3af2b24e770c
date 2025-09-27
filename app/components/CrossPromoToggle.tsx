'use client';
import { useState } from 'react';
import { Users, UserCheck } from 'lucide-react';

interface CrossPromoToggleProps {
  variant?: 'on' | 'off';
  onChange?: (enabled: boolean) => void;
}

export function CrossPromoToggle({ variant = 'off', onChange }: CrossPromoToggleProps) {
  const [isEnabled, setIsEnabled] = useState(variant === 'on');

  const handleToggle = () => {
    const newState = !isEnabled;
    setIsEnabled(newState);
    onChange?.(newState);
  };

  return (
    <div className="cyber-card p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          {isEnabled ? (
            <UserCheck className="w-6 h-6 text-accent" />
          ) : (
            <Users className="w-6 h-6 text-text-secondary" />
          )}
          <h3 className="text-lg font-semibold text-fg">Cross-Promotion Network</h3>
        </div>
        
        <button
          onClick={handleToggle}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
            isEnabled ? 'bg-accent' : 'bg-surface border-2 border-text-secondary'
          }`}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-bg transition-transform ${
              isEnabled ? 'translate-x-6' : 'translate-x-1'
            }`}
          />
        </button>
      </div>

      <p className="text-sm text-text-secondary mb-4">
        {isEnabled 
          ? 'Your videos are eligible for cross-promotion with other creators in the network.'
          : 'Enable to participate in collaborative promotion and expand your reach.'
        }
      </p>

      {isEnabled && (
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-text-secondary">Network Status:</span>
            <span className="text-accent font-medium">Active</span>
          </div>
          
          <div className="flex items-center justify-between text-sm">
            <span className="text-text-secondary">Eligible Videos:</span>
            <span className="text-fg">3 videos</span>
          </div>
          
          <div className="flex items-center justify-between text-sm">
            <span className="text-text-secondary">Promotion Credits:</span>
            <span className="text-accent font-medium">+12 earned</span>
          </div>
          
          <div className="mt-4 p-3 bg-accent bg-opacity-10 cyber-border">
            <p className="text-xs text-accent">
              💡 Tip: Videos with higher engagement get more cross-promotion opportunities
            </p>
          </div>
        </div>
      )}

      {!isEnabled && (
        <div className="mt-4 space-y-2 text-xs text-text-secondary">
          <p>• Boost your video reach through community promotion</p>
          <p>• Earn credits when others promote your content</p>
          <p>• Discover new audiences in your niche</p>
        </div>
      )}
    </div>
  );
}
