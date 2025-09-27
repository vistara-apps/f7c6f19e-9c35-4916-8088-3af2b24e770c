'use client';
import { useState } from 'react';
import { Image, Video, Music, Search, Filter } from 'lucide-react';

interface MediaAsset {
  id: string;
  type: 'image' | 'video' | 'music';
  name: string;
  url: string;
  thumbnail?: string;
  duration?: string;
  tags: string[];
}

interface MediaAssetBrowserProps {
  variant?: 'images' | 'videos' | 'music';
  onSelect?: (asset: MediaAsset) => void;
}

const mockAssets: MediaAsset[] = [
  {
    id: '1',
    type: 'image',
    name: 'Cyber City Skyline',
    url: '/assets/cyber-city.jpg',
    thumbnail: '/assets/cyber-city-thumb.jpg',
    tags: ['cyberpunk', 'city', 'neon', 'futuristic']
  },
  {
    id: '2',
    type: 'video',
    name: 'Digital Particles',
    url: '/assets/particles.mp4',
    thumbnail: '/assets/particles-thumb.jpg',
    duration: '0:15',
    tags: ['particles', 'digital', 'abstract', 'motion']
  },
  {
    id: '3',
    type: 'music',
    name: 'Synthwave Beat',
    url: '/assets/synthwave.mp3',
    duration: '2:30',
    tags: ['synthwave', 'electronic', 'retro', 'upbeat']
  },
  {
    id: '4',
    type: 'image',
    name: 'Neon Grid',
    url: '/assets/neon-grid.jpg',
    thumbnail: '/assets/neon-grid-thumb.jpg',
    tags: ['grid', 'neon', 'geometric', 'pattern']
  },
  {
    id: '5',
    type: 'video',
    name: 'Code Rain',
    url: '/assets/code-rain.mp4',
    thumbnail: '/assets/code-rain-thumb.jpg',
    duration: '0:10',
    tags: ['code', 'matrix', 'digital', 'rain']
  },
  {
    id: '6',
    type: 'music',
    name: 'Ambient Tech',
    url: '/assets/ambient-tech.mp3',
    duration: '3:45',
    tags: ['ambient', 'tech', 'atmospheric', 'calm']
  }
];

export function MediaAssetBrowser({ variant = 'images', onSelect }: MediaAssetBrowserProps) {
  const [selectedAssets, setSelectedAssets] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'image' | 'video' | 'music'>('all');

  const filteredAssets = mockAssets.filter(asset => {
    const matchesSearch = asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         asset.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesFilter = activeFilter === 'all' || asset.type === activeFilter;
    const matchesVariant = variant === 'images' ? asset.type === 'image' :
                          variant === 'videos' ? asset.type === 'video' :
                          variant === 'music' ? asset.type === 'music' : true;
    
    return matchesSearch && matchesFilter && matchesVariant;
  });

  const handleSelect = (asset: MediaAsset) => {
    const isSelected = selectedAssets.includes(asset.id);
    if (isSelected) {
      setSelectedAssets(prev => prev.filter(id => id !== asset.id));
    } else {
      setSelectedAssets(prev => [...prev, asset.id]);
    }
    onSelect?.(asset);
  };

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
            key={asset.id}
            onClick={() => handleSelect(asset)}
            className={`relative cursor-pointer cyber-border p-3 hover:shadow-neon transition-all duration-200 ${
              selectedAssets.includes(asset.id) ? 'shadow-cyber bg-accent bg-opacity-20' : 'bg-surface'
            }`}
          >
            {/* Asset Preview */}
            <div className="aspect-square bg-bg mb-3 flex items-center justify-center cyber-border">
              {asset.thumbnail ? (
                <img 
                  src={asset.thumbnail} 
                  alt={asset.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-accent">
                  {getAssetIcon(asset.type)}
                </div>
              )}
              
              {asset.duration && (
                <div className="absolute top-2 right-2 bg-bg bg-opacity-80 px-2 py-1 text-xs font-mono">
                  {asset.duration}
                </div>
              )}
            </div>

            {/* Asset Info */}
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <div className="text-accent">
                  {getAssetIcon(asset.type)}
                </div>
                <h4 className="text-sm font-medium text-fg truncate">{asset.name}</h4>
              </div>
              
              <div className="flex flex-wrap gap-1">
                {asset.tags.slice(0, 2).map((tag) => (
                  <span 
                    key={tag}
                    className="text-xs bg-surface px-2 py-1 cyber-border text-text-secondary"
                  >
                    {tag}
                  </span>
                ))}
                {asset.tags.length > 2 && (
                  <span className="text-xs text-text-secondary">
                    +{asset.tags.length - 2}
                  </span>
                )}
              </div>
            </div>

            {/* Selection Indicator */}
            {selectedAssets.includes(asset.id) && (
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
