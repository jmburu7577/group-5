'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, Product } from '@/lib/data';
import { getProductById } from '@/lib/data';

interface CartContextType {
    cartItems: CartItem[];
    addToCart: (productId: string, quantity?: number) => void;
    removeFromCart: (productId: string) => void;
    updateQuantity: (productId: string, quantity: number) => void;
    clearCart: () => void;
    isInCart: (productId: string) => boolean;
    getCartItemQuantity: (productId: string) => number;
    cartCount: number;
    cartTotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};

interface CartProviderProps {
    children: React.ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [cartTotal, setCartTotal] = useState<number>(0);

    // Load cart from localStorage on mount
    useEffect(() => {
        const savedCart = localStorage.getItem('handcrafted-haven-cart');
        if (savedCart) {
            try {
                setCartItems(JSON.parse(savedCart));
            } catch (error) {
                console.error('Error loading cart from localStorage:', error);
            }
        }
    }, []);

    // Save cart to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('handcrafted-haven-cart', JSON.stringify(cartItems));
    }, [cartItems]);

    // Calculate cart total whenever cart items change
    useEffect(() => {
        const total = cartItems.reduce((sum, item) => {
            const product = getProductById(item.productId);
            return sum + (product ? product.price * item.quantity : 0);
        }, 0);
        setCartTotal(total);
    }, [cartItems]);

    const addToCart = (productId: string, quantity: number = 1) => {
        setCartItems(prev => {
            const existingItemIndex = prev.findIndex(item => item.productId === productId);
            
            if (existingItemIndex >= 0) {
                // Item already exists, update quantity
                const updatedItems = [...prev];
                updatedItems[existingItemIndex] = {
                    ...updatedItems[existingItemIndex],
                    quantity: updatedItems[existingItemIndex].quantity + quantity
                };
                return updatedItems;
            } else {
                // Item doesn't exist, add new item
                return [...prev, {
                    productId,
                    quantity,
                    addedAt: new Date().toISOString()
                }];
            }
        });
    };

    const removeFromCart = (productId: string) => {
        setCartItems(prev => prev.filter(item => item.productId !== productId));
    };

    const updateQuantity = (productId: string, quantity: number) => {
        if (quantity <= 0) {
            removeFromCart(productId);
            return;
        }

        setCartItems(prev => {
            return prev.map(item => {
                if (item.productId === productId) {
                    return { ...item, quantity };
                }
                return item;
            });
        });
    };

    const clearCart = () => {
        setCartItems([]);
    };

    const isInCart = (productId: string) => {
        return cartItems.some(item => item.productId === productId);
    };

    const getCartItemQuantity = (productId: string) => {
        const item = cartItems.find(item => item.productId === productId);
        return item ? item.quantity : 0;
    };

    const value: CartContextType = {
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isInCart,
        getCartItemQuantity,
        cartCount: cartItems.reduce((count, item) => count + item.quantity, 0),
        cartTotal
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};