'use client';

import React from 'react';
import Link from 'next/link';
import { Trash2, Plus, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Navbar } from '@/components/ui/navbar';
import { useCart } from '@/contexts/CartContext';
import { getProductById } from '@/lib/data';

export default function CartPage() {
    const { cartItems, removeFromCart, updateQuantity, clearCart, cartTotal } = useCart();

    if (cartItems.length === 0) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
                <Navbar />
                <div className="container mx-auto px-4 py-12">
                    <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
                    <div className="bg-gray-50 rounded-lg p-8 text-center">
                        <div className="text-6xl mb-4">🛒</div>
                        <h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
                        <p className="text-gray-600 mb-6">Looks like you haven't added any items to your cart yet.</p>
                        <Link href="/shop">
                            <Button size="lg">Browse Products</Button>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
            <Navbar />
            <div className="container mx-auto px-4 py-12">
                <h1 className="text-3xl font-bold mb-8">Your Cart</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <Card>
                        <CardHeader className="border-b">
                            <div className="flex justify-between items-center">
                                <CardTitle>Cart Items ({cartItems.length})</CardTitle>
                                <Button variant="ghost" size="sm" onClick={clearCart}>
                                    <Trash2 className="w-4 h-4 mr-2" />
                                    Clear Cart
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent className="p-0">
                            <ul className="divide-y">
                                {cartItems.map((item) => {
                                    const product = getProductById(item.productId);
                                    if (!product) return null;

                                    return (
                                        <li key={item.productId} className="p-4 flex flex-col sm:flex-row gap-4">
                                            <div className="w-full sm:w-24 h-24 bg-gray-200 rounded-md flex items-center justify-center">
                                                <span className="text-gray-500">Image</span>
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex flex-col sm:flex-row sm:justify-between">
                                                    <div>
                                                        <h3 className="font-semibold text-lg">{product.name}</h3>
                                                        <p className="text-sm text-gray-500">{product.category}</p>
                                                    </div>
                                                    <div className="text-right mt-2 sm:mt-0">
                                                        <div className="text-lg font-bold text-green-600">
                                                            ${(product.price * item.quantity).toFixed(2)}
                                                        </div>
                                                        <div className="text-sm text-gray-500">
                                                            ${product.price.toFixed(2)} each
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex justify-between items-center mt-4">
                                                    <div className="flex items-center border rounded-md">
                                                        <Button 
                                                            variant="ghost" 
                                                            size="sm" 
                                                            className="h-8 px-2"
                                                            onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                                                            disabled={item.quantity <= 1}
                                                        >
                                                            <Minus className="w-4 h-4" />
                                                        </Button>
                                                        <span className="px-4">{item.quantity}</span>
                                                        <Button 
                                                            variant="ghost" 
                                                            size="sm" 
                                                            className="h-8 px-2"
                                                            onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                                                            disabled={item.quantity >= (product.stockQuantity || 10)}
                                                        >
                                                            <Plus className="w-4 h-4" />
                                                        </Button>
                                                    </div>
                                                    <Button 
                                                        variant="ghost" 
                                                        size="sm" 
                                                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                                                        onClick={() => removeFromCart(item.productId)}
                                                    >
                                                        <Trash2 className="w-4 h-4 mr-1" />
                                                        Remove
                                                    </Button>
                                                </div>
                                            </div>
                                        </li>
                                    );
                                })}
                            </ul>
                        </CardContent>
                    </Card>
                </div>

                <div>
                    <Card>
                        <CardHeader className="border-b">
                            <CardTitle>Order Summary</CardTitle>
                        </CardHeader>
                        <CardContent className="p-4">
                            <div className="space-y-4">
                                <div className="flex justify-between py-2">
                                    <span>Subtotal</span>
                                    <span>${cartTotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between py-2">
                                    <span>Shipping</span>
                                    <span>Calculated at checkout</span>
                                </div>
                                <div className="flex justify-between py-2">
                                    <span>Tax</span>
                                    <span>Calculated at checkout</span>
                                </div>
                                <div className="border-t pt-4 mt-4">
                                    <div className="flex justify-between font-bold text-lg">
                                        <span>Total</span>
                                        <span>${cartTotal.toFixed(2)}</span>
                                    </div>
                                </div>
                                <Button className="w-full mt-4" size="lg">
                                    Proceed to Checkout
                                </Button>
                                <div className="text-center mt-4">
                                    <Link href="/shop" className="text-blue-600 hover:underline">
                                        Continue Shopping
                                    </Link>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    </div>
    );
}