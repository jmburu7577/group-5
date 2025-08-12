'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Navbar } from '@/components/ui/navbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';

export default function DashboardPage() {
  const { user, isAuthenticated, isLoading, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isLoading, isAuthenticated, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
        <Navbar />
        <div className="container mx-auto px-4 py-12 text-center">
          Loading...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Account Information</CardTitle>
              <CardDescription>Your personal details</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div>
                  <span className="font-medium">Name:</span> {user?.name}
                </div>
                <div>
                  <span className="font-medium">Email:</span> {user?.email}
                </div>
                <div>
                  <span className="font-medium">Account Type:</span> {user?.isArtisan ? 'Artisan' : 'Customer'}
                </div>
                <div>
                  <span className="font-medium">Member Since:</span> {new Date().toLocaleDateString()}
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" onClick={() => router.push('/dashboard/profile')}>
                Edit Profile
              </Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Activity Summary</CardTitle>
              <CardDescription>Your recent activity</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div>
                  <span className="font-medium">Orders Placed:</span> 5
                </div>
                <div>
                  <span className="font-medium">Wishlist Items:</span> 3
                </div>
                <div>
                  <span className="font-medium">Reviews Written:</span> 2
                </div>
                {user?.isArtisan && (
                  <div>
                    <span className="font-medium">Products Listed:</span> 2
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" onClick={() => router.push('/dashboard/orders')}>
                View Orders
              </Button>
            </CardFooter>
          </Card>
        </div>
        
        {user?.isArtisan && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Artisan Tools</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Product Management</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Add, edit, and manage your product listings</p>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" onClick={() => router.push('/dashboard/products')}>
                    Manage Products
                  </Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Order Fulfillment</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>View and process customer orders</p>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" onClick={() => router.push('/dashboard/orders/manage')}>
                    Manage Orders
                  </Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Analytics</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>View sales and performance metrics</p>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" onClick={() => router.push('/dashboard/analytics')}>
                    View Analytics
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        )}
        
        <div className="flex justify-center">
          <Button variant="destructive" onClick={logout}>
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
}