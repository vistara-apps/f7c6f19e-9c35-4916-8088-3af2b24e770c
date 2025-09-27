'use client';
import { useState, useEffect } from 'react';
import { AppShell } from './components/AppShell';
import { CreditBalanceDisplay } from './components/CreditBalanceDisplay';
import { VideoTemplateSelector } from './components/VideoTemplateSelector';
import { MediaAssetBrowser } from './components/MediaAssetBrowser';
import { ProgressTracker } from './components/ProgressTracker';
import { IPStatusIndicator } from './components/IPStatusIndicator';
import { CrossPromoToggle } from './components/CrossPromoToggle';
import { Play, Zap, Shield, Users, ArrowRight, Sparkles, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { VideoTemplate, MediaAsset, Video, User } from '@/lib/types';

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<'create' | 'library' | 'settings'>('create');
  const [selectedTemplate, setSelectedTemplate] = useState<VideoTemplate | null>(null);
  const [selectedAssets, setSelectedAssets] = useState<MediaAsset[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [videos, setVideos] = useState<Video[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationStatus, setGenerationStatus] = useState<'idle' | 'generating' | 'completed' | 'failed'>('idle');
  const [currentVideo, setCurrentVideo] = useState<Video | null>(null);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);

  // Check for wallet connection on mount
  useEffect(() => {
    const checkWalletConnection = async () => {
      // In a real implementation, this would check the wallet connection
      // For now, we'll simulate a connected wallet
      const mockWalletAddress = '0x1234567890abcdef1234567890abcdef12345678';
      setWalletAddress(mockWalletAddress);

      try {
        // Try to get user data
        const response = await fetch(`/api/auth/connect?walletAddress=${mockWalletAddress}`);
        const data = await response.json();
        if (data.success) {
          setUser(data.data);
        }
      } catch (error) {
        console.error('Failed to connect wallet:', error);
      }
    };

    checkWalletConnection();
  }, []);

  // Load user's videos when user changes
  useEffect(() => {
    const loadUserVideos = async () => {
      if (!user || !walletAddress) return;

      try {
        const response = await fetch(`/api/videos?walletAddress=${walletAddress}`);
        const data = await response.json();
        if (data.success) {
          setVideos(data.data.items);
        }
      } catch (error) {
        console.error('Failed to load videos:', error);
      }
    };

    loadUserVideos();
  }, [user, walletAddress]);

  const handleAssetSelect = (asset: MediaAsset) => {
    setSelectedAssets(prev => {
      const isSelected = prev.some(a => a.assetId === asset.assetId);
      if (isSelected) {
        return prev.filter(a => a.assetId !== asset.assetId);
      } else {
        return [...prev, asset];
      }
    });
  };

  const handleGenerateVideo = async () => {
    if (!selectedTemplate || !walletAddress || selectedAssets.length === 0) {
      alert('Please select a template and at least one media asset');
      return;
    }

    setIsGenerating(true);
    setGenerationStatus('generating');

    try {
      const requestData = {
        templateId: selectedTemplate.templateId,
        promptText: `Create a ${selectedTemplate.category} video about ${selectedTemplate.name}`,
        mediaAssetIds: selectedAssets.map(a => a.assetId),
        title: `${selectedTemplate.name} Video`,
        description: `Generated using ${selectedTemplate.name} template`,
        registerIP: true, // Enable IP registration by default
      };

      const response = await fetch('/api/videos/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-wallet-address': walletAddress,
        },
        body: JSON.stringify(requestData),
      });

      const data = await response.json();

      if (data.success) {
        setCurrentVideo(data.data);
        setGenerationStatus('generating');

        // Poll for completion
        const pollInterval = setInterval(async () => {
          try {
            const videoResponse = await fetch(`/api/videos?walletAddress=${walletAddress}`);
            const videoData = await videoResponse.json();

            if (videoData.success) {
              const updatedVideo = videoData.data.items.find((v: Video) => v.videoId === data.data.videoId);
              if (updatedVideo) {
                setCurrentVideo(updatedVideo);
                if (updatedVideo.status === 'completed') {
                  setGenerationStatus('completed');
                  setVideos(prev => [updatedVideo, ...prev]);
                  clearInterval(pollInterval);
                } else if (updatedVideo.status === 'failed') {
                  setGenerationStatus('failed');
                  clearInterval(pollInterval);
                }
              }
            }
          } catch (error) {
            console.error('Error polling video status:', error);
          }
        }, 2000); // Poll every 2 seconds

        // Clear after 30 seconds as fallback
        setTimeout(() => {
          clearInterval(pollInterval);
          if (generationStatus === 'generating') {
            setGenerationStatus('failed');
          }
        }, 30000);

      } else {
        throw new Error(data.error || 'Failed to generate video');
      }
    } catch (error) {
      console.error('Video generation error:', error);
      setGenerationStatus('failed');
    } finally {
      setIsGenerating(false);
    }
  };

  const handlePurchaseCredits = async (amount: number) => {
    if (!walletAddress) return;

    try {
      const response = await fetch('/api/credits/purchase', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-wallet-address': walletAddress,
        },
        body: JSON.stringify({
          amount,
          paymentMethod: 'eth_on_base',
        }),
      });

      const data = await response.json();
      if (data.success) {
        setUser(data.data.user);
        alert(`Successfully purchased ${amount} credits!`);
      } else {
        throw new Error(data.error || 'Failed to purchase credits');
      }
    } catch (error) {
      console.error('Credit purchase error:', error);
      alert('Failed to purchase credits. Please try again.');
    }
  };

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
                  <MediaAssetBrowser
                    variant="images"
                    onSelect={handleAssetSelect}
                  />

                  {selectedAssets.length > 0 && (
                    <div className="mt-6 p-4 bg-accent bg-opacity-10 cyber-border">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-accent font-medium">
                            {selectedAssets.length} asset{selectedAssets.length > 1 ? 's' : ''} selected
                          </p>
                          <p className="text-xs text-text-secondary">
                            Template: {selectedTemplate.name} ({selectedTemplate.creditCost} credits)
                          </p>
                        </div>
                        <button
                          onClick={handleGenerateVideo}
                          disabled={isGenerating || !user || (user.creditsBalance < selectedTemplate.creditCost)}
                          className="btn-primary flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {isGenerating ? (
                            <>
                              <Loader2 className="w-4 h-4 animate-spin" />
                              <span>Generating...</span>
                            </>
                          ) : (
                            <>
                              <Play className="w-4 h-4" />
                              <span>Generate Video</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  )}

                  {user && user.creditsBalance < selectedTemplate.creditCost && (
                    <div className="mt-4 p-4 bg-yellow-500 bg-opacity-10 border border-yellow-500 cyber-border">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <AlertCircle className="w-5 h-5 text-yellow-500" />
                          <span className="text-yellow-600 font-medium">Insufficient Credits</span>
                        </div>
                        <button
                          onClick={() => handlePurchaseCredits(selectedTemplate.creditCost - user.creditsBalance)}
                          className="btn-secondary text-sm"
                        >
                          Buy {selectedTemplate.creditCost - user.creditsBalance} Credits
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Generation Status */}
              {generationStatus !== 'idle' && currentVideo && (
                <div className="mt-8">
                  <h2 className="text-2xl font-semibold text-fg mb-6">Generation Status</h2>
                  <div className="cyber-card p-6">
                    <div className="flex items-center space-x-4">
                      {generationStatus === 'generating' && (
                        <>
                          <Loader2 className="w-8 h-8 animate-spin text-accent" />
                          <div>
                            <h3 className="font-semibold text-fg">Generating your video...</h3>
                            <p className="text-sm text-text-secondary">This may take a few moments</p>
                          </div>
                        </>
                      )}

                      {generationStatus === 'completed' && currentVideo.outputUrl && (
                        <>
                          <CheckCircle className="w-8 h-8 text-green-500" />
                          <div className="flex-1">
                            <h3 className="font-semibold text-fg">Video Generated Successfully!</h3>
                            <p className="text-sm text-text-secondary mb-2">{currentVideo.title}</p>
                            <a
                              href={currentVideo.outputUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="btn-primary text-sm inline-flex items-center space-x-2"
                            >
                              <Play className="w-4 h-4" />
                              <span>Watch Video</span>
                            </a>
                          </div>
                        </>
                      )}

                      {generationStatus === 'failed' && (
                        <>
                          <AlertCircle className="w-8 h-8 text-red-500" />
                          <div>
                            <h3 className="font-semibold text-red-500">Generation Failed</h3>
                            <p className="text-sm text-text-secondary">Please try again or contact support</p>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </>
          )}

          {activeTab === 'library' && (
            <div>
              <h2 className="text-2xl font-semibold text-fg mb-6">Your Videos</h2>
              {videos.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-text-secondary mb-4">
                    <Play className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p className="text-lg">No videos yet</p>
                    <p className="text-sm">Create your first video to get started!</p>
                  </div>
                  <button
                    onClick={() => setActiveTab('create')}
                    className="btn-primary"
                  >
                    Create Video
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {videos.map((video) => (
                    <div key={video.videoId} className="cyber-card p-6">
                      <div className="aspect-video bg-bg mb-4 flex items-center justify-center cyber-border">
                        {video.outputUrl ? (
                          <video
                            src={video.outputUrl}
                            className="w-full h-full object-cover"
                            controls
                          />
                        ) : (
                          <div className="text-accent">
                            <Play className="w-8 h-8" />
                          </div>
                        )}
                      </div>

                      <h3 className="font-semibold text-fg mb-2">{video.title}</h3>
                      {video.description && (
                        <p className="text-sm text-text-secondary mb-3">{video.description}</p>
                      )}

                      <div className="flex items-center justify-between text-xs text-text-secondary mb-3">
                        <span>{new Date(video.creationTimestamp).toLocaleDateString()}</span>
                        <span className={`px-2 py-1 rounded ${
                          video.status === 'completed' ? 'bg-green-500 bg-opacity-20 text-green-400' :
                          video.status === 'processing' ? 'bg-yellow-500 bg-opacity-20 text-yellow-400' :
                          'bg-red-500 bg-opacity-20 text-red-400'
                        }`}>
                          {video.status}
                        </span>
                      </div>

                      {video.outputUrl && (
                        <a
                          href={video.outputUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-primary w-full text-center"
                        >
                          Watch Video
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              )}
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
          <CreditBalanceDisplay
            variant="large"
            user={user}
            onPurchaseCredits={handlePurchaseCredits}
          />
          
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
