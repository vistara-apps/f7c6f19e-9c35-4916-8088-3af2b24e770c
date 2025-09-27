export const VIDEO_TEMPLATES = [
  {
    id: 'product_demo',
    name: 'Product Demo',
    description: 'Showcase your product with dynamic animations',
    category: 'Business',
    credits: 2
  },
  {
    id: 'social_promo',
    name: 'Social Promo',
    description: 'Eye-catching content for social media',
    category: 'Social',
    credits: 1
  },
  {
    id: 'news_update',
    name: 'News Update',
    description: 'Professional news-style video format',
    category: 'News',
    credits: 1
  },
  {
    id: 'explainer',
    name: 'Explainer Video',
    description: 'Break down complex topics simply',
    category: 'Education',
    credits: 3
  }
];

export const CREDIT_PRICES = {
  basic: { credits: 10, price: 5.00 },
  standard: { credits: 25, price: 10.00 },
  premium: { credits: 50, price: 18.00 },
  bulk: { credits: 100, price: 30.00 }
};

export const GENERATION_STEPS = [
  { id: 'template', name: 'Template Processing' },
  { id: 'assets', name: 'Media Asset Loading' },
  { id: 'generation', name: 'Video Generation' },
  { id: 'rendering', name: 'Final Rendering' },
  { id: 'upload', name: 'IPFS Upload' },
  { id: 'blockchain', name: 'Blockchain Registration' }
];
