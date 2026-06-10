export const openApiSpec = {
    openapi: '3.0.3',
    info: {
        title: 'Handcrafted Haven API',
        version: '1.0.0',
        description: 'Complete API for the Handcrafted Haven marketplace with authentication, products, artisans, reviews, orders, cart, and wishlist.',
    },
    servers: [
        {
            url: '/',
            description: 'Relative server URL',
        },
    ],
    paths: {
        '/api/auth/register': {
            post: {
                summary: 'Register a new user',
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    name: { type: 'string' },
                                    email: { type: 'string' },
                                    password: { type: 'string' },
                                },
                                required: ['name', 'email', 'password'],
                            },
                        },
                    },
                },
                responses: {
                    '201': {
                        description: 'User registered successfully',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        user: { $ref: '#/components/schemas/User' },
                                        token: { type: 'string' },
                                    },
                                },
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
                    '409': {
                        description: 'User already exists',
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
        '/api/auth/login': {
            post: {
                summary: 'Login a user',
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    email: { type: 'string' },
                                    password: { type: 'string' },
                                },
                                required: ['email', 'password'],
                            },
                        },
                    },
                },
                responses: {
                    '200': {
                        description: 'Login successful',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        user: { $ref: '#/components/schemas/User' },
                                        token: { type: 'string' },
                                    },
                                },
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
                    '401': {
                        description: 'Invalid credentials',
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
        '/api/users': {
            get: {
                summary: 'Retrieve all users',
                responses: {
                    '200': {
                        description: 'List of users',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'array',
                                    items: { $ref: '#/components/schemas/User' },
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
                summary: 'Create a new user',
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    name: { type: 'string' },
                                    email: { type: 'string' },
                                    avatar: { type: 'string' },
                                },
                                required: ['name', 'email'],
                            },
                        },
                    },
                },
                responses: {
                    '201': {
                        description: 'User created',
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/User' },
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
                    '401': {
                        description: 'Unauthorized',
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
        '/api/users/{id}': {
            parameters: [
                {
                    name: 'id',
                    in: 'path',
                    required: true,
                    schema: { type: 'string' },
                },
            ],
            get: {
                summary: 'Retrieve a single user',
                responses: {
                    '200': {
                        description: 'User details',
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/User' },
                            },
                        },
                    },
                    '404': {
                        description: 'User not found',
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
                summary: 'Update an existing user',
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    name: { type: 'string' },
                                    avatar: { type: 'string' },
                                },
                            },
                        },
                    },
                },
                responses: {
                    '200': {
                        description: 'Updated user',
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/User' },
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
                    '401': {
                        description: 'Unauthorized',
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/Error' },
                            },
                        },
                    },
                    '404': {
                        description: 'User not found',
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/Error' },
                            },
                        },
                    },
                },
            },
            delete: {
                summary: 'Delete a user',
                responses: {
                    '204': { description: 'User deleted' },
                    '401': {
                        description: 'Unauthorized',
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/Error' },
                            },
                        },
                    },
                    '404': {
                        description: 'User not found',
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/Error' },
                            },
                        },
                    },
                },
            },
        },
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
        '/api/reviews': {
            get: {
                summary: 'Retrieve all reviews',
                responses: {
                    '200': {
                        description: 'List of reviews',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'array',
                                    items: { $ref: '#/components/schemas/Review' },
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
                summary: 'Create a new review',
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: { $ref: '#/components/schemas/NewReview' },
                        },
                    },
                },
                responses: {
                    '201': {
                        description: 'Review created',
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/Review' },
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
        '/api/reviews/{id}': {
            parameters: [
                {
                    name: 'id',
                    in: 'path',
                    required: true,
                    schema: { type: 'string' },
                },
            ],
            get: {
                summary: 'Retrieve a single review',
                responses: {
                    '200': {
                        description: 'Review details',
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/Review' },
                            },
                        },
                    },
                    '404': {
                        description: 'Review not found',
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
                summary: 'Update an existing review',
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: { $ref: '#/components/schemas/UpdateReview' },
                        },
                    },
                },
                responses: {
                    '200': {
                        description: 'Updated review',
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/Review' },
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
                        description: 'Review not found',
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/Error' },
                            },
                        },
                    },
                },
            },
            delete: {
                summary: 'Delete a review',
                responses: {
                    '204': { description: 'Review deleted' },
                    '404': {
                        description: 'Review not found',
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/Error' },
                            },
                        },
                    },
                },
            },
        },
        '/api/orders': {
            get: {
                summary: 'Retrieve all orders',
                responses: {
                    '200': {
                        description: 'List of orders',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'array',
                                    items: { $ref: '#/components/schemas/Order' },
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
                summary: 'Create a new order',
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: { $ref: '#/components/schemas/NewOrder' },
                        },
                    },
                },
                responses: {
                    '201': {
                        description: 'Order created',
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/Order' },
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
        '/api/orders/{id}': {
            parameters: [
                {
                    name: 'id',
                    in: 'path',
                    required: true,
                    schema: { type: 'string' },
                },
            ],
            get: {
                summary: 'Retrieve a single order',
                responses: {
                    '200': {
                        description: 'Order details',
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/Order' },
                            },
                        },
                    },
                    '404': {
                        description: 'Order not found',
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
                summary: 'Update an existing order',
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: { $ref: '#/components/schemas/UpdateOrder' },
                        },
                    },
                },
                responses: {
                    '200': {
                        description: 'Updated order',
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/Order' },
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
                        description: 'Order not found',
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/Error' },
                            },
                        },
                    },
                },
            },
            delete: {
                summary: 'Delete an order',
                responses: {
                    '204': { description: 'Order deleted' },
                    '404': {
                        description: 'Order not found',
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/Error' },
                            },
                        },
                    },
                },
            },
        },
        '/api/wishlist': {
            get: {
                summary: 'Retrieve user wishlist',
                parameters: [
                    {
                        name: 'userId',
                        in: 'query',
                        required: true,
                        schema: { type: 'string' },
                    },
                ],
                responses: {
                    '200': {
                        description: 'Wishlist product IDs',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'array',
                                    items: { type: 'string' },
                                },
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
            post: {
                summary: 'Add product to wishlist',
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    userId: { type: 'string' },
                                    productId: { type: 'string' },
                                },
                                required: ['userId', 'productId'],
                            },
                        },
                    },
                },
                responses: {
                    '201': {
                        description: 'Updated wishlist',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'array',
                                    items: { type: 'string' },
                                },
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
            delete: {
                summary: 'Remove product from wishlist',
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    userId: { type: 'string' },
                                    productId: { type: 'string' },
                                },
                                required: ['userId', 'productId'],
                            },
                        },
                    },
                },
                responses: {
                    '200': {
                        description: 'Updated wishlist',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'array',
                                    items: { type: 'string' },
                                },
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
        '/api/cart': {
            get: {
                summary: 'Retrieve user cart',
                parameters: [
                    {
                        name: 'userId',
                        in: 'query',
                        required: true,
                        schema: { type: 'string' },
                    },
                ],
                responses: {
                    '200': {
                        description: 'Cart items',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'array',
                                    items: { $ref: '#/components/schemas/CartItem' },
                                },
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
            post: {
                summary: 'Add product to cart',
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    userId: { type: 'string' },
                                    productId: { type: 'string' },
                                    quantity: { type: 'number' },
                                },
                                required: ['userId', 'productId'],
                            },
                        },
                    },
                },
                responses: {
                    '201': {
                        description: 'Updated cart',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'array',
                                    items: { $ref: '#/components/schemas/CartItem' },
                                },
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
            put: {
                summary: 'Update cart item quantity',
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    userId: { type: 'string' },
                                    productId: { type: 'string' },
                                    quantity: { type: 'number' },
                                },
                                required: ['userId', 'productId', 'quantity'],
                            },
                        },
                    },
                },
                responses: {
                    '200': {
                        description: 'Updated cart',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'array',
                                    items: { $ref: '#/components/schemas/CartItem' },
                                },
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
            delete: {
                summary: 'Remove product from cart',
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    userId: { type: 'string' },
                                    productId: { type: 'string' },
                                },
                                required: ['userId', 'productId'],
                            },
                        },
                    },
                },
                responses: {
                    '200': {
                        description: 'Updated cart',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'array',
                                    items: { $ref: '#/components/schemas/CartItem' },
                                },
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
    },
    components: {
        schemas: {
            User: {
                type: 'object',
                properties: {
                    id: { type: 'string' },
                    name: { type: 'string' },
                    email: { type: 'string' },
                    avatar: { type: 'string' },
                },
                required: ['id', 'name', 'email'],
            },
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
            Review: {
                type: 'object',
                properties: {
                    id: { type: 'string' },
                    productId: { type: 'string' },
                    artisanId: { type: 'string' },
                    userId: { type: 'string' },
                    userName: { type: 'string' },
                    userAvatar: { type: 'string' },
                    rating: { type: 'number', minimum: 1, maximum: 5 },
                    title: { type: 'string' },
                    comment: { type: 'string' },
                    images: {
                        type: 'array',
                        items: { type: 'string' },
                    },
                    helpful: { type: 'number' },
                    verified: { type: 'boolean' },
                    createdAt: { type: 'string', format: 'date-time' },
                    response: {
                        type: 'object',
                        properties: {
                            message: { type: 'string' },
                            createdAt: { type: 'string', format: 'date-time' },
                        },
                    },
                },
                required: ['id', 'userId', 'userName', 'rating', 'title', 'comment', 'helpful', 'verified', 'createdAt'],
            },
            NewReview: {
                type: 'object',
                properties: {
                    productId: { type: 'string' },
                    artisanId: { type: 'string' },
                    userId: { type: 'string' },
                    userName: { type: 'string' },
                    userAvatar: { type: 'string' },
                    rating: { type: 'number', minimum: 1, maximum: 5 },
                    title: { type: 'string' },
                    comment: { type: 'string' },
                    images: {
                        type: 'array',
                        items: { type: 'string' },
                    },
                },
                required: ['userId', 'userName', 'rating', 'title', 'comment'],
            },
            UpdateReview: {
                type: 'object',
                properties: {
                    rating: { type: 'number', minimum: 1, maximum: 5 },
                    title: { type: 'string' },
                    comment: { type: 'string' },
                    images: {
                        type: 'array',
                        items: { type: 'string' },
                    },
                    response: {
                        type: 'object',
                        properties: {
                            message: { type: 'string' },
                        },
                    },
                },
            },
            Order: {
                type: 'object',
                properties: {
                    id: { type: 'string' },
                    userId: { type: 'string' },
                    items: {
                        type: 'array',
                        items: { $ref: '#/components/schemas/CartItem' },
                    },
                    total: { type: 'number', format: 'float' },
                    status: {
                        type: 'string',
                        enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
                    },
                    createdAt: { type: 'string', format: 'date-time' },
                    shippingAddress: { $ref: '#/components/schemas/Address' },
                },
                required: ['id', 'userId', 'items', 'total', 'status', 'createdAt', 'shippingAddress'],
            },
            NewOrder: {
                type: 'object',
                properties: {
                    userId: { type: 'string' },
                    items: {
                        type: 'array',
                        items: { $ref: '#/components/schemas/CartItem' },
                    },
                    total: { type: 'number', format: 'float' },
                    shippingAddress: { $ref: '#/components/schemas/Address' },
                },
                required: ['userId', 'items', 'total', 'shippingAddress'],
            },
            UpdateOrder: {
                type: 'object',
                properties: {
                    status: {
                        type: 'string',
                        enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
                    },
                },
            },
            CartItem: {
                type: 'object',
                properties: {
                    productId: { type: 'string' },
                    quantity: { type: 'number' },
                    addedAt: { type: 'string', format: 'date-time' },
                },
                required: ['productId', 'quantity', 'addedAt'],
            },
            Address: {
                type: 'object',
                properties: {
                    street: { type: 'string' },
                    city: { type: 'string' },
                    state: { type: 'string' },
                    zipCode: { type: 'string' },
                    country: { type: 'string' },
                },
                required: ['street', 'city', 'state', 'zipCode', 'country'],
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
