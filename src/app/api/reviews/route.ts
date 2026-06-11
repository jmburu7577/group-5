import { NextResponse } from 'next/server';
import { getReviews, createReview } from '@/lib/api-data';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

function createErrorResponse(message: string, status = 500) {
    return NextResponse.json({ error: message }, { status });
}

export async function GET() {
    try {
        const reviews = await getReviews();
        return NextResponse.json(reviews);
    } catch (error) {
        return createErrorResponse('Unable to fetch reviews');
    }
}

export async function POST(request: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return createErrorResponse('Unauthorized', 401);
        }

        const body = await request.json();

        if (!body?.userId || !body?.userName || !body?.rating || !body?.title || !body?.comment) {
            return createErrorResponse('Missing required review fields', 400);
        }

        if (body.rating < 1 || body.rating > 5) {
            return createErrorResponse('Rating must be between 1 and 5', 400);
        }

        const newReview = await createReview(body);
        return NextResponse.json(newReview, { status: 201 });
    } catch (error: any) {
        return createErrorResponse(error?.message || 'Failed to create review', 500);
    }
}
