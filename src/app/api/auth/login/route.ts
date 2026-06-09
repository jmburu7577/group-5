import { NextResponse } from 'next/server';
import { getUserByEmail } from '@/lib/api-data';
import { comparePassword, generateToken } from '@/lib/auth';

function createErrorResponse(message: string, status = 500) {
    return NextResponse.json({ error: message }, { status });
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { email, password } = body;

        if (!email || !password) {
            return createErrorResponse('Email and password are required', 400);
        }

        const user = await getUserByEmail(email);
        if (!user) {
            return createErrorResponse('Invalid credentials', 401);
        }

        const isPasswordValid = await comparePassword(password, user.password);
        if (!isPasswordValid) {
            return createErrorResponse('Invalid credentials', 401);
        }

        const token = generateToken(user.id, user.email);

        return NextResponse.json({
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
            },
            token,
        });
    } catch (error: any) {
        return createErrorResponse(error?.message || 'Failed to login', 500);
    }
}
