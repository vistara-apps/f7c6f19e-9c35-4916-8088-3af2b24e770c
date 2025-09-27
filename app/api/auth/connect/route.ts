import { NextRequest, NextResponse } from 'next/server';
import { UserService } from '@/lib/services/database';
import { ApiResponse, User } from '@/lib/types';

export async function POST(request: NextRequest) {
  try {
    const { walletAddress, username } = await request.json();

    if (!walletAddress) {
      return NextResponse.json({
        success: false,
        error: 'Wallet address is required'
      } as ApiResponse<null>, { status: 400 });
    }

    // Check if user already exists
    let user = await UserService.getUser(walletAddress);

    if (!user) {
      // Create new user
      user = await UserService.createUser(walletAddress, username);
    }

    return NextResponse.json({
      success: true,
      data: user,
      message: 'Wallet connected successfully'
    } as ApiResponse<User>);

  } catch (error) {
    console.error('Wallet connection error:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to connect wallet'
    } as ApiResponse<null>, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const walletAddress = searchParams.get('walletAddress');

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

    return NextResponse.json({
      success: true,
      data: user
    } as ApiResponse<User>);

  } catch (error) {
    console.error('Get user error:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to get user'
    } as ApiResponse<null>, { status: 500 });
  }
}
