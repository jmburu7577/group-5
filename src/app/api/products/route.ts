import { NextResponse } from 'next/server';
import { createProduct, getProducts } from '@/lib/api-data';
import { auth } from '@/app/api/auth/[...nextauth]/route';

function createErrorResponse(message: string, status = 500) {
    return NextResponse.json({ error: message }, { status });
}

export async function GET() {
    try {
        const products = await getProducts();
        return NextResponse.json(products);
    } catch (error) {
        return createErrorResponse('Unable to fetch products.');
    }
}

export async function POST(request: Request) {
    try {
        const session = await auth();
        if (!session) {
            return createErrorResponse('Unauthorized', 401);
        }

        const body = await request.json();

        if (!body?.name || typeof body.price !== 'number' || !body?.category || !body?.artisanId || !body?.description) {
            return createErrorResponse('Missing required product fields.', 400);
        }

        const newProduct = await createProduct({
            name: String(body.name),
            price: Number(body.price),
            category: String(body.category),
            image: String(body.image || ''),
            artisanId: String(body.artisanId),
            description: String(body.description),
            materials: Array.isArray(body.materials) ? body.materials.map(String) : [],
            dimensions: body.dimensions ? String(body.dimensions) : '',
            weight: body.weight ? String(body.weight) : '',
            inStock: Boolean(body.inStock),
            stockQuantity: typeof body.stockQuantity === 'number' ? body.stockQuantity : 0,
            rating: typeof body.rating === 'number' ? body.rating : 0,
            totalReviews: typeof body.totalReviews === 'number' ? body.totalReviews : 0,
            tags: Array.isArray(body.tags) ? body.tags.map(String) : [],
            images: Array.isArray(body.images) ? body.images.map(String) : [],
        });

        return NextResponse.json(newProduct, { status: 201 });
    } catch (error: any) {
        return createErrorResponse(error?.message || 'Failed to create product.', 500);
    }
}
