export const openApiSpec = {
    openapi: '3.0.3',
    info: {
        title: 'Handcrafted Haven API',
        version: '1.0.0',
        description: 'API Gateway learning activity for CRUD operations on products and artisans.',
    },
    servers: [
        {
            url: '/',
            description: 'Relative server URL',
        },
    ],
    paths: {
        '/api/products': {
            get: {
                summary: 'Retrieve all products',
                responses: {
                    '200': {
                        description: 'List of products',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'array',
                                    items: { $ref: '#/components/schemas/Product' },
                                },
                            },
                        },
                    },
                    '500': {
                        description: 'Server error',
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/Error' },
                            },
                        },
                    },
                },
            },
            post: {
                summary: 'Create a new product',
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: { $ref: '#/components/schemas/NewProduct' },
                        },
                    },
                },
                responses: {
                    '201': {
                        description: 'Product created',
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/Product' },
                            },
                        },
                    },
                    '400': {
                        description: 'Invalid request',
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/Error' },
                            },
                        },
                    },
                    '500': {
                        description: 'Server error',
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/Error' },
                            },
                        },
                    },
                },
            },
        },
        '/api/products/{id}': {
            parameters: [
                {
                    name: 'id',
                    in: 'path',
                    required: true,
                    schema: { type: 'string' },
                },
            ],
            get: {
                summary: 'Retrieve a single product',
                responses: {
                    '200': {
                        description: 'Product details',
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/Product' },
                            },
                        },
                    },
                    '404': {
                        description: 'Product not found',
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/Error' },
                            },
                        },
                    },
                    '500': {
                        description: 'Server error',
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/Error' },
                            },
                        },
                    },
                },
            },
            put: {
                summary: 'Update an existing product',
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: { $ref: '#/components/schemas/UpdateProduct' },
                        },
                    },
                },
                responses: {
                    '200': {
                        description: 'Updated product',
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/Product' },
                            },
                        },
                    },
                    '400': {
                        description: 'Invalid request',
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/Error' },
                            },
                        },
                    },
                    '404': {
                        description: 'Product not found',
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/Error' },
                            },
                        },
                    },
                },
            },
            delete: {
                summary: 'Delete a product',
                responses: {
                    '204': { description: 'Product deleted' },
                    '404': {
                        description: 'Product not found',
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/Error' },
                            },
                        },
                    },
                },
            },
        },
        '/api/artisans': {
            get: {
                summary: 'Retrieve all artisans',
                responses: {
                    '200': {
                        description: 'List of artisans',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'array',
                                    items: { $ref: '#/components/schemas/Artisan' },
                                },
                            },
                        },
                    },
                    '500': {
                        description: 'Server error',
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/Error' },
                            },
                        },
                    },
                },
            },
            post: {
                summary: 'Create a new artisan',
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: { $ref: '#/components/schemas/NewArtisan' },
                        },
                    },
                },
                responses: {
                    '201': {
                        description: 'Artisan created',
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/Artisan' },
                            },
                        },
                    },
                    '400': {
                        description: 'Invalid request',
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/Error' },
                            },
                        },
                    },
                    '500': {
                        description: 'Server error',
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/Error' },
                            },
                        },
                    },
                },
            },
        },
        '/api/artisans/{id}': {
            parameters: [
                {
                    name: 'id',
                    in: 'path',
                    required: true,
                    schema: { type: 'string' },
                },
            ],
            get: {
                summary: 'Retrieve a single artisan',
                responses: {
                    '200': {
                        description: 'Artisan details',
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/Artisan' },
                            },
                        },
                    },
                    '404': {
                        description: 'Artisan not found',
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/Error' },
                            },
                        },
                    },
                },
            },
            put: {
                summary: 'Update an artisan',
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: { $ref: '#/components/schemas/UpdateArtisan' },
                        },
                    },
                },
                responses: {
                    '200': {
                        description: 'Updated artisan',
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/Artisan' },
                            },
                        },
                    },
                    '400': {
                        description: 'Invalid request',
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/Error' },
                            },
                        },
                    },
                    '404': {
                        description: 'Artisan not found',
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/Error' },
                            },
                        },
                    },
                },
            },
            delete: {
                summary: 'Delete an artisan',
                responses: {
                    '204': { description: 'Artisan deleted' },
                    '404': {
                        description: 'Artisan not found',
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/Error' },
                            },
                        },
                    },
                },
            },
        },
    },
    components: {
        schemas: {
            Product: {
                type: 'object',
                properties: {
                    id: { type: 'string' },
                    name: { type: 'string' },
                    price: { type: 'number', format: 'float' },
                    category: { type: 'string' },
                    image: { type: 'string' },
                    artisanId: { type: 'string' },
                    description: { type: 'string' },
                    materials: {
                        type: 'array',
                        items: { type: 'string' },
                    },
                    dimensions: { type: 'string' },
                    weight: { type: 'string' },
                    inStock: { type: 'boolean' },
                    stockQuantity: { type: 'number' },
                    rating: { type: 'number', format: 'float' },
                    totalReviews: { type: 'number' },
                    tags: {
                        type: 'array',
                        items: { type: 'string' },
                    },
                    createdAt: { type: 'string', format: 'date-time' },
                    images: {
                        type: 'array',
                        items: { type: 'string' },
                    },
                },
                required: ['id', 'name', 'price', 'category', 'artisanId', 'description', 'materials', 'inStock', 'stockQuantity', 'rating', 'totalReviews', 'createdAt', 'tags', 'images'],
            },
            NewProduct: {
                type: 'object',
                properties: {
                    name: { type: 'string' },
                    price: { type: 'number', format: 'float' },
                    category: { type: 'string' },
                    image: { type: 'string' },
                    artisanId: { type: 'string' },
                    description: { type: 'string' },
                    materials: {
                        type: 'array',
                        items: { type: 'string' },
                    },
                    dimensions: { type: 'string' },
                    weight: { type: 'string' },
                    inStock: { type: 'boolean' },
                    stockQuantity: { type: 'number' },
                    rating: { type: 'number', format: 'float' },
                    totalReviews: { type: 'number' },
                    tags: {
                        type: 'array',
                        items: { type: 'string' },
                    },
                    images: {
                        type: 'array',
                        items: { type: 'string' },
                    },
                },
                required: ['name', 'price', 'category', 'artisanId', 'description', 'materials', 'inStock', 'stockQuantity', 'rating', 'totalReviews', 'tags', 'images'],
            },
            UpdateProduct: {
                type: 'object',
                properties: {
                    name: { type: 'string' },
                    price: { type: 'number', format: 'float' },
                    category: { type: 'string' },
                    image: { type: 'string' },
                    artisanId: { type: 'string' },
                    description: { type: 'string' },
                    materials: {
                        type: 'array',
                        items: { type: 'string' },
                    },
                    dimensions: { type: 'string' },
                    weight: { type: 'string' },
                    inStock: { type: 'boolean' },
                    stockQuantity: { type: 'number' },
                    rating: { type: 'number', format: 'float' },
                    totalReviews: { type: 'number' },
                    tags: {
                        type: 'array',
                        items: { type: 'string' },
                    },
                    images: {
                        type: 'array',
                        items: { type: 'string' },
                    },
                },
            },
            Artisan: {
                type: 'object',
                properties: {
                    id: { type: 'string' },
                    name: { type: 'string' },
                    specialty: { type: 'string' },
                    description: { type: 'string' },
                    image: { type: 'string' },
                    location: { type: 'string' },
                    yearsExperience: { type: 'number' },
                    rating: { type: 'number', format: 'float' },
                    totalReviews: { type: 'number' },
                    verified: { type: 'boolean' },
                    joinedDate: { type: 'string', format: 'date-time' },
                    socialLinks: {
                        type: 'object',
                        properties: {
                            website: { type: 'string' },
                            instagram: { type: 'string' },
                            facebook: { type: 'string' },
                        },
                    },
                },
                required: ['id', 'name', 'specialty', 'description', 'image', 'rating', 'totalReviews', 'verified', 'joinedDate'],
            },
            NewArtisan: {
                type: 'object',
                properties: {
                    name: { type: 'string' },
                    specialty: { type: 'string' },
                    description: { type: 'string' },
                    image: { type: 'string' },
                    location: { type: 'string' },
                    yearsExperience: { type: 'number' },
                    rating: { type: 'number', format: 'float' },
                    totalReviews: { type: 'number' },
                    verified: { type: 'boolean' },
                    joinedDate: { type: 'string', format: 'date-time' },
                    socialLinks: {
                        type: 'object',
                        properties: {
                            website: { type: 'string' },
                            instagram: { type: 'string' },
                            facebook: { type: 'string' },
                        },
                    },
                },
                required: ['name', 'specialty', 'description', 'image', 'rating', 'totalReviews', 'verified', 'joinedDate'],
            },
            UpdateArtisan: {
                type: 'object',
                properties: {
                    name: { type: 'string' },
                    specialty: { type: 'string' },
                    description: { type: 'string' },
                    image: { type: 'string' },
                    location: { type: 'string' },
                    yearsExperience: { type: 'number' },
                    rating: { type: 'number', format: 'float' },
                    totalReviews: { type: 'number' },
                    verified: { type: 'boolean' },
                    joinedDate: { type: 'string', format: 'date-time' },
                    socialLinks: {
                        type: 'object',
                        properties: {
                            website: { type: 'string' },
                            instagram: { type: 'string' },
                            facebook: { type: 'string' },
                        },
                    },
                },
            },
            Error: {
                type: 'object',
                properties: {
                    error: { type: 'string' },
                },
                required: ['error'],
            },
        },
    },
};
