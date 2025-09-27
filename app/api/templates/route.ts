import { NextRequest, NextResponse } from 'next/server';
import { TemplateService } from '@/lib/services/database';
import { ApiResponse, VideoTemplate } from '@/lib/types';

export async function GET(request: NextRequest) {
  try {
    const templates = await TemplateService.getTemplates();

    return NextResponse.json({
      success: true,
      data: templates
    } as ApiResponse<VideoTemplate[]>);

  } catch (error) {
    console.error('Get templates error:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to get templates'
    } as ApiResponse<null>, { status: 500 });
  }
}
