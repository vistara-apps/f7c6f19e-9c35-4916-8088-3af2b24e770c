// Database service using Upstash Redis for data persistence
import { Redis } from '@upstash/redis';
import { User, Video, CreditTransaction, MediaAsset, VideoTemplate, IPRegistration, CrossPromotionSettings } from '../types';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

// User operations
export class UserService {
  static async getUser(walletAddress: string): Promise<User | null> {
    const userData = await redis.get(`user:${walletAddress}`);
    return userData as User | null;
  }

  static async createUser(walletAddress: string, username?: string): Promise<User> {
    const userId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const user: User = {
      userId,
      walletAddress,
      username,
      creationDate: new Date().toISOString(),
      creditsBalance: 0, // Start with 0 credits
    };

    await redis.set(`user:${walletAddress}`, user);
    await redis.set(`user:id:${userId}`, user);
    return user;
  }

  static async updateUserCredits(userId: string, credits: number): Promise<void> {
    const userData = await redis.get(`user:id:${userId}`);
    if (!userData) throw new Error('User not found');

    const user = userData as User;
    user.creditsBalance = credits;
    await redis.set(`user:id:${userId}`, user);
    await redis.set(`user:${user.walletAddress}`, user);
  }
}

// Video operations
export class VideoService {
  static async createVideo(video: Omit<Video, 'videoId' | 'creationTimestamp'>): Promise<Video> {
    const videoId = `video_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const newVideo: Video = {
      ...video,
      videoId,
      creationTimestamp: new Date().toISOString(),
    };

    await redis.set(`video:${videoId}`, newVideo);
    await redis.lpush(`user:videos:${video.userId}`, videoId);
    return newVideo;
  }

  static async getVideo(videoId: string): Promise<Video | null> {
    const videoData = await redis.get(`video:${videoId}`);
    return videoData as Video | null;
  }

  static async getUserVideos(userId: string, page = 1, limit = 10): Promise<Video[]> {
    const start = (page - 1) * limit;
    const end = start + limit - 1;
    const videoIds = await redis.lrange(`user:videos:${userId}`, start, end);

    const videos: Video[] = [];
    for (const videoId of videoIds) {
      const video = await this.getVideo(videoId);
      if (video) videos.push(video);
    }

    return videos;
  }

  static async updateVideoStatus(videoId: string, status: Video['status'], outputUrl?: string): Promise<void> {
    const videoData = await redis.get(`video:${videoId}`);
    if (!videoData) throw new Error('Video not found');

    const video = videoData as Video;
    video.status = status;
    if (outputUrl) video.outputUrl = outputUrl;

    await redis.set(`video:${videoId}`, video);
  }
}

// Credit transaction operations
export class CreditService {
  static async createTransaction(transaction: Omit<CreditTransaction, 'transactionId' | 'timestamp'>): Promise<CreditTransaction> {
    const transactionId = `txn_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const newTransaction: CreditTransaction = {
      ...transaction,
      transactionId,
      timestamp: new Date().toISOString(),
    };

    await redis.set(`transaction:${transactionId}`, newTransaction);
    await redis.lpush(`user:transactions:${transaction.userId}`, transactionId);
    return newTransaction;
  }

  static async getUserTransactions(userId: string, page = 1, limit = 10): Promise<CreditTransaction[]> {
    const start = (page - 1) * limit;
    const end = start + limit - 1;
    const transactionIds = await redis.lrange(`user:transactions:${userId}`, start, end);

    const transactions: CreditTransaction[] = [];
    for (const txnId of transactionIds) {
      const txn = await redis.get(`transaction:${txnId}`);
      if (txn) transactions.push(txn as CreditTransaction);
    }

    return transactions;
  }
}

