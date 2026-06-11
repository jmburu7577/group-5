import { NextResponse } from 'next/server';
import { getOrders, createOrder } from '@/lib/api-data';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

function createErrorResponse(message: string, status = 500) {
    return NextResponse.json({ error: message }, { status });
}

export async function GET() {
    try {
        const orders = await getOrders();
        return NextResponse.json(orders);
    } catch (error) {
        return createErrorResponse('Unable to fetch orders');
    }
}

export async function POST(request: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return createErrorResponse('Unauthorized', 401);
        }

        const body = await request.json();

        if (!body?.userId || !body?.items || !body?.total || !body?.shippingAddress) {
            return createErrorResponse('Missing required order fields', 400);
        }

        const newOrder = await createOrder(body);
        return NextResponse.json(newOrder, { status: 201 });
    } catch (error: any) {
        return createErrorResponse(error?.message || 'Failed to create order', 500);
    }
}
