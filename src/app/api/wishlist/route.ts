import { NextResponse } from 'next/server';
import { getWishlist, addToWishlist, removeFromWishlist } from '@/lib/api-data';

function createErrorResponse(message: string, status = 500) {
    return NextResponse.json({ error: message }, { status });
}

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const userId = searchParams.get('userId');

        if (!userId) {
            return createErrorResponse('userId is required', 400);
        }

        const wishlist = await getWishlist(userId);
        return NextResponse.json(wishlist);
    } catch (error) {
        return createErrorResponse('Unable to fetch wishlist');
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { userId, productId } = body;

        if (!userId || !productId) {
            return createErrorResponse('userId and productId are required', 400);
        }

        const wishlist = await addToWishlist(userId, productId);
        return NextResponse.json(wishlist, { status: 201 });
    } catch (error: any) {
        return createErrorResponse(error?.message || 'Failed to add to wishlist', 500);
    }
}

export async function DELETE(request: Request) {
    try {
        const body = await request.json();
        const { userId, productId } = body;

        if (!userId || !productId) {
            return createErrorResponse('userId and productId are required', 400);
        }

        const wishlist = await removeFromWishlist(userId, productId);
        return NextResponse.json(wishlist);
    } catch (error: any) {
        return createErrorResponse(error?.message || 'Failed to remove from wishlist', 500);
    }
}
