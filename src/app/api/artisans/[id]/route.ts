import { NextResponse } from 'next/server';
import { deleteArtisan, getArtisanById, updateArtisan } from '@/lib/api-data';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

function createErrorResponse(message: string, status = 500) {
    return NextResponse.json({ error: message }, { status });
}

export async function GET(_request: Request, { params }: { params: { id: string } }) {
    try {
        const artisan = await getArtisanById(params.id);

        if (!artisan) {
            return createErrorResponse('Artisan not found.', 404);
        }

        return NextResponse.json(artisan);
    } catch (error: any) {
        return createErrorResponse(error?.message || 'Unable to fetch artisan.');
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

        const updatedArtisan = await updateArtisan(params.id, body);

        if (!updatedArtisan) {
            return createErrorResponse('Artisan not found.', 404);
        }

        return NextResponse.json(updatedArtisan);
    } catch (error: any) {
        return createErrorResponse(error?.message || 'Unable to update artisan.');
    }
}

export async function DELETE(_request: Request, { params }: { params: { id: string } }) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return createErrorResponse('Unauthorized', 401);
        }

        const deleted = await deleteArtisan(params.id);

        if (!deleted) {
            return createErrorResponse('Artisan not found.', 404);
        }

        return NextResponse.json(null, { status: 204 });
    } catch (error: any) {
        return createErrorResponse(error?.message || 'Unable to delete artisan.');
    }
}
