import { connectToDatabase } from './mongodb';
import { Product, Artisan, User, Review, Order, IProduct, IArtisan, IUser, IReview, IOrder } from './models';
import type { Artisan as ArtisanType, Product as ProductType, User as UserType, Review as ReviewType, Order as OrderType } from './data';
import { allProducts, featuredArtisans, getProductById as getProductByIdFromData, getArtisanById as getArtisanByIdFromData } from './data';

// Helper to convert Mongoose doc to plain object
function toPlainObject<T>(doc: any): T {
  return doc?.toObject ? doc.toObject() : doc;
}

// ============ PRODUCTS ============

export async function getProducts(): Promise<ProductType[]> {
  try {
    await connectToDatabase();
    const products = await Product.find().lean();
    if (products && products.length > 0) {
      return products as ProductType[];
    }
  } catch (error) {
    console.warn('MongoDB not available for products, falling back to in-memory data');
  }
  return allProducts;
}

export async function getProductById(id: string): Promise<ProductType | undefined> {
  try {
    await connectToDatabase();
    const product = await Product.findOne({ id }).lean();
    if (product) {
      return product as ProductType | undefined;
    }
  } catch (error) {
    console.warn('MongoDB not available for product, falling back to in-memory data');
  }
  return getProductByIdFromData(id);
}

