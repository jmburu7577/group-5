import { NextResponse } from 'next/server';
import { getUserById, updateUser, deleteUser } from '@/lib/api-data';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

function createErrorResponse(message: string, status = 500) {
    return NextResponse.json({ error: message }, { status });
}

export async function GET(_request: Request, { params }: { params: { id: string }) {
    try {
        const user = await getUserById(params.id);

        if (!user) {
            return createErrorResponse('User not found.', 404);
        }

        const sanitizedUser = {
            id: user.id,
            name: user.name,
            email: user.email,
            avatar: user.avatar,
        };

        return NextResponse.json(sanitizedUser);
    } catch (error: any) {
        return createErrorResponse(error?.message || 'Unable to fetch user.');
    }
}

export async function PUT(request: Request, { params }: { params: { id: string }) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return createErrorResponse('Unauthorized', 401);
        }

        const body = await request.json();

        if (!body || typeof body !== 'object') {
            return createErrorResponse('Invalid request body.', 400);
        }

        const updatedUser = await updateUser(params.id, body);

        if (!updatedUser) {
            return createErrorResponse('User not found.', 404);
        }

        const sanitizedUser = {
            id: updatedUser.id,
            name: updatedUser.name,
            email: updatedUser.email,
            avatar: updatedUser.avatar,
        };

        return NextResponse.json(sanitizedUser);
    } catch (error: any) {
        return createErrorResponse(error?.message || 'Unable to update user.');
    }
}

export async function DELETE(_request: Request, { params }: { params: { id: string }) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return createErrorResponse('Unauthorized', 401);
        }

        const deleted = await deleteUser(params.id);

        if (!deleted) {
            return createErrorResponse('User not found.', 404);
        }

        return NextResponse.json(null, { status: 204 });
    } catch (error: any) {
        return createErrorResponse(error?.message || 'Unable to delete user.');
    }
}
