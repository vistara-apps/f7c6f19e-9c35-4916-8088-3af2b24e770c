import { NextRequest, NextResponse } from 'next/server';
import { VideoService, UserService } from '@/lib/services/database';
import { ApiResponse, Video } from '@/lib/types';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const walletAddress = searchParams.get('walletAddress');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');

    if (!walletAddress) {
      return NextResponse.json({
        success: false,
        error: 'Wallet address is required'
      } as ApiResponse<null>, { status: 400 });
    }

    const user = await UserService.getUser(walletAddress);
    if (!user) {
      return NextResponse.json({
        success: false,
        error: 'User not found'
      } as ApiResponse<null>, { status: 404 });
    }

    const videos = await VideoService.getUserVideos(user.userId, page, limit);

    return NextResponse.json({
      success: true,
      data: {
        items: videos,
        total: videos.length, // In production, you'd have a proper count
        page,
        pageSize: limit,
        hasMore: videos.length === limit,
      }
    } as ApiResponse<any>);

  } catch (error) {
    console.error('Get videos error:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to get videos'
    } as ApiResponse<null>, { status: 500 });
  }
}
