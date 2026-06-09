import { NextResponse } from 'next/server';
import { getOrderById, updateOrder, deleteOrder } from '@/lib/api-data';

function createErrorResponse(message: string, status = 500) {
    return NextResponse.json({ error: message }, { status });
}

export async function GET(_request: Request, { params }: { params: { id: string } }) {
    try {
        const order = await getOrderById(params.id);

        if (!order) {
            return createErrorResponse('Order not found', 404);
        }

        return NextResponse.json(order);
    } catch (error: any) {
        return createErrorResponse(error?.message || 'Unable to fetch order');
    }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
    try {
        const body = await request.json();

        if (!body || typeof body !== 'object') {
            return createErrorResponse('Invalid request body', 400);
        }

        const updatedOrder = await updateOrder(params.id, body);

        if (!updatedOrder) {
            return createErrorResponse('Order not found', 404);
        }

        return NextResponse.json(updatedOrder);
    } catch (error: any) {
        return createErrorResponse(error?.message || 'Unable to update order');
    }
}

export async function DELETE(_request: Request, { params }: { params: { id: string } }) {
    try {
        const deleted = await deleteOrder(params.id);

        if (!deleted) {
            return createErrorResponse('Order not found', 404);
        }

        return NextResponse.json(null, { status: 204 });
    } catch (error: any) {
        return createErrorResponse(error?.message || 'Unable to delete order');
    }
}
