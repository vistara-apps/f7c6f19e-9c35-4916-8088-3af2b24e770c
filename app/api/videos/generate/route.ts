import { NextRequest, NextResponse } from 'next/server';
import { VideoService, UserService, CreditService, TemplateService } from '@/lib/services/database';
import { ApiResponse, Video, VideoGenerationRequest } from '@/lib/types';

export async function POST(request: NextRequest) {
  try {
    const body: VideoGenerationRequest = await request.json();
    const { templateId, promptText, mediaAssetIds, title, description, registerIP } = body;

    // Validate required fields
    if (!templateId || !promptText || !mediaAssetIds || !title) {
      return NextResponse.json({
        success: false,
        error: 'Missing required fields: templateId, promptText, mediaAssetIds, title'
      } as ApiResponse<null>, { status: 400 });
    }

    // Get user from wallet address (assuming it's passed in headers or body)
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

    // Get template and check credit cost
    const template = await TemplateService.getTemplate(templateId);
    if (!template) {
      return NextResponse.json({
        success: false,
        error: 'Template not found'
      } as ApiResponse<null>, { status: 404 });
    }

    // Check if user has enough credits
    if (user.creditsBalance < template.creditCost) {
      return NextResponse.json({
        success: false,
        error: 'Insufficient credits'
      } as ApiResponse<null>, { status: 402 });
    }

    // Deduct credits
    const newBalance = user.creditsBalance - template.creditCost;
    await UserService.updateUserCredits(user.userId, newBalance);

    // Create credit transaction
    await CreditService.createTransaction({
      userId: user.userId,
      amount: -template.creditCost,
      type: 'generation_cost',
      paymentMethod: 'credits',
    });

    // Create video record
    const video = await VideoService.createVideo({
      userId: user.userId,
      title,
      description,
      generationTemplate: templateId,
      promptText,
      mediaAssetIds,
      status: 'pending',
    });

    // Start video generation process (mock implementation)
    // In a real implementation, this would queue the job for processing
    setTimeout(async () => {
      try {
        // Simulate video generation delay
        await new Promise(resolve => setTimeout(resolve, 5000));

        // Mock video URL - in production, this would be the actual generated video
        const mockVideoUrl = `https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4`;

        await VideoService.updateVideoStatus(video.videoId, 'completed', mockVideoUrl);

        // If IP registration was requested, handle it
        if (registerIP) {
          // This would trigger IP registration on blockchain
          console.log(`IP registration requested for video ${video.videoId}`);
        }
      } catch (error) {
        console.error('Video generation failed:', error);
        await VideoService.updateVideoStatus(video.videoId, 'failed');
      }
    }, 1000); // Start processing after 1 second

    return NextResponse.json({
      success: true,
      data: video,
      message: 'Video generation started successfully'
    } as ApiResponse<Video>);

  } catch (error) {
    console.error('Video generation error:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to start video generation'
    } as ApiResponse<null>, { status: 500 });
  }
}
