'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Navbar } from '@/components/ui/navbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/contexts/AuthContext';

type Product = {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  imageUrl: string;
  stock: number;
  artisanId: string;
};

const categories = [
  'Pottery',
  'Jewelry',
  'Textiles',
  'Woodworking',
  'Glasswork',
  'Leathercraft',
  'Paper Crafts',
  'Metal Work',
  'Other'
];

export default function ProductsPage() {
  const { user, isAuthenticated, isLoading: authLoading } = useAuth();
  const router = useRouter();
  
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Partial<Product>>({
    name: '',
    price: 0,
    description: '',
    category: '',
    imageUrl: '',
    stock: 0
  });

  // Mock function to fetch products
  const fetchProducts = async () => {
    setIsLoading(true);
    // In a real app, this would be an API call
    // For demo purposes, we'll use mock data
    const mockProducts: Product[] = [
      {
        id: '1',
        name: 'Handcrafted Ceramic Mug',
        price: 24.99,
        description: 'A beautiful handcrafted ceramic mug, perfect for your morning coffee or tea.',
        category: 'Pottery',
        imageUrl: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?q=80&w=2070&auto=format&fit=crop',
        stock: 10,
        artisanId: user?.id || ''
      },
      {
        id: '2',
        name: 'Wooden Cutting Board',
        price: 49.99,
        description: 'Handmade wooden cutting board crafted from sustainable hardwood.',
        category: 'Woodworking',
        imageUrl: 'https://images.unsplash.com/photo-1541976590-713941681591?q=80&w=2070&auto=format&fit=crop',
        stock: 5,
        artisanId: user?.id || ''
      }
    ];
    
    setProducts(mockProducts);
    setIsLoading(false);
  };

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/login');
      return;
    }
    
    if (isAuthenticated && user && !user.isArtisan) {
      router.push('/');
      return;
    }
    
    if (isAuthenticated && user?.isArtisan) {
      fetchProducts();
    }
  }, [authLoading, isAuthenticated, user, router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCurrentProduct(prev => ({
      ...prev,
      [name]: name === 'price' || name === 'stock' ? parseFloat(value) : value
    }));
  };

  const handleSelectChange = (value: string) => {
    setCurrentProduct(prev => ({
      ...prev,
      category: value
    }));
  };

  const handleAddProduct = () => {
    setIsEditing(true);
    setCurrentProduct({
      name: '',
      price: 0,
      description: '',
      category: '',
      imageUrl: '',
      stock: 0
    });
  };

  const handleEditProduct = (product: Product) => {
    setIsEditing(true);
    setCurrentProduct(product);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (currentProduct.id) {
      // Update existing product
      setProducts(prev => 
        prev.map(p => p.id === currentProduct.id ? { ...p, ...currentProduct } as Product : p)
      );
    } else {
      // Add new product
      const newProduct: Product = {
        ...currentProduct as Omit<Product, 'id'>,
        id: Date.now().toString(),
        artisanId: user?.id || ''
      } as Product;
      
      setProducts(prev => [...prev, newProduct]);
    }
    
    setIsEditing(false);
    setCurrentProduct({
      name: '',
      price: 0,
      description: '',
      category: '',
      imageUrl: '',
      stock: 0
    });
  };

  const handleDeleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  if (authLoading) {
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
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Product Management</h1>
          {!isEditing && (
            <Button onClick={handleAddProduct}>Add New Product</Button>
          )}
        </div>
        
        {isEditing ? (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>{currentProduct.id ? 'Edit Product' : 'Add New Product'}</CardTitle>
              <CardDescription>
                {currentProduct.id ? 'Update your product details' : 'Fill in the details for your new product'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Product Name</Label>
                    <Input 
                      id="name" 
                      name="name"
                      value={currentProduct.name} 
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="price">Price ($)</Label>
                    <Input 
                      id="price" 
                      name="price"
                      type="number" 
                      step="0.01"
                      min="0"
                      value={currentProduct.price} 
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select 
                      value={currentProduct.category} 
                      onValueChange={handleSelectChange}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map(category => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="stock">Stock</Label>
                    <Input 
                      id="stock" 
                      name="stock"
                      type="number" 
                      min="0"
                      value={currentProduct.stock} 
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="imageUrl">Image URL</Label>
                  <Input 
                    id="imageUrl" 
                    name="imageUrl"
                    value={currentProduct.imageUrl} 
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea 
                    id="description" 
                    name="description"
                    rows={4}
                    value={currentProduct.description} 
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="flex justify-end space-x-2">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setIsEditing(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit">
                    {currentProduct.id ? 'Update Product' : 'Add Product'}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {isLoading ? (
              <p>Loading products...</p>
            ) : products.length === 0 ? (
              <p>No products found. Add your first product!</p>
            ) : (
              products.map(product => (
                <Card key={product.id} className="overflow-hidden">
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={product.imageUrl} 
                      alt={product.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle>{product.name}</CardTitle>
                    <CardDescription>${product.price.toFixed(2)} | Stock: {product.stock}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4">{product.description}</p>
                    <div className="flex justify-between">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleEditProduct(product)}
                      >
                        Edit
                      </Button>
                      <Button 
                        variant="destructive" 
                        size="sm"
                        onClick={() => handleDeleteProduct(product.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}