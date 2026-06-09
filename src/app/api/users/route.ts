import { NextResponse } from 'next/server';
import { getUsers } from '@/lib/api-data';

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
        return createErrorResponse('Unable to fetch users');
    }
}
