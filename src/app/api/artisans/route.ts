import { NextResponse } from 'next/server';
import { createArtisan, getArtisans } from '@/lib/api-data';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

function createErrorResponse(message: string, status = 500) {
    return NextResponse.json({ error: message }, { status });
}

export async function GET() {
    try {
        const artisans = await getArtisans();
        return NextResponse.json(artisans);
    } catch (error) {
        return createErrorResponse('Unable to fetch artisans.');
    }
}

export async function POST(request: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return createErrorResponse('Unauthorized', 401);
        }

        const body = await request.json();

        if (!body?.name || !body?.specialty || !body?.description || !body?.image) {
            return createErrorResponse('Missing required artisan fields.', 400);
        }

        const newArtisan = await createArtisan({
            name: String(body.name),
            specialty: String(body.specialty),
            description: String(body.description),
            image: String(body.image),
            location: body.location ? String(body.location) : '',
            yearsExperience: typeof body.yearsExperience === 'number' ? body.yearsExperience : 0,
            rating: typeof body.rating === 'number' ? body.rating : 0,
            totalReviews: typeof body.totalReviews === 'number' ? body.totalReviews : 0,
            verified: Boolean(body.verified),
            joinedDate: body.joinedDate ? String(body.joinedDate) : new Date().toISOString(),
            socialLinks: {
                website: body?.socialLinks?.website ? String(body.socialLinks.website) : undefined,
                instagram: body?.socialLinks?.instagram ? String(body.socialLinks.instagram) : undefined,
                facebook: body?.socialLinks?.facebook ? String(body.socialLinks.facebook) : undefined,
            },
        });

        return NextResponse.json(newArtisan, { status: 201 });
    } catch (error: any) {
        return createErrorResponse(error?.message || 'Failed to create artisan.', 500);
    }
}
