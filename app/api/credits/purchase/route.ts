import { NextRequest, NextResponse } from 'next/server';
import { UserService, CreditService } from '@/lib/services/database';
import { ApiResponse, CreditPurchaseRequest, User } from '@/lib/types';

export async function POST(request: NextRequest) {
  try {
    const body: CreditPurchaseRequest = await request.json();
    const { amount, paymentMethod } = body;

    if (!amount || amount <= 0) {
      return NextResponse.json({
        success: false,
        error: 'Valid credit amount is required'
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

    // Calculate cost (mock pricing: $0.50 per credit)
    const costPerCredit = 0.50;
    const totalCost = amount * costPerCredit;

    // In a real implementation, this would integrate with payment processors
    // For now, we'll simulate a successful payment

    // Update user credits
    const newBalance = user.creditsBalance + amount;
    await UserService.updateUserCredits(user.userId, newBalance);

    // Create credit transaction
    await CreditService.createTransaction({
      userId: user.userId,
      amount: amount,
      type: 'purchase',
      paymentMethod: paymentMethod || 'eth_on_base',
    });

    // Get updated user data
    const updatedUser = await UserService.getUser(walletAddress);

    return NextResponse.json({
      success: true,
      data: {
        user: updatedUser,
        creditsPurchased: amount,
        totalCost,
        newBalance,
      },
      message: `Successfully purchased ${amount} credits`
    } as ApiResponse<any>);

  } catch (error) {
    console.error('Credit purchase error:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to purchase credits'
    } as ApiResponse<null>, { status: 500 });
  }
}
