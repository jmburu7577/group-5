export const featuredArtisans = [
  {
    id: 'artisan1',
    name: 'Artisan Name 1',
    specialty: 'Jewelry',
    description: 'Passionate jewelry maker creating unique, handcrafted pieces.',
    image: '/images/artisan1.jpg',
  },
  {
    id: 'artisan2',
    name: 'Artisan Name 2',
    specialty: 'Pottery',
    description: 'Master potter known for intricate designs and durable ceramics.',
    image: '/images/artisan2.jpg',
  },
  {
    id: 'artisan3',
    name: 'Artisan Name 3',
    specialty: 'Textiles',
    description: 'Textile artist weaving stories into every fabric.',
    image: '/images/artisan3.jpg',
  },
];

export const latestProducts = [
  {
    id: 'product1',
    name: 'Handcrafted Silver Necklace',
    price: 75.00,
    category: 'Jewelry',
    image: '/images/product1.jpg',
    artisanId: 'artisan1',
  },
  {
    id: 'product2',
    name: 'Ceramic Coffee Mug Set',
    price: 45.00,
    category: 'Pottery',
    image: '/images/product2.jpg',
    artisanId: 'artisan2',
  },
  {
    id: 'product3',
    name: 'Woven Wall Hanging',
    price: 120.00,
    category: 'Textiles',
    image: '/images/product3.jpg',
    artisanId: 'artisan3',
  },
  {
    id: 'product4',
    name: 'Wooden Carved Bowl',
    price: 60.00,
    category: 'Woodwork',
    image: '/images/product4.jpg',
    artisanId: 'artisan1',
  },
];

export const allProducts = [
  ...latestProducts,
  {
    id: 'product5',
    name: 'Hand-painted Silk Scarf',
    price: 90.00,
    category: 'Textiles',
    image: '/images/product5.jpg',
    artisanId: 'artisan3',
  },
  {
    id: 'product6',
    name: 'Sculpted Clay Figurine',
    price: 55.00,
    category: 'Sculpture',
    image: '/images/product6.jpg',
    artisanId: 'artisan2',
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