export async function createProduct(
  newProduct: Omit<ProductType, 'id' | 'createdAt'>
): Promise<ProductType> {
  try {
    await connectToDatabase();
    const product = new Product({
      id: `prod-${Date.now()}`,
      createdAt: new Date().toISOString(),
      ...newProduct,
    });
    await product.save();
    return toPlainObject<ProductType>(product);
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
}

export async function updateProduct(
  id: string,
  updates: Partial<Omit<ProductType, 'id' | 'createdAt'>>
): Promise<ProductType | undefined> {
  try {
    await connectToDatabase();
    const product = await Product.findOneAndUpdate(
      { id },
      { $set: updates },
      { new: true }
    ).lean();
    return product as ProductType | undefined;
  } catch (error) {
    console.error(`Error updating product ${id}:`, error);
    throw error;
  }
}

export async function deleteProduct(id: string): Promise<boolean> {
  try {
    await connectToDatabase();
    const result = await Product.deleteOne({ id });
    return result.deletedCount > 0;
  } catch (error) {
    console.error(`Error deleting product ${id}:`, error);
    throw error;
  }
}

// ============ ARTISANS ============

export async function getArtisans(): Promise<ArtisanType[]> {
  try {
    await connectToDatabase();
    const artisans = await Artisan.find().lean();
    if (artisans && artisans.length > 0) {
      return artisans as ArtisanType[];
    }
  } catch (error) {
    console.warn('MongoDB not available for artisans, falling back to in-memory data');
  }
  return featuredArtisans;
}

export async function getArtisanById(id: string): Promise<ArtisanType | undefined> {
  try {
    await connectToDatabase();
    const artisan = await Artisan.findOne({ id }).lean();
    if (artisan) {
      return artisan as ArtisanType | undefined;
    }
  } catch (error) {
    console.warn('MongoDB not available for artisan, falling back to in-memory data');
  }
  return getArtisanByIdFromData(id);
}

export async function createArtisan(
  newArtisan: Omit<ArtisanType, 'id'>
): Promise<ArtisanType> {
  try {
    await connectToDatabase();
    const artisan = new Artisan({
      id: `artisan-${Date.now()}`,
      ...newArtisan,
    });
    await artisan.save();
    return toPlainObject<ArtisanType>(artisan);
  } catch (error) {
    console.error('Error creating artisan:', error);
    throw error;
  }
}

export async function updateArtisan(
  id: string,
  updates: Partial<Omit<ArtisanType, 'id'>>
): Promise<ArtisanType | undefined> {
  try {
    await connectToDatabase();
    const artisan = await Artisan.findOneAndUpdate(
      { id },
      { $set: updates },
      { new: true }
    ).lean();
    return artisan as ArtisanType | undefined;
  } catch (error) {
    console.error(`Error updating artisan ${id}:`, error);
    throw error;
  }
}

export async function deleteArtisan(id: string): Promise<boolean> {
  try {
    await connectToDatabase();
    const result = await Artisan.deleteOne({ id });
    return result.deletedCount > 0;
  } catch (error) {
    console.error(`Error deleting artisan ${id}:`, error);
    throw error;
  }
}

// ============ USERS ============

export async function getUsers(): Promise<UserType[]> {
    try {
        await connectToDatabase();
        const users = await User.find().lean();
        return users as UserType[];
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
}

export async function getUserById(id: string): Promise<UserType | undefined> {
    try {
        await connectToDatabase();
        const user = await User.findOne({ id }).lean();
        return user as UserType | undefined;
    } catch (error) {
        console.error(`Error fetching user ${id}:`, error);
        throw error;
    }
}

export async function getUserByEmail(email: string): Promise<UserType | undefined> {
    try {
        await connectToDatabase();
        const user = await User.findOne({ email }).lean();
        return user as UserType | undefined;
    } catch (error) {
        console.error(`Error fetching user by email ${email}:`, error);
        throw error;
    }
}

export async function createUser(
    newUser: Omit<UserType, 'id' | 'createdAt' | 'orders' | 'reviews' | 'cart' | 'wishlist' | 'preferences'> & { password: string }
): Promise<UserType> {
    try {
        await connectToDatabase();
        const user = new User({
            id: `user-${Date.now()}`,
            createdAt: new Date().toISOString(),
            wishlist: [],
            cart: [],
            orders: [],
            reviews: [],
            preferences: {
                categories: [],
                priceRange: { min: 0, max: 1000 },
                notifications: true,
            },
            ...newUser,
        });
        await user.save();
        return toPlainObject<UserType>(user);
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
}

export async function updateUser(
    id: string,
    updates: Partial<Omit<UserType, 'id' | 'createdAt' | 'password'>>
): Promise<UserType | undefined> {
    try {
        await connectToDatabase();
        const user = await User.findOneAndUpdate(
            { id },
            { $set: updates },
            { new: true }
        ).lean();
        return user as UserType | undefined;
    } catch (error) {
        console.error(`Error updating user ${id}:`, error);
        throw error;
    }
}

export async function deleteUser(id: string): Promise<boolean> {
    try {
        await connectToDatabase();
        const result = await User.deleteOne({ id });
        return result.deletedCount > 0;
    } catch (error) {
        console.error(`Error deleting user ${id}:`, error);
        throw error;
    }
}

// ============ WISHLIST ============

export async function getWishlist(userId: string): Promise<string[]> {
    try {
        await connectToDatabase();
        const user = await User.findOne({ id: userId }).lean();
        return user?.wishlist || [];
    } catch (error) {
        console.error(`Error fetching wishlist for user ${userId}:`, error);
        throw error;
    }
}

export async function addToWishlist(userId: string, productId: string): Promise<string[]> {
    try {
        await connectToDatabase();
        const user = await User.findOneAndUpdate(
            { id: userId },
            { $addToSet: { wishlist: productId } },
            { new: true }
        ).lean();
        return user?.wishlist || [];
    } catch (error) {
        console.error(`Error adding to wishlist:`, error);
        throw error;
    }
}

export async function removeFromWishlist(userId: string, productId: string): Promise<string[]> {
    try {
        await connectToDatabase();
        const user = await User.findOneAndUpdate(
            { id: userId },
            { $pull: { wishlist: productId } },
            { new: true }
        ).lean();
        return user?.wishlist || [];
    } catch (error) {
        console.error(`Error removing from wishlist:`, error);
        throw error;
    }
}

// ============ CART ============

export async function getCart(userId: string) {
    try {
        await connectToDatabase();
        const user = await User.findOne({ id: userId }).lean();
        return user?.cart || [];
    } catch (error) {
        console.error(`Error fetching cart for user ${userId}:`, error);
        throw error;
    }
}

export async function addToCart(userId: string, productId: string, quantity: number = 1) {
    try {
        await connectToDatabase();
        const user = await User.findOne({ id: userId });
        if (!user) throw new Error('User not found');

        const existingItem = user.cart.find(item => item.productId === productId);
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            user.cart.push({ productId, quantity, addedAt: new Date().toISOString() });
        }

        await user.save();
        return user.cart;
    } catch (error) {
        console.error(`Error adding to cart:`, error);
        throw error;
    }
}

export async function updateCartItem(userId: string, productId: string, quantity: number) {
    try {
        await connectToDatabase();
        const user = await User.findOne({ id: userId });
        if (!user) throw new Error('User not found');

        const item = user.cart.find(item => item.productId === productId);
        if (!item) throw new Error('Item not in cart');

        item.quantity = quantity;
        await user.save();
        return user.cart;
    } catch (error) {
        console.error(`Error updating cart item:`, error);
        throw error;
    }
}

export async function removeFromCart(userId: string, productId: string) {
    try {
        await connectToDatabase();
        const user = await User.findOneAndUpdate(
            { id: userId },
            { $pull: { cart: { productId } } },
            { new: true }
        ).lean();
        return user?.cart || [];
    } catch (error) {
        console.error(`Error removing from cart:`, error);
        throw error;
    }
}

// ============ REVIEWS ============

export async function getReviews(): Promise<ReviewType[]> {
    try {
        await connectToDatabase();
        const reviews = await Review.find().lean();
        return reviews as ReviewType[];
    } catch (error) {
        console.error('Error fetching reviews:', error);
        throw error;
    }
}

export async function getReviewById(id: string): Promise<ReviewType | undefined> {
    try {
        await connectToDatabase();
        const review = await Review.findOne({ id }).lean();
        return review as ReviewType | undefined;
    } catch (error) {
        console.error(`Error fetching review ${id}:`, error);
        throw error;
    }
}

export async function getReviewsByProductId(productId: string): Promise<ReviewType[]> {
    try {
        await connectToDatabase();
        const reviews = await Review.find({ productId }).lean();
        return reviews as ReviewType[];
    } catch (error) {
        console.error(`Error fetching reviews for product ${productId}:`, error);
        throw error;
    }
}

export async function getReviewsByArtisanId(artisanId: string): Promise<ReviewType[]> {
    try {
        await connectToDatabase();
        const reviews = await Review.find({ artisanId }).lean();
        return reviews as ReviewType[];
    } catch (error) {
        console.error(`Error fetching reviews for artisan ${artisanId}:`, error);
        throw error;
    }
}

export async function createReview(
    newReview: Omit<ReviewType, 'id' | 'createdAt' | 'helpful' | 'verified'>
): Promise<ReviewType> {
    try {
        await connectToDatabase();
        const review = new Review({
            id: `review-${Date.now()}`,
            createdAt: new Date().toISOString(),
            helpful: 0,
            verified: false,
            ...newReview,
        });
        await review.save();
        return toPlainObject<ReviewType>(review);
    } catch (error) {
        console.error('Error creating review:', error);
        throw error;
    }
}

export async function updateReview(
    id: string,
    updates: Partial<Omit<ReviewType, 'id' | 'createdAt' | 'userId' | 'userName'>>
): Promise<ReviewType | undefined> {
    try {
        await connectToDatabase();
        const review = await Review.findOneAndUpdate(
            { id },
            { $set: updates },
            { new: true }
        ).lean();
        return review as ReviewType | undefined;
    } catch (error) {
        console.error(`Error updating review ${id}:`, error);
        throw error;
    }
}

export async function deleteReview(id: string): Promise<boolean> {
    try {
        await connectToDatabase();
        const result = await Review.deleteOne({ id });
        return result.deletedCount > 0;
    } catch (error) {
        console.error(`Error deleting review ${id}:`, error);
        throw error;
    }
}

// ============ ORDERS ============

export async function getOrders(): Promise<OrderType[]> {
    try {
        await connectToDatabase();
        const orders = await Order.find().lean();
        return orders as OrderType[];
    } catch (error) {
        console.error('Error fetching orders:', error);
        throw error;
    }
}

export async function getOrderById(id: string): Promise<OrderType | undefined> {
    try {
        await connectToDatabase();
        const order = await Order.findOne({ id }).lean();
        return order as OrderType | undefined;
    } catch (error) {
        console.error(`Error fetching order ${id}:`, error);
        throw error;
    }
}

export async function getOrdersByUserId(userId: string): Promise<OrderType[]> {
    try {
        await connectToDatabase();
        const orders = await Order.find({ userId }).lean();
        return orders as OrderType[];
    } catch (error) {
        console.error(`Error fetching orders for user ${userId}:`, error);
        throw error;
    }
}

export async function createOrder(
    newOrder: Omit<OrderType, 'id' | 'createdAt' | 'status'>
): Promise<OrderType> {
    try {
        await connectToDatabase();
        const order = new Order({
            id: `order-${Date.now()}`,
            createdAt: new Date().toISOString(),
            status: 'pending',
            ...newOrder,
        });
        await order.save();
        return toPlainObject<OrderType>(order);
    } catch (error) {
        console.error('Error creating order:', error);
        throw error;
    }
}

export async function updateOrder(
    id: string,
    updates: Partial<Omit<OrderType, 'id' | 'createdAt' | 'userId'>>
): Promise<OrderType | undefined> {
    try {
        await connectToDatabase();
        const order = await Order.findOneAndUpdate(
            { id },
            { $set: updates },
            { new: true }
        ).lean();
        return order as OrderType | undefined;
    } catch (error) {
        console.error(`Error updating order ${id}:`, error);
        throw error;
    }
}

export async function deleteOrder(id: string): Promise<boolean> {
    try {
        await connectToDatabase();
        const result = await Order.deleteOne({ id });
        return result.deletedCount > 0;
    } catch (error) {
        console.error(`Error deleting order ${id}:`, error);
        throw error;
    }
}
