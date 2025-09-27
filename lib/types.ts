// BlockVideo Data Models

export interface User {
  userId: string; // Unique identifier
  walletAddress: string; // Primary identifier for Base MiniApp
  username?: string;
  profilePicture?: string;
  creationDate: string; // ISO timestamp
  creditsBalance: number;
}

export interface Video {
  videoId: string; // Unique identifier
  userId: string; // Foreign key
  title: string;
  description?: string;
  generationTemplate: string; // e.g., 'news_update', 'product_promo'
  promptText: string;
  mediaAssetIds: string[]; // Array of media asset IDs
  outputUrl?: string; // URL to generated video
  creationTimestamp: string; // ISO timestamp
  blockchainTxHash?: string; // For IP registration
  status: 'pending' | 'processing' | 'completed' | 'failed';
}

export interface CreditTransaction {
  transactionId: string; // Unique identifier
  userId: string; // Foreign key
  amount: number; // Credits bought/spent
  type: 'purchase' | 'generation_cost' | 'ip_registration' | 'refund';
  timestamp: string; // ISO timestamp
  paymentMethod?: string; // e.g., 'eth_on_base', 'credit_card'
  blockchainTxHash?: string; // For on-chain transactions
}

export interface MediaAsset {
  assetId: string;
  type: 'image' | 'video' | 'music';
  url: string;
  title?: string;
  description?: string;
  tags?: string[];
  isRoyaltyFree: boolean;
  uploadedBy?: string; // User ID if user-uploaded
  uploadDate: string;
}

export interface VideoTemplate {
  templateId: string;
  name: string;
  description: string;
  category: string;
  previewImage?: string;
  creditCost: number;
  estimatedDuration: number; // in seconds
  supportedFormats: string[];
}

export interface IPRegistration {
  registrationId: string;
  videoId: string;
  userId: string;
  blockchainTxHash: string;
  ipfsHash?: string;
  registrationDate: string;
  status: 'pending' | 'confirmed' | 'failed';
  metadata: {
    title: string;
    description: string;
    creationDate: string;
    license: string;
  };
}

export interface CrossPromotionSettings {
  userId: string;
  isEnabled: boolean;
  preferences: {
    maxPromotionsPerDay: number;
    targetAudience: string[];
    contentTypes: string[];
  };
  stats: {
    totalPromotions: number;
    successfulPromotions: number;
    lastPromotionDate?: string;
  };
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}

// Video Generation Request
export interface VideoGenerationRequest {
  templateId: string;
  promptText: string;
  mediaAssetIds: string[];
  title: string;
  description?: string;
  registerIP?: boolean;
}

// Credit Purchase Request
export interface CreditPurchaseRequest {
  amount: number; // Credits to purchase
  paymentMethod: string;
}

// IP Registration Request
export interface IPRegistrationRequest {
  videoId: string;
  metadata: {
    title: string;
    description: string;
    license: string;
  };
}
