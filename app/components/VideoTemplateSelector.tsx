'use client';
import { useState } from 'react';
import { Play, Sparkles, TrendingUp, Users, Briefcase, Heart } from 'lucide-react';

interface Template {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  credits: number;
  category: string;
}

interface VideoTemplateSelectorProps {
  variant?: 'grid' | 'list';
  onSelect?: (template: Template) => void;
}

const templates: Template[] = [
  {
    id: 'product_demo',
    name: 'Product Demo',
    description: 'Showcase your product with dynamic animations',
    icon: <Briefcase className="w-6 h-6" />,
    credits: 2,
    category: 'Business'
  },
  {
    id: 'social_promo',
    name: 'Social Promo',
    description: 'Eye-catching content for social media',
    icon: <Heart className="w-6 h-6" />,
    credits: 1,
    category: 'Social'
  },
  {
    id: 'news_update',
    name: 'News Update',
    description: 'Professional news-style video format',
    icon: <TrendingUp className="w-6 h-6" />,
    credits: 1,
    category: 'News'
  },
  {
    id: 'explainer',
    name: 'Explainer Video',
    description: 'Break down complex topics simply',
    icon: <Sparkles className="w-6 h-6" />,
    credits: 3,
    category: 'Education'
  },
  {
    id: 'testimonial',
    name: 'Testimonial',
    description: 'Customer success stories and reviews',
    icon: <Users className="w-6 h-6" />,
    credits: 2,
    category: 'Marketing'
  },
  {
    id: 'gaming_highlight',
    name: 'Gaming Highlight',
    description: 'Epic gaming moments with effects',
    icon: <Play className="w-6 h-6" />,
    credits: 2,
    category: 'Gaming'
  }
];

export function VideoTemplateSelector({ variant = 'grid', onSelect }: VideoTemplateSelectorProps) {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

  const handleSelect = (template: Template) => {
    setSelectedTemplate(template.id);
    onSelect?.(template);
  };

  if (variant === 'list') {
    return (
      <div className="space-y-3">
        {templates.map((template) => (
          <div
            key={template.id}
            onClick={() => handleSelect(template)}
            className={`video-template-card flex items-center space-x-4 p-4 cursor-pointer ${
              selectedTemplate === template.id ? 'shadow-cyber' : ''
            }`}
          >
            <div className="text-accent">{template.icon}</div>
            <div className="flex-1">
              <h4 className="font-semibold text-fg">{template.name}</h4>
              <p className="text-sm text-text-secondary">{template.description}</p>
            </div>
            <div className="text-right">
              <div className="text-sm font-medium text-accent">{template.credits} credits</div>
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
          key={template.id}
          onClick={() => handleSelect(template)}
          className={`video-template-card p-6 cursor-pointer ${
            selectedTemplate === template.id ? 'shadow-cyber' : ''
          }`}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="text-accent">{template.icon}</div>
            <div className="text-sm font-medium text-accent">
              {template.credits} credits
            </div>
          </div>
          
          <h4 className="font-semibold text-fg mb-2">{template.name}</h4>
          <p className="text-sm text-text-secondary mb-4">{template.description}</p>
          
          <div className="flex items-center justify-between">
            <span className="text-xs text-text-secondary uppercase tracking-wider">
              {template.category}
            </span>
            {selectedTemplate === template.id && (
              <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
