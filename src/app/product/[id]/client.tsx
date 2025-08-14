'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/ui/navbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

type ProductClientProps = {
  id: string;
};

export default function ProductClient({ id }: ProductClientProps) {
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <div className="container mx-auto px-4 py-8">
      <Navbar />
      <div className="my-8">
        <Link href="/">
          <Button variant="outline">← Back to Home</Button>
        </Link>
      </div>
      <Card>
        <CardContent className="p-6">
          <h1 className="text-3xl font-bold mb-4">Product ID: {id}</h1>
          {isLoading ? (
            <p>Loading product details...</p>
          ) : (
            <p className="text-gray-600 mb-4">
              This is a client component that would fetch and display product data.
              In a real implementation, you would fetch product data from an API.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}