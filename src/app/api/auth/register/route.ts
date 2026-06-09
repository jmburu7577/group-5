import { NextResponse } from 'next/server';
import { createUser, getUserByEmail } from '@/lib/api-data';
import { hashPassword, generateToken } from '@/lib/auth';

function createErrorResponse(message: string, status = 500) {
    return NextResponse.json({ error: message }, { status });
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, email, password } = body;

        if (!name || !email || !password) {
            return createErrorResponse('Name, email, and password are required', 400);
        }

        const existingUser = await getUserByEmail(email);
        if (existingUser) {
            return createErrorResponse('User already exists with this email', 409);
        }

        const hashedPassword = await hashPassword(password);
        const user = await createUser({
            name,
            email,
            password: hashedPassword,
        });

        const token = generateToken(user.id, user.email);

        return NextResponse.json({
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
            },
            token,
        }, { status: 201 });
    } catch (error: any) {
        return createErrorResponse(error?.message || 'Failed to register user', 500);
    }
}
