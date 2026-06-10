import { NextResponse } from 'next/server';
import { getUsers, createUser } from '@/lib/api-data';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

function createErrorResponse(message: string, status = 500) {
    return NextResponse.json({ error: message }, { status });
}

export async function GET() {
    try {
        const users = await getUsers();
        const sanitizedUsers = users.map(user => ({
            id: user.id,
            name: user.name,
            email: user.email,
            avatar: user.avatar,
        }));
        return NextResponse.json(sanitizedUsers);
    } catch (error) {
        return createErrorResponse('Unable to fetch users.');
    }
}

export async function POST(request: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return createErrorResponse('Unauthorized', 401);
        }

        const body = await request.json();

        if (!body?.name || !body?.email) {
            return createErrorResponse('Name and email are required.', 400);
        }

        const newUser = await createUser({
            name: String(body.name),
            email: String(body.email),
        });

        return NextResponse.json(newUser, { status: 201 });
    } catch (error: any) {
        return createErrorResponse(error?.message || 'Failed to create user.', 500);
    }
}