// Media asset operations
export class MediaService {
  static async getRoyaltyFreeAssets(type?: 'image' | 'video' | 'music', limit = 50): Promise<MediaAsset[]> {
    // In a real implementation, this would query a database of royalty-free assets
    // For now, return mock data
    const mockAssets: MediaAsset[] = [
      {
        assetId: 'asset_1',
        type: 'image',
        url: 'https://picsum.photos/800/600?random=1',
        title: 'Abstract Background',
        isRoyaltyFree: true,
        uploadDate: new Date().toISOString(),
        tags: ['abstract', 'background', 'modern'],
      },
      {
        assetId: 'asset_2',
        type: 'music',
        url: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
        title: 'Upbeat Background Music',
        isRoyaltyFree: true,
        uploadDate: new Date().toISOString(),
        tags: ['music', 'upbeat', 'background'],
      },
    ];

    return type ? mockAssets.filter(asset => asset.type === type) : mockAssets;
  }

  static async getAsset(assetId: string): Promise<MediaAsset | null> {
    const assetData = await redis.get(`asset:${assetId}`);
    return assetData as MediaAsset | null;
  }
}

// Video template operations
export class TemplateService {
  static async getTemplates(): Promise<VideoTemplate[]> {
    // Mock templates - in production, these would be stored in database
    return [
      {
        templateId: 'news_update',
        name: 'News Update',
        description: 'Perfect for sharing news, updates, or announcements',
        category: 'Business',
        creditCost: 2,
        estimatedDuration: 30,
        supportedFormats: ['16:9', '9:16'],
      },
      {
        templateId: 'product_promo',
        name: 'Product Promotion',
        description: 'Showcase your products with engaging visuals',
        category: 'Marketing',
        creditCost: 3,
        estimatedDuration: 45,
        supportedFormats: ['16:9', '1:1'],
      },
      {
        templateId: 'social_story',
        name: 'Social Story',
        description: 'Create engaging stories for social media',
        category: 'Social',
        creditCost: 1,
        estimatedDuration: 15,
        supportedFormats: ['9:16'],
      },
    ];
  }

  static async getTemplate(templateId: string): Promise<VideoTemplate | null> {
    const templates = await this.getTemplates();
    return templates.find(t => t.templateId === templateId) || null;
  }
}

// IP Registration operations
export class IPService {
  static async registerIP(registration: Omit<IPRegistration, 'registrationId' | 'registrationDate'>): Promise<IPRegistration> {
    const registrationId = `ip_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const newRegistration: IPRegistration = {
      ...registration,
      registrationId,
      registrationDate: new Date().toISOString(),
    };

    await redis.set(`ip:${registrationId}`, newRegistration);
    await redis.set(`video:ip:${registration.videoId}`, registrationId);
    return newRegistration;
  }

  static async getIPRegistration(videoId: string): Promise<IPRegistration | null> {
    const registrationId = await redis.get(`video:ip:${videoId}`);
    if (!registrationId) return null;

    const registrationData = await redis.get(`ip:${registrationId}`);
    return registrationData as IPRegistration | null;
  }
}

// Cross-promotion operations
export class PromotionService {
  static async getSettings(userId: string): Promise<CrossPromotionSettings> {
    const settings = await redis.get(`promotion:settings:${userId}`);
    if (settings) return settings as CrossPromotionSettings;

    // Default settings
    const defaultSettings: CrossPromotionSettings = {
      userId,
      isEnabled: false,
      preferences: {
        maxPromotionsPerDay: 5,
        targetAudience: [],
        contentTypes: ['all'],
      },
      stats: {
        totalPromotions: 0,
        successfulPromotions: 0,
      },
    };

    await redis.set(`promotion:settings:${userId}`, defaultSettings);
    return defaultSettings;
  }

  static async updateSettings(userId: string, settings: Partial<CrossPromotionSettings>): Promise<void> {
    const currentSettings = await this.getSettings(userId);
    const updatedSettings = { ...currentSettings, ...settings };
    await redis.set(`promotion:settings:${userId}`, updatedSettings);
  }
}
