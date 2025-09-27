export interface User {
  userId: string;
  walletAddress: string;
  username: string;
  profilePicture?: string;
  creationDate: string;
  creditsBalance: number;
}

export interface Video {
  videoId: string;
  userId: string;
  title: string;
  description: string;
  generationTemplate: string;
  promptText: string;
  mediaAssetIds: string[];
  outputUrl?: string;
  creationTimestamp: string;
  blockchainTxHash?: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
}

export interface CreditTransaction {
  transactionId: string;
  userId: string;
  amount: number;
  type: 'purchase' | 'generation_cost';
  timestamp: string;
  paymentMethod: string;
}

export interface MediaAsset {
  id: string;
  type: 'image' | 'video' | 'music';
  name: string;
  url: string;
  thumbnail?: string;
  duration?: string;
  tags: string[];
}

export interface VideoTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  credits: number;
  previewUrl?: string;
}
