import { NextResponse } from 'next/server';
import { getCart, addToCart, updateCartItem, removeFromCart } from '@/lib/api-data';

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

        const cart = await getCart(userId);
        return NextResponse.json(cart);
    } catch (error) {
        return createErrorResponse('Unable to fetch cart');
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { userId, productId, quantity } = body;

        if (!userId || !productId) {
            return createErrorResponse('userId and productId are required', 400);
        }

        const cart = await addToCart(userId, productId, quantity || 1);
        return NextResponse.json(cart, { status: 201 });
    } catch (error: any) {
        return createErrorResponse(error?.message || 'Failed to add to cart', 500);
    }
}

export async function PUT(request: Request) {
    try {
        const body = await request.json();
        const { userId, productId, quantity } = body;

        if (!userId || !productId || !quantity) {
            return createErrorResponse('userId, productId, and quantity are required', 400);
        }

        const cart = await updateCartItem(userId, productId, quantity);
        return NextResponse.json(cart);
    } catch (error: any) {
        return createErrorResponse(error?.message || 'Failed to update cart item', 500);
    }
}

export async function DELETE(request: Request) {
    try {
        const body = await request.json();
        const { userId, productId } = body;

        if (!userId || !productId) {
            return createErrorResponse('userId and productId are required', 400);
        }

        const cart = await removeFromCart(userId, productId);
        return NextResponse.json(cart);
    } catch (error: any) {
        return createErrorResponse(error?.message || 'Failed to remove from cart', 500);
    }
}
