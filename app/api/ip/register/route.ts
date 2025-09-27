import { NextRequest, NextResponse } from 'next/server';
import { IPService, VideoService, UserService, CreditService } from '@/lib/services/database';
import { ApiResponse, IPRegistrationRequest, IPRegistration } from '@/lib/types';

export async function POST(request: NextRequest) {
  try {
    const body: IPRegistrationRequest = await request.json();
    const { videoId, metadata } = body;

    if (!videoId || !metadata) {
      return NextResponse.json({
        success: false,
        error: 'Video ID and metadata are required'
      } as ApiResponse<null>, { status: 400 });
    }

    // Get user from wallet address
    const walletAddress = request.headers.get('x-wallet-address');
    if (!walletAddress) {
      return NextResponse.json({
        success: false,
        error: 'Wallet address required'
      } as ApiResponse<null>, { status: 401 });
    }

    const user = await UserService.getUser(walletAddress);
    if (!user) {
      return NextResponse.json({
        success: false,
        error: 'User not found'
      } as ApiResponse<null>, { status: 404 });
    }

    // Verify video ownership
    const video = await VideoService.getVideo(videoId);
    if (!video || video.userId !== user.userId) {
      return NextResponse.json({
        success: false,
        error: 'Video not found or access denied'
      } as ApiResponse<null>, { status: 404 });
    }

    // Check if video is completed
    if (video.status !== 'completed') {
      return NextResponse.json({
        success: false,
        error: 'Video must be completed before IP registration'
      } as ApiResponse<null>, { status: 400 });
    }

    // Check if IP is already registered
    const existingRegistration = await IPService.getIPRegistration(videoId);
    if (existingRegistration) {
      return NextResponse.json({
        success: false,
        error: 'IP already registered for this video'
      } as ApiResponse<null>, { status: 409 });
    }

    // IP registration cost (mock: 1 credit)
    const ipCost = 1;
    if (user.creditsBalance < ipCost) {
      return NextResponse.json({
        success: false,
        error: 'Insufficient credits for IP registration'
      } as ApiResponse<null>, { status: 402 });
    }

    // Deduct credits
    const newBalance = user.creditsBalance - ipCost;
    await UserService.updateUserCredits(user.userId, newBalance);

    // Create credit transaction
    await CreditService.createTransaction({
      userId: user.userId,
      amount: -ipCost,
      type: 'ip_registration',
      paymentMethod: 'credits',
    });

    // Mock blockchain transaction hash
    const mockTxHash = `0x${Math.random().toString(16).substr(2, 64)}`;

    // Register IP
    const registration = await IPService.registerIP({
      videoId,
      userId: user.userId,
      blockchainTxHash: mockTxHash,
      status: 'pending',
      metadata: {
        ...metadata,
        creationDate: video.creationTimestamp,
      },
    });

    // Update video with blockchain transaction hash
    await VideoService.updateVideoStatus(videoId, 'completed', video.outputUrl);

    // In a real implementation, this would trigger the actual blockchain transaction
    // For now, we'll simulate it completing
    setTimeout(async () => {
      try {
        // Update registration status to confirmed
        const confirmedRegistration = { ...registration, status: 'confirmed' as const };
        // In production, you'd update this in the database
        console.log(`IP registration confirmed for video ${videoId}: ${mockTxHash}`);
      } catch (error) {
        console.error('IP registration confirmation failed:', error);
        // Update status to failed
      }
    }, 3000); // Simulate blockchain confirmation delay

    return NextResponse.json({
      success: true,
      data: registration,
      message: 'IP registration initiated successfully'
    } as ApiResponse<IPRegistration>);

  } catch (error) {
    console.error('IP registration error:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to register IP'
    } as ApiResponse<null>, { status: 500 });
  }
}
