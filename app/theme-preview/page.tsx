'use client';
import { useTheme } from '../components/ThemeProvider';
import { AppShell } from '../components/AppShell';
import { CreditBalanceDisplay } from '../components/CreditBalanceDisplay';
import { VideoTemplateSelector } from '../components/VideoTemplateSelector';
import { IPStatusIndicator } from '../components/IPStatusIndicator';

const themes = [
  { id: 'default', name: 'Cyberpunk Gaming', description: 'Dark purple with neon green accents' },
  { id: 'celo', name: 'CELO', description: 'Black background with yellow accents' },
  { id: 'solana', name: 'Solana', description: 'Dark purple with magenta accents' },
  { id: 'base', name: 'Base', description: 'Dark blue with Base blue accents' },
  { id: 'coinbase', name: 'Coinbase', description: 'Dark navy with Coinbase blue accents' }
];

export default function ThemePreview() {
  const { theme, setTheme } = useTheme();

  return (
    <AppShell>
      <div className="space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold neon-text mb-4">Theme Preview</h1>
          <p className="text-text-secondary">
            Preview different blockchain themes for BlockVideo
          </p>
        </div>

        {/* Theme Selector */}
        <div className="cyber-card p-6">
          <h2 className="text-xl font-semibold text-fg mb-4">Select Theme</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {themes.map((themeOption) => (
              <button
                key={themeOption.id}
                onClick={() => setTheme(themeOption.id as any)}
                className={`p-4 text-left cyber-border transition-all duration-200 ${
                  theme === themeOption.id 
                    ? 'bg-accent bg-opacity-20 shadow-cyber' 
                    : 'bg-surface hover:bg-opacity-80'
                }`}
              >
                <h3 className="font-semibold text-fg mb-2">{themeOption.name}</h3>
                <p className="text-sm text-text-secondary">{themeOption.description}</p>
                {theme === themeOption.id && (
                  <div className="mt-2 text-xs text-accent font-medium">ACTIVE</div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Component Previews */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-fg">Components Preview</h2>
            
            <CreditBalanceDisplay
              variant="large"
              user={{ userId: 'preview', walletAddress: '0x123...', creditsBalance: 25, creationDate: new Date().toISOString() }}
            />
            
            <IPStatusIndicator 
              variant="registered"
              txHash="0x1234567890abcdef1234567890abcdef12345678"
              timestamp="2024-01-15 14:30 UTC"
            />
          </div>

          <div>
            <h2 className="text-xl font-semibold text-fg mb-6">Template Selector</h2>
            <VideoTemplateSelector variant="list" />
          </div>
        </div>

        {/* Color Palette */}
        <div className="cyber-card p-6">
          <h2 className="text-xl font-semibold text-fg mb-4">Current Color Palette</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="w-16 h-16 bg-bg cyber-border mx-auto mb-2"></div>
              <div className="text-sm text-text-secondary">Background</div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-surface cyber-border mx-auto mb-2"></div>
              <div className="text-sm text-text-secondary">Surface</div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-accent cyber-border mx-auto mb-2"></div>
              <div className="text-sm text-text-secondary">Accent</div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-fg cyber-border mx-auto mb-2"></div>
              <div className="text-sm text-text-secondary">Foreground</div>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
