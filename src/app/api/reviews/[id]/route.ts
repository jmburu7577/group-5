import { NextResponse } from 'next/server';
import { getReviewById, updateReview, deleteReview } from '@/lib/api-data';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

function createErrorResponse(message: string, status = 500) {
    return NextResponse.json({ error: message }, { status });
}

export async function GET(_request: Request, { params }: { params: { id: string } }) {
    try {
        const review = await getReviewById(params.id);

        if (!review) {
            return createErrorResponse('Review not found', 404);
        }

        return NextResponse.json(review);
    } catch (error: any) {
        return createErrorResponse(error?.message || 'Unable to fetch review');
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
            return createErrorResponse('Invalid request body', 400);
        }

        const updatedReview = await updateReview(params.id, body);

        if (!updatedReview) {
            return createErrorResponse('Review not found', 404);
        }

        return NextResponse.json(updatedReview);
    } catch (error: any) {
        return createErrorResponse(error?.message || 'Unable to update review');
    }
}

export async function DELETE(_request: Request, { params }: { params: { id: string } }) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return createErrorResponse('Unauthorized', 401);
        }

        const deleted = await deleteReview(params.id);

        if (!deleted) {
            return createErrorResponse('Review not found', 404);
        }

        return NextResponse.json(null, { status: 204 });
    } catch (error: any) {
        return createErrorResponse(error?.message || 'Unable to delete review');
    }
}
