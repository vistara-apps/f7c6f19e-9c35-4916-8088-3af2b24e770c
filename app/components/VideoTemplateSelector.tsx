'use client';
import { useState, useEffect } from 'react';
import { Play, Sparkles, TrendingUp, Users, Briefcase, Heart, Loader2 } from 'lucide-react';
import { VideoTemplate } from '@/lib/types';

interface TemplateWithIcon extends VideoTemplate {
  icon: React.ReactNode;
}

interface VideoTemplateSelectorProps {
  variant?: 'grid' | 'list';
  onSelect?: (template: VideoTemplate) => void;
}

const getIconForCategory = (category: string) => {
  switch (category.toLowerCase()) {
    case 'business':
      return <Briefcase className="w-6 h-6" />;
    case 'social':
      return <Heart className="w-6 h-6" />;
    case 'news':
      return <TrendingUp className="w-6 h-6" />;
    case 'education':
      return <Sparkles className="w-6 h-6" />;
    case 'marketing':
      return <Users className="w-6 h-6" />;
    case 'gaming':
      return <Play className="w-6 h-6" />;
    default:
      return <Play className="w-6 h-6" />;
  }
};

export function VideoTemplateSelector({ variant = 'grid', onSelect }: VideoTemplateSelectorProps) {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [templates, setTemplates] = useState<TemplateWithIcon[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const response = await fetch('/api/templates');
        const data = await response.json();

        if (data.success) {
          const templatesWithIcons = data.data.map((template: VideoTemplate) => ({
            ...template,
            icon: getIconForCategory(template.category),
          }));
          setTemplates(templatesWithIcons);
        } else {
          setError(data.error || 'Failed to load templates');
        }
      } catch (err) {
        setError('Failed to load templates');
        console.error('Error fetching templates:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTemplates();
  }, []);

  const handleSelect = (template: VideoTemplate) => {
    setSelectedTemplate(template.templateId);
    onSelect?.(template);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-accent" />
        <span className="ml-2 text-text-secondary">Loading templates...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-400 mb-2">Failed to load templates</div>
        <div className="text-text-secondary text-sm">{error}</div>
      </div>
    );
  }

  if (variant === 'list') {
    return (
      <div className="space-y-3">
        {templates.map((template) => (
          <div
            key={template.templateId}
            onClick={() => handleSelect(template)}
            className={`video-template-card flex items-center space-x-4 p-4 cursor-pointer ${
              selectedTemplate === template.templateId ? 'shadow-cyber' : ''
            }`}
          >
            <div className="text-accent">{template.icon}</div>
            <div className="flex-1">
              <h4 className="font-semibold text-fg">{template.name}</h4>
              <p className="text-sm text-text-secondary">{template.description}</p>
            </div>
            <div className="text-right">
              <div className="text-sm font-medium text-accent">{template.creditCost} credits</div>
              <div className="text-xs text-text-secondary">{template.category}</div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {templates.map((template) => (
        <div
          key={template.templateId}
          onClick={() => handleSelect(template)}
          className={`video-template-card p-6 cursor-pointer ${
            selectedTemplate === template.templateId ? 'shadow-cyber' : ''
          }`}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="text-accent">{template.icon}</div>
            <div className="text-sm font-medium text-accent">
              {template.creditCost} credits
            </div>
          </div>

          <h4 className="font-semibold text-fg mb-2">{template.name}</h4>
          <p className="text-sm text-text-secondary mb-4">{template.description}</p>

          <div className="flex items-center justify-between">
            <span className="text-xs text-text-secondary uppercase tracking-wider">
              {template.category}
            </span>
            {selectedTemplate === template.templateId && (
              <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
