import { NextResponse } from 'next/server';
import { deleteProduct, getProductById, updateProduct } from '@/lib/api-data';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

function createErrorResponse(message: string, status = 500) {
    return NextResponse.json({ error: message }, { status });
}

export async function GET(_request: Request, { params }: { params: { id: string } }) {
    try {
        const product = await getProductById(params.id);

        if (!product) {
            return createErrorResponse('Product not found.', 404);
        }

        return NextResponse.json(product);
    } catch (error: any) {
        return createErrorResponse(error?.message || 'Unable to fetch product.');
    }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return createErrorResponse('Unauthorized', 401);
        }

        const body = await request.json();

        if (!body || typeof body !== 'object') {
            return createErrorResponse('Invalid request body.', 400);
        }

        const updatedProduct = await updateProduct(params.id, body);

        if (!updatedProduct) {
            return createErrorResponse('Product not found.', 404);
        }

        return NextResponse.json(updatedProduct);
    } catch (error: any) {
        return createErrorResponse(error?.message || 'Unable to update product.');
    }
}

export async function DELETE(_request: Request, { params }: { params: { id: string } }) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return createErrorResponse('Unauthorized', 401);
        }

        const deleted = await deleteProduct(params.id);

        if (!deleted) {
            return createErrorResponse('Product not found.', 404);
        }

        return NextResponse.json(null, { status: 204 });
    } catch (error: any) {
        return createErrorResponse(error?.message || 'Unable to delete product.');
    }
}
