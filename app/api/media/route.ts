import { NextRequest, NextResponse } from 'next/server';
import { MediaService } from '@/lib/services/database';
import { ApiResponse, MediaAsset } from '@/lib/types';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type') as 'image' | 'video' | 'music' | null;
    const limit = parseInt(searchParams.get('limit') || '50');

    const assets = await MediaService.getRoyaltyFreeAssets(type || undefined, limit);

    return NextResponse.json({
      success: true,
      data: assets
    } as ApiResponse<MediaAsset[]>);

  } catch (error) {
    console.error('Get media assets error:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to get media assets'
    } as ApiResponse<null>, { status: 500 });
  }
}
