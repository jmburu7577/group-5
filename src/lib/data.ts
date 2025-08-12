// Type definitions
export interface Artisan {
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

export interface Product {
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

export interface Review {
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

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  wishlist: string[];
  cart: CartItem[];
  orders: Order[];
  reviews: string[];
  preferences: {
    categories: string[];
    priceRange: { min: number; max: number };
    notifications: boolean;
  };
}

export interface CartItem {
  productId: string;
  quantity: number;
  addedAt: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: string;
  shippingAddress: Address;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export const featuredArtisans: Artisan[] = [
  {
    id: 'artisan1',
    name: 'Elena Rodriguez',
    specialty: 'Jewelry',
    description: 'Passionate jewelry maker creating unique, handcrafted pieces inspired by nature and traditional techniques.',
    image: '/images/artisan1.jpg',
    location: 'Santa Fe, NM',
    yearsExperience: 8,
    rating: 4.8,
    totalReviews: 127,
    verified: true,
    joinedDate: '2020-03-15',
    socialLinks: {
      website: 'https://elenajewelry.com',
      instagram: '@elena_handmade_jewelry'
    }
  },
  {
    id: 'artisan2',
    name: 'Marcus Chen',
    specialty: 'Pottery',
    description: 'Master potter known for intricate designs and durable ceramics, blending Eastern and Western techniques.',
    image: '/images/artisan2.jpg',
    location: 'Portland, OR',
    yearsExperience: 12,
    rating: 4.9,
    totalReviews: 89,
    verified: true,
    joinedDate: '2019-08-22',
    socialLinks: {
      website: 'https://chenceramics.com',
      instagram: '@marcus_pottery'
    }
  },
  {
    id: 'artisan3',
    name: 'Sarah Thompson',
    specialty: 'Textiles',
    description: 'Textile artist weaving stories into every fabric, specializing in sustainable and organic materials.',
    image: '/images/artisan3.jpg',
    location: 'Asheville, NC',
    yearsExperience: 6,
    rating: 4.7,
    totalReviews: 156,
    verified: true,
    joinedDate: '2021-01-10',
    socialLinks: {
      website: 'https://sarahtextiles.com',
      instagram: '@sarah_weaves'
    }
  },
  {
    id: 'artisan4',
    name: 'David Woodson',
    specialty: 'Woodwork',
    description: 'Master woodworker crafting beautiful furniture and decorative pieces using traditional joinery techniques.',
    image: '/images/artisan4.jpg',
    location: 'Burlington, VT',
    yearsExperience: 15,
    rating: 4.9,
    totalReviews: 112,
    verified: true,
    joinedDate: '2019-05-18',
    socialLinks: {
      website: 'https://woodsoncraft.com',
      instagram: '@david_woodcraft'
    }
  },
  {
    id: 'artisan5',
    name: 'Amara Okafor',
    specialty: 'Painting',
    description: 'Contemporary artist creating vibrant paintings inspired by her Nigerian heritage and natural landscapes.',
    image: '/images/artisan5.jpg',
    location: 'Austin, TX',
    yearsExperience: 9,
    rating: 4.8,
    totalReviews: 78,
    verified: true,
    joinedDate: '2020-11-05',
    socialLinks: {
      website: 'https://amaraart.com',
      instagram: '@amara_paints'
    }
  },
  {
    id: 'artisan6',
    name: 'Miguel Sanchez',
    specialty: 'Sculpture',
    description: 'Innovative sculptor working with recycled materials to create thought-provoking pieces that challenge perceptions.',
    image: '/images/artisan6.jpg',
    location: 'Tucson, AZ',
    yearsExperience: 11,
    rating: 4.7,
    totalReviews: 93,
    verified: true,
    joinedDate: '2021-03-22',
    socialLinks: {
      website: 'https://miguelsculpture.com',
      instagram: '@miguel_creates'
    }
  },
];

export const latestProducts: Product[] = [
  {
    id: 'product1',
    name: 'Handcrafted Silver Necklace',
    price: 75.00,
    category: 'Jewelry',
    image: '/images/product1.jpg',
    artisanId: 'artisan1',
    description: 'Elegant sterling silver necklace with intricate Celtic knot design. Each piece is hand-forged and polished to perfection.',
    materials: ['Sterling Silver', 'Natural Gemstones'],
    dimensions: '18 inches length',
    weight: '15g',
    inStock: true,
    stockQuantity: 5,
    rating: 4.9,
    totalReviews: 23,
    tags: ['handmade', 'silver', 'celtic', 'elegant', 'gift'],
    createdAt: '2024-01-15',
    images: ['/images/product1.jpg', '/images/product1-2.jpg', '/images/product1-3.jpg']
  },
  {
    id: 'product2',
    name: 'Ceramic Coffee Mug Set',
    price: 45.00,
    category: 'Pottery',
    image: '/images/product2.jpg',
    artisanId: 'artisan2',
    description: 'Set of two handthrown ceramic mugs with unique glazing. Perfect for your morning coffee ritual.',
    materials: ['Stoneware Clay', 'Food-safe Glaze'],
    dimensions: '4" height x 3.5" diameter',
    weight: '300g each',
    inStock: true,
    stockQuantity: 12,
    rating: 4.7,
    totalReviews: 18,
    tags: ['ceramic', 'coffee', 'set', 'kitchen', 'functional'],
    createdAt: '2024-02-01',
    images: ['/images/product2.jpg', '/images/product2-2.jpg']
  },
  {
    id: 'product3',
    name: 'Woven Wall Hanging',
    price: 120.00,
    category: 'Textiles',
    image: '/images/product3.jpg',
    artisanId: 'artisan3',
    description: 'Beautiful macrame wall hanging made with organic cotton rope. Adds natural texture to any space.',
    materials: ['Organic Cotton Rope', 'Wooden Dowel'],
    dimensions: '24" width x 36" length',
    weight: '500g',
    inStock: true,
    stockQuantity: 8,
    rating: 4.8,
    totalReviews: 31,
    tags: ['macrame', 'wall-art', 'boho', 'organic', 'home-decor'],
    createdAt: '2024-01-28',
    images: ['/images/product3.jpg', '/images/product3-2.jpg', '/images/product3-3.jpg']
  },
  {
    id: 'product4',
    name: 'Wooden Carved Bowl',
    price: 60.00,
    category: 'Woodwork',
    image: '/images/product4.jpg',
    artisanId: 'artisan1',
    description: 'Hand-carved wooden bowl made from sustainable cherry wood. Perfect for serving or decoration.',
    materials: ['Cherry Wood', 'Food-safe Finish'],
    dimensions: '8" diameter x 3" height',
    weight: '400g',
    inStock: true,
    stockQuantity: 6,
    rating: 4.6,
    totalReviews: 14,
    tags: ['wood', 'carved', 'sustainable', 'kitchen', 'serving'],
    createdAt: '2024-02-10',
    images: ['/images/product4.jpg', '/images/product4-2.jpg']
  },
];

export const allProducts: Product[] = [
  ...latestProducts,
  {
    id: 'product5',
    name: 'Hand-painted Silk Scarf',
    price: 90.00,
    category: 'Textiles',
    image: '/images/product5.jpg',
    artisanId: 'artisan3',
    description: 'Luxurious silk scarf with hand-painted floral motifs. Each scarf is unique and one-of-a-kind.',
    materials: ['100% Silk', 'Non-toxic Fabric Paint'],
    dimensions: '60" x 20"',
    weight: '50g',
    inStock: true,
    stockQuantity: 4,
    rating: 4.9,
    totalReviews: 12,
    tags: ['silk', 'hand-painted', 'luxury', 'fashion', 'unique'],
    createdAt: '2024-02-05',
    images: ['/images/product5.jpg', '/images/product5-2.jpg']
  },
  {
    id: 'product6',
    name: 'Sculpted Clay Figurine',
    price: 55.00,
    category: 'Sculpture',
    image: '/images/product6.jpg',
    artisanId: 'artisan2',
    description: 'Whimsical clay figurine depicting a forest spirit. Hand-sculpted and fired with care.',
    materials: ['Stoneware Clay', 'Ceramic Glaze'],
    dimensions: '6" height x 4" width',
    weight: '250g',
    inStock: true,
    stockQuantity: 3,
    rating: 4.8,
    totalReviews: 9,
    tags: ['sculpture', 'figurine', 'art', 'ceramic', 'collectible'],
    createdAt: '2024-01-20',
    images: ['/images/product6.jpg', '/images/product6-2.jpg', '/images/product6-3.jpg']
  },
  {
    id: 'product7',
    name: 'Handcrafted Wooden Jewelry Box',
    price: 85.00,
    category: 'Woodwork',
    image: '/images/product7.jpg',
    artisanId: 'artisan4',
    description: 'Elegant wooden jewelry box with intricate inlay work and velvet-lined compartments. Perfect for storing your treasured pieces.',
    materials: ['Walnut Wood', 'Maple Inlay', 'Velvet Lining'],
    dimensions: '10" width x 6" depth x 4" height',
    weight: '650g',
    inStock: true,
    stockQuantity: 7,
    rating: 4.9,
    totalReviews: 15,
    tags: ['woodwork', 'jewelry-box', 'handcrafted', 'gift', 'storage'],
    createdAt: '2024-02-15',
    images: ['/images/product7.jpg', '/images/product7-2.jpg']
  },
  {
    id: 'product8',
    name: 'Abstract Landscape Painting',
    price: 180.00,
    category: 'Painting',
    image: '/images/product8.jpg',
    artisanId: 'artisan5',
    description: 'Vibrant abstract landscape painting inspired by African savannas. Acrylic on canvas with textured elements.',
    materials: ['Acrylic Paint', 'Canvas', 'Texture Medium'],
    dimensions: '24" x 36"',
    weight: '1.2kg',
    inStock: true,
    stockQuantity: 1,
    rating: 5.0,
    totalReviews: 7,
    tags: ['painting', 'abstract', 'landscape', 'wall-art', 'colorful'],
    createdAt: '2024-02-20',
    images: ['/images/product8.jpg', '/images/product8-2.jpg']
  },
  {
    id: 'product9',
    name: 'Recycled Metal Sculpture',
    price: 150.00,
    category: 'Sculpture',
    image: '/images/product9.jpg',
    artisanId: 'artisan6',
    description: 'Contemporary sculpture crafted from recycled metal parts. Each piece tells a story of transformation and renewal.',
    materials: ['Recycled Metal', 'Steel Wire', 'Patina Finish'],
    dimensions: '12" height x 8" width x 8" depth',
    weight: '1.5kg',
    inStock: true,
    stockQuantity: 2,
    rating: 4.8,
    totalReviews: 11,
    tags: ['sculpture', 'recycled', 'metal', 'contemporary', 'sustainable'],
    createdAt: '2024-02-18',
    images: ['/images/product9.jpg', '/images/product9-2.jpg']
  },
  {
    id: 'product10',
    name: 'Handwoven Wool Tapestry',
    price: 220.00,
    category: 'Textiles',
    image: '/images/product10.jpg',
    artisanId: 'artisan3',
    description: 'Intricate handwoven tapestry made with naturally dyed wool. A stunning statement piece for any wall.',
    materials: ['Wool', 'Natural Dyes', 'Cotton Warp'],
    dimensions: '36" x 48"',
    weight: '1.8kg',
    inStock: true,
    stockQuantity: 3,
    rating: 4.9,
    totalReviews: 14,
    tags: ['tapestry', 'weaving', 'wool', 'wall-hanging', 'handwoven'],
    createdAt: '2024-02-12',
    images: ['/images/product10.jpg', '/images/product10-2.jpg']
  },
];

export const getProductById = (id: string) => {
  return allProducts.find(product => product.id === id);
};

export const getArtisanById = (id: string) => {
  return featuredArtisans.find(artisan => artisan.id === id);
};

export const getProductsByArtisanId = (artisanId: string) => {
  return allProducts.filter(product => product.artisanId === artisanId);
};

export const categories = [
  'Jewelry',
  'Pottery',
  'Textiles',
  'Woodwork',
  'Painting',
  'Sculpture',
];

// Sample Reviews Data
export const reviews: Review[] = [
  {
    id: 'review1',
    productId: 'product1',
    userId: 'user1',
    userName: 'Jessica Miller',
    userAvatar: '/images/users/user1.jpg',
    rating: 5,
    title: 'Absolutely Beautiful!',
    comment: 'This necklace exceeded my expectations. The craftsmanship is incredible and it arrived beautifully packaged. I get compliments every time I wear it!',
    images: ['/images/reviews/review1-1.jpg'],
    helpful: 12,
    verified: true,
    createdAt: '2024-02-20',
    response: {
      message: 'Thank you so much Jessica! It means the world to me that you love the piece. I put a lot of care into each necklace.',
      createdAt: '2024-02-21'
    }
  },
  {
    id: 'review2',
    productId: 'product1',
    userId: 'user2',
    userName: 'Michael Chen',
    rating: 4,
    title: 'Great quality, fast shipping',
    comment: 'Bought this as a gift for my wife. She loves it! The silver is high quality and the design is unique.',
    helpful: 8,
    verified: true,
    createdAt: '2024-02-15'
  },
  {
    id: 'review3',
    productId: 'product2',
    userId: 'user3',
    userName: 'Sarah Johnson',
    rating: 5,
    title: 'Perfect for my morning coffee',
    comment: 'These mugs are the perfect size and the glaze is gorgeous. They feel substantial in your hands and keep coffee warm.',
    helpful: 15,
    verified: true,
    createdAt: '2024-02-18'
  },
  {
    id: 'review4',
    productId: 'product3',
    userId: 'user4',
    userName: 'Emma Davis',
    rating: 5,
    title: 'Transforms my living room',
    comment: 'This wall hanging is exactly what my space needed. The quality is amazing and it adds such a cozy, bohemian vibe.',
    images: ['/images/reviews/review4-1.jpg', '/images/reviews/review4-2.jpg'],
    helpful: 20,
    verified: true,
    createdAt: '2024-02-12'
  },
  {
    id: 'review5',
    artisanId: 'artisan1',
    userId: 'user5',
    userName: 'David Wilson',
    rating: 5,
    title: 'Amazing artisan to work with',
    comment: 'Elena was wonderful to work with on a custom piece. Great communication and the final result was perfect!',
    helpful: 7,
    verified: true,
    createdAt: '2024-02-10'
  }
];

// Sample User Data (for wishlist and cart functionality)
export const sampleUser: User = {
  id: 'user1',
  name: 'Jessica Miller',
  email: 'jessica@example.com',
  avatar: '/images/users/user1.jpg',
  wishlist: ['product2', 'product5'],
  cart: [
    { productId: 'product1', quantity: 1, addedAt: '2024-02-25' }
  ],
  orders: [],
  reviews: ['review1'],
  preferences: {
    categories: ['Jewelry', 'Textiles'],
    priceRange: { min: 0, max: 200 },
    notifications: true
  }
};

// Enhanced helper functions
export const getReviewsByProductId = (productId: string): Review[] => {
  return reviews.filter(review => review.productId === productId);
};

export const getReviewsByArtisanId = (artisanId: string): Review[] => {
  return reviews.filter(review => review.artisanId === artisanId);
};

export const getAverageRating = (productId: string): number => {
  const productReviews = getReviewsByProductId(productId);
  if (productReviews.length === 0) return 0;
  const sum = productReviews.reduce((acc, review) => acc + review.rating, 0);
  return Math.round((sum / productReviews.length) * 10) / 10;
};

export const searchProducts = (query: string, products: Product[] = allProducts): Product[] => {
  const lowercaseQuery = query.toLowerCase();
  return products.filter(product =>
    product.name.toLowerCase().includes(lowercaseQuery) ||
    product.description.toLowerCase().includes(lowercaseQuery) ||
    product.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery)) ||
    product.materials.some(material => material.toLowerCase().includes(lowercaseQuery))
  );
};

export const filterProductsByCategory = (category: string, products: Product[] = allProducts): Product[] => {
  if (category === 'All') return products;
  return products.filter(product => product.category === category);
};

export const filterProductsByPriceRange = (min: number, max: number, products: Product[] = allProducts): Product[] => {
  return products.filter(product => product.price >= min && product.price <= max);
};

export const sortProducts = (products: Product[], sortBy: string): Product[] => {
  const sorted = [...products];
  switch (sortBy) {
    case 'price-low':
      return sorted.sort((a, b) => a.price - b.price);
    case 'price-high':
      return sorted.sort((a, b) => b.price - a.price);
    case 'rating':
      return sorted.sort((a, b) => b.rating - a.rating);
    case 'newest':
      return sorted.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    case 'name':
    default:
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
  }
};

// Wishlist functions
export const addToWishlist = (userId: string, productId: string): void => {
  // In a real app, this would make an API call
  console.log(`Adding product ${productId} to wishlist for user ${userId}`);
};

export const removeFromWishlist = (userId: string, productId: string): void => {
  // In a real app, this would make an API call
  console.log(`Removing product ${productId} from wishlist for user ${userId}`);
};

export const isInWishlist = (userId: string, productId: string): boolean => {
  // In a real app, this would check the user's actual wishlist
  return sampleUser.wishlist.includes(productId);
};
