'use client';
import { useState } from 'react';
import { AppShell } from './components/AppShell';
import { CreditBalanceDisplay } from './components/CreditBalanceDisplay';
import { VideoTemplateSelector } from './components/VideoTemplateSelector';
import { MediaAssetBrowser } from './components/MediaAssetBrowser';
import { ProgressTracker } from './components/ProgressTracker';
import { IPStatusIndicator } from './components/IPStatusIndicator';
import { CrossPromoToggle } from './components/CrossPromoToggle';
import { Play, Zap, Shield, Users, ArrowRight, Sparkles } from 'lucide-react';

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<'create' | 'library' | 'settings'>('create');
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null);

  return (
    <AppShell variant="glass">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center space-x-2 bg-accent bg-opacity-20 px-4 py-2 cyber-border mb-6">
          <Sparkles className="w-4 h-4 text-accent" />
          <span className="text-sm font-medium text-accent uppercase tracking-wider">
            Decentralized Video Creation
          </span>
        </div>
        
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          <span className="neon-text">Block</span>
          <span className="text-fg">Video</span>
        </h1>
        
        <p className="text-xl text-text-secondary max-w-2xl mx-auto mb-8">
          Generate, protect, and distribute videos automatically using blockchain technology. 
          Create professional content in minutes, not hours.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <button className="btn-primary flex items-center space-x-2">
            <Play className="w-5 h-5" />
            <span>Start Creating</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <button className="btn-secondary">
            View Templates
          </button>
        </div>

        {/* Feature Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="glass-card p-6 text-center">
            <Zap className="w-8 h-8 text-accent mx-auto mb-4" />
            <h3 className="font-semibold text-fg mb-2">Automated Generation</h3>
            <p className="text-sm text-text-secondary">
              AI-powered video creation with customizable templates
            </p>
          </div>
          
          <div className="glass-card p-6 text-center">
            <Shield className="w-8 h-8 text-accent mx-auto mb-4" />
            <h3 className="font-semibold text-fg mb-2">IP Protection</h3>
            <p className="text-sm text-text-secondary">
              Blockchain-based ownership and provenance tracking
            </p>
          </div>
          
          <div className="glass-card p-6 text-center">
            <Users className="w-8 h-8 text-accent mx-auto mb-4" />
            <h3 className="font-semibold text-fg mb-2">Cross-Promotion</h3>
            <p className="text-sm text-text-secondary">
              Collaborative network for expanding your reach
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center space-x-1 mb-8 bg-surface p-1 cyber-border">
        {[
          { id: 'create', label: 'Create Video', icon: Play },
          { id: 'library', label: 'Media Library', icon: Users },
          { id: 'settings', label: 'Settings', icon: Shield }
        ].map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id as any)}
            className={`flex-1 flex items-center justify-center space-x-2 px-4 py-3 font-medium transition-all duration-200 ${
              activeTab === id 
                ? 'bg-accent text-bg cyber-border' 
                : 'text-text-secondary hover:text-fg hover:bg-surface'
            }`}
          >
            <Icon className="w-4 h-4" />
            <span className="hidden sm:inline">{label}</span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {activeTab === 'create' && (
            <>
              <div>
                <h2 className="text-2xl font-semibold text-fg mb-6">Choose Your Template</h2>
                <VideoTemplateSelector 
                  variant="grid" 
                  onSelect={setSelectedTemplate}
                />
              </div>
              
              {selectedTemplate && (
                <div>
                  <h2 className="text-2xl font-semibold text-fg mb-6">Select Media Assets</h2>
                  <MediaAssetBrowser variant="images" />
                </div>
              )}
            </>
          )}

          {activeTab === 'library' && (
            <div>
              <h2 className="text-2xl font-semibold text-fg mb-6">Media Library</h2>
              <MediaAssetBrowser />
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-semibold text-fg mb-6">IP Protection</h2>
                <IPStatusIndicator 
                  variant="registered"
                  txHash="0x1234567890abcdef1234567890abcdef12345678"
                  timestamp="2024-01-15 14:30 UTC"
                />
              </div>
              
              <div>
                <h2 className="text-2xl font-semibold text-fg mb-6">Cross-Promotion</h2>
                <CrossPromoToggle variant="on" />
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <CreditBalanceDisplay variant="large" userId="user123" />
          
          {selectedTemplate && (
            <ProgressTracker variant="videoGeneration" />
          )}
          
          <div className="cyber-card p-6">
            <h3 className="text-lg font-semibold neon-text mb-4">Recent Activity</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-sm">
                <div className="w-2 h-2 bg-accent rounded-full"></div>
                <span className="text-fg">Product demo video created</span>
                <span className="text-text-secondary ml-auto">2h ago</span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <div className="w-2 h-2 bg-accent rounded-full"></div>
                <span className="text-fg">IP registered on blockchain</span>
                <span className="text-text-secondary ml-auto">4h ago</span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <div className="w-2 h-2 bg-accent rounded-full"></div>
                <span className="text-fg">Cross-promotion activated</span>
                <span className="text-text-secondary ml-auto">1d ago</span>
              </div>
            </div>
          </div>

          <div className="cyber-card p-6">
            <h3 className="text-lg font-semibold neon-text mb-4">Network Stats</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-text-secondary">Total Videos</span>
                <span className="text-fg font-medium">1,247</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-text-secondary">Active Creators</span>
                <span className="text-fg font-medium">89</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-text-secondary">IP Registrations</span>
                <span className="text-fg font-medium">892</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-text-secondary">Cross-Promotions</span>
                <span className="text-accent font-medium">+156 today</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
