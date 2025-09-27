'use client';
import { useState, useEffect } from 'react';
import { Image, Video, Music, Search, Filter, Loader2 } from 'lucide-react';
import { MediaAsset } from '@/lib/types';

interface MediaAssetBrowserProps {
  variant?: 'images' | 'videos' | 'music';
  onSelect?: (asset: MediaAsset) => void;
}

export function MediaAssetBrowser({ variant = 'images', onSelect }: MediaAssetBrowserProps) {
  const [selectedAssets, setSelectedAssets] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'image' | 'video' | 'music'>('all');
  const [assets, setAssets] = useState<MediaAsset[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAssets = async () => {
      try {
        const typeParam = variant === 'images' ? 'image' :
                         variant === 'videos' ? 'video' :
                         variant === 'music' ? 'music' : undefined;

        const url = typeParam ? `/api/media?type=${typeParam}` : '/api/media';
        const response = await fetch(url);
        const data = await response.json();

        if (data.success) {
          setAssets(data.data);
        } else {
          setError(data.error || 'Failed to load media assets');
        }
      } catch (err) {
        setError('Failed to load media assets');
        console.error('Error fetching media assets:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAssets();
  }, [variant]);

  const filteredAssets = assets.filter(asset => {
    const matchesSearch = asset.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         asset.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesFilter = activeFilter === 'all' || asset.type === activeFilter;

    return matchesSearch && matchesFilter;
  });

  const handleSelect = (asset: MediaAsset) => {
    const isSelected = selectedAssets.includes(asset.assetId);
    if (isSelected) {
      setSelectedAssets(prev => prev.filter(id => id !== asset.assetId));
    } else {
      setSelectedAssets(prev => [...prev, asset.assetId]);
    }
    onSelect?.(asset);
  };

  if (loading) {
    return (
      <div className="cyber-card p-6">
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-accent" />
          <span className="ml-2 text-text-secondary">Loading media assets...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="cyber-card p-6">
        <div className="text-center py-12">
          <div className="text-red-400 mb-2">Failed to load media assets</div>
          <div className="text-text-secondary text-sm">{error}</div>
        </div>
      </div>
    );
  }

  const getAssetIcon = (type: MediaAsset['type']) => {
    switch (type) {
      case 'image':
        return <Image className="w-4 h-4" />;
      case 'video':
        return <Video className="w-4 h-4" />;
      case 'music':
        return <Music className="w-4 h-4" />;
    }
  };

  return (
    <div className="cyber-card p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold neon-text">Media Library</h3>
        <div className="text-sm text-text-secondary">
          {selectedAssets.length} selected
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-text-secondary" />
          <input
            type="text"
            placeholder="Search assets..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input-cyber w-full pl-10"
          />
        </div>
        
        <div className="flex items-center space-x-2">
          <Filter className="w-4 h-4 text-text-secondary" />
          <select
            value={activeFilter}
            onChange={(e) => setActiveFilter(e.target.value as any)}
            className="input-cyber"
          >
            <option value="all">All Types</option>
            <option value="image">Images</option>
            <option value="video">Videos</option>
            <option value="music">Music</option>
          </select>
        </div>
      </div>

      {/* Asset Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredAssets.map((asset) => (
          <div
            key={asset.assetId}
            onClick={() => handleSelect(asset)}
            className={`relative cursor-pointer cyber-border p-3 hover:shadow-neon transition-all duration-200 ${
              selectedAssets.includes(asset.assetId) ? 'shadow-cyber bg-accent bg-opacity-20' : 'bg-surface'
            }`}
          >
            {/* Asset Preview */}
            <div className="aspect-square bg-bg mb-3 flex items-center justify-center cyber-border">
              <img
                src={asset.url}
                alt={asset.title || 'Media asset'}
                className="w-full h-full object-cover"
              />

              {/* For music/video assets, show duration if available */}
              {asset.type === 'music' && (
                <div className="absolute bottom-2 right-2 bg-bg bg-opacity-80 px-2 py-1 text-xs font-mono">
                  <Music className="w-3 h-3 inline mr-1" />
                  Music
                </div>
              )}
            </div>

            {/* Asset Info */}
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <div className="text-accent">
                  {getAssetIcon(asset.type)}
                </div>
                <h4 className="text-sm font-medium text-fg truncate">{asset.title || 'Untitled'}</h4>
              </div>

              <div className="flex flex-wrap gap-1">
                {asset.tags?.slice(0, 2).map((tag) => (
                  <span
                    key={tag}
                    className="text-xs bg-surface px-2 py-1 cyber-border text-text-secondary"
                  >
                    {tag}
                  </span>
                ))}
                {asset.tags && asset.tags.length > 2 && (
                  <span className="text-xs text-text-secondary">
                    +{asset.tags.length - 2}
                  </span>
                )}
              </div>
            </div>

            {/* Selection Indicator */}
            {selectedAssets.includes(asset.assetId) && (
              <div className="absolute top-2 left-2 w-4 h-4 bg-accent rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-bg rounded-full"></div>
              </div>
            )}
          </div>
        ))}
      </div>

      {filteredAssets.length === 0 && (
        <div className="text-center py-12">
          <div className="text-text-secondary mb-4">
            <Search className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>No assets found matching your criteria</p>
          </div>
        </div>
      )}

      {selectedAssets.length > 0 && (
        <div className="mt-6 p-4 bg-accent bg-opacity-10 cyber-border">
          <p className="text-sm text-accent">
            {selectedAssets.length} asset{selectedAssets.length > 1 ? 's' : ''} selected for your video
          </p>
        </div>
      )}
    </div>
  );
}
