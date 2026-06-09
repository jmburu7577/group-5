import mongoose, { Schema, Document } from 'mongoose';

// Product Model
export interface IProduct extends Document {
    id: string;
    name: string;
    price: number;
    category: string;
    image: string;
    artisanId: string;
    description: string;
    materials: string[];
    dimensions?: string;
    weight?: string;
    inStock: boolean;
    stockQuantity: number;
    rating: number;
    totalReviews: number;
    tags: string[];
    createdAt: string;
    images: string[];
}

const productSchema = new Schema<IProduct>(
    {
        id: { type: String, required: true, unique: true },
        name: { type: String, required: true },
        price: { type: Number, required: true },
        category: { type: String, required: true },
        image: { type: String, default: '' },
        artisanId: { type: String, required: true },
        description: { type: String, required: true },
        materials: [String],
        dimensions: { type: String },
        weight: { type: String },
        inStock: { type: Boolean, default: true },
        stockQuantity: { type: Number, default: 0 },
        rating: { type: Number, default: 0 },
        totalReviews: { type: Number, default: 0 },
        tags: [String],
        images: [String],
        createdAt: { type: String, default: () => new Date().toISOString() },
    },
    { timestamps: false }
);

// Artisan Model
export interface IArtisan extends Document {
    id: string;
    name: string;
    specialty: string;
    description: string;
    image: string;
    location?: string;
    yearsExperience?: number;
    rating: number;
    totalReviews: number;
    verified: boolean;
    joinedDate: string;
    socialLinks?: {
        website?: string;
        instagram?: string;
        facebook?: string;
    };
}

const artisanSchema = new Schema<IArtisan>(
    {
        id: { type: String, required: true, unique: true },
        name: { type: String, required: true },
        specialty: { type: String, required: true },
        description: { type: String, required: true },
        image: { type: String, default: '' },
        location: { type: String },
        yearsExperience: { type: Number },
        rating: { type: Number, default: 0 },
        totalReviews: { type: Number, default: 0 },
        verified: { type: Boolean, default: false },
        joinedDate: { type: String, default: () => new Date().toISOString() },
        socialLinks: {
            website: String,
            instagram: String,
            facebook: String,
        },
    },
    { timestamps: false }
);

// User Model
export interface IUser extends Document {
    id: string;
    name: string;
    email: string;
    password: string;
    avatar?: string;
    wishlist: string[];
    cart: {
        productId: string;
        quantity: number;
        addedAt: string;
    }[];
    orders: string[];
    reviews: string[];
    preferences: {
        categories: string[];
        priceRange: { min: number; max: number };
        notifications: boolean;
    };
    createdAt: string;
}

const userSchema = new Schema<IUser>(
    {
        id: { type: String, required: true, unique: true },
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        avatar: { type: String },
        wishlist: [{ type: String }],
        cart: [
            {
                productId: { type: String, required: true },
                quantity: { type: Number, required: true, default: 1 },
                addedAt: { type: String, default: () => new Date().toISOString() },
            },
        ],
        orders: [{ type: String }],
        reviews: [{ type: String }],
        preferences: {
            categories: [{ type: String }],
            priceRange: {
                min: { type: Number, default: 0 },
                max: { type: Number, default: 1000 },
            },
            notifications: { type: Boolean, default: true },
        },
        createdAt: { type: String, default: () => new Date().toISOString() },
    },
    { timestamps: false }
);

// Review Model
export interface IReview extends Document {
    id: string;
    productId?: string;
    artisanId?: string;
    userId: string;
    userName: string;
    userAvatar?: string;
    rating: number;
    title: string;
    comment: string;
    images?: string[];
    helpful: number;
    verified: boolean;
    createdAt: string;
    response?: {
        message: string;
        createdAt: string;
    };
}

const reviewSchema = new Schema<IReview>(
    {
        id: { type: String, required: true, unique: true },
        productId: { type: String },
        artisanId: { type: String },
        userId: { type: String, required: true },
        userName: { type: String, required: true },
        userAvatar: { type: String },
        rating: { type: Number, required: true, min: 1, max: 5 },
        title: { type: String, required: true },
        comment: { type: String, required: true },
        images: [{ type: String }],
        helpful: { type: Number, default: 0 },
        verified: { type: Boolean, default: false },
        createdAt: { type: String, default: () => new Date().toISOString() },
        response: {
            message: { type: String },
            createdAt: { type: String },
        },
    },
    { timestamps: false }
);

// Order Model
export interface IOrder extends Document {
    id: string;
    userId: string;
    items: {
        productId: string;
        quantity: number;
        addedAt: string;
    }[];
    total: number;
    status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
    createdAt: string;
    shippingAddress: {
        street: string;
        city: string;
        state: string;
        zipCode: string;
        country: string;
    };
}

const orderSchema = new Schema<IOrder>(
    {
        id: { type: String, required: true, unique: true },
        userId: { type: String, required: true },
        items: [
            {
                productId: { type: String, required: true },
                quantity: { type: Number, required: true, default: 1 },
                addedAt: { type: String, default: () => new Date().toISOString() },
            },
        ],
        total: { type: Number, required: true },
        status: {
            type: String,
            enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
            default: 'pending',
        },
        createdAt: { type: String, default: () => new Date().toISOString() },
        shippingAddress: {
            street: { type: String, required: true },
            city: { type: String, required: true },
            state: { type: String, required: true },
            zipCode: { type: String, required: true },
            country: { type: String, required: true },
        },
    },
    { timestamps: false }
);

export const Product =
    mongoose.models.Product || mongoose.model<IProduct>('Product', productSchema);

export const Artisan =
    mongoose.models.Artisan || mongoose.model<IArtisan>('Artisan', artisanSchema);

export const User =
    mongoose.models.User || mongoose.model<IUser>('User', userSchema);

export const Review =
    mongoose.models.Review || mongoose.model<IReview>('Review', reviewSchema);

export const Order =
    mongoose.models.Order || mongoose.model<IOrder>('Order', orderSchema);
