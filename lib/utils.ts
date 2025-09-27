export function formatAddress(address: string): string {
  if (!address) return '';
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export function formatTimestamp(timestamp: string): string {
  return new Date(timestamp).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

export function calculateVideoCredits(template: string, duration: number): number {
  const baseCredits = {
    'product_demo': 2,
    'social_promo': 1,
    'news_update': 1,
    'explainer': 3,
    'testimonial': 2,
    'gaming_highlight': 2
  };

  const base = baseCredits[template as keyof typeof baseCredits] || 1;
  const durationMultiplier = Math.ceil(duration / 30); // 30 seconds per credit
  
  return base * durationMultiplier;
}

export function generateVideoId(): string {
  return `video_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

export function generateTransactionId(): string {
  return `tx_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

export function validateWalletAddress(address: string): boolean {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
}

export function formatCredits(credits: number): string {
  return credits.toLocaleString();
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(price);
}
