import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Rating } from '@/components/ui/rating';
import { Navbar } from '@/components/ui/navbar';
import { featuredArtisans, latestProducts, categories } from '@/lib/data';

export default function Home() {
  const getArtisanName = (artisanId: string) => {
    const artisan = featuredArtisans.find(a => a.id === artisanId);
    return artisan?.name || 'Unknown Artisan';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
      {/* Navigation Header */}
      <Navbar />

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/hero-background.jpg')] bg-cover bg-center opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-orange-100/70 to-amber-100/70"></div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center px-4 py-2 bg-orange-100 text-orange-800 rounded-full text-sm font-medium mb-6 animate-fade-in">
              ✨ Discover Unique Handcrafted Treasures
            </div>
            <h1 className="text-5xl lg:text-7xl font-bold font-display text-gray-900 mb-6 animate-fade-in">
              Where Art Meets
              <span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent block">
                Craftsmanship
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed animate-fade-in">
              Connect with talented artisans and discover one-of-a-kind handmade products that tell a story.
              Every piece is crafted with passion and attention to detail.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
              <Link href="/shop">
                <Button size="lg" className="text-lg px-8 py-4">
                  Start Shopping
                  <span className="ml-2">→</span>
                </Button>
              </Link>
              <a href="#artisans-section">
                <Button variant="outline" size="lg" className="text-lg px-8 py-4">
                  Meet Our Artisans
                </Button>
              </a>
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-orange-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-amber-200 rounded-full opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-yellow-200 rounded-full opacity-20 animate-pulse delay-500"></div>
      </section>

      {/* Featured Categories */}
      <section className="py-16 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold font-display text-gray-900 mb-4">
              Shop by Category
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explore our curated collection of handcrafted items across various categories
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category, index) => (
              <Link key={category} href={`/shop?category=${category}`}>
                <Card className="hover-lift cursor-pointer group animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-100 to-amber-100 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                      <span className="text-2xl">
                        {category === 'Jewelry' && '💎'}
                        {category === 'Pottery' && '🏺'}
                        {category === 'Textiles' && '🧵'}
                        {category === 'Woodwork' && '🪵'}
                        {category === 'Painting' && '🎨'}
                        {category === 'Sculpture' && '🗿'}
                      </span>
                    </div>
                    <h3 className="font-semibold text-gray-900 group-hover:text-orange-600 transition-colors">
                      {category}
                    </h3>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Artisans */}
      <section id="artisans-section" className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold font-display text-gray-900 mb-4">
              Meet Our Featured Artisans
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover the talented creators behind our beautiful handcrafted items
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredArtisans.map((artisan, index) => (
              <Link key={artisan.id} href={`/sellers/${artisan.id}`}>
                <Card className="hover-lift cursor-pointer group animate-fade-in" style={{ animationDelay: `${index * 150}ms` }}>
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-orange-200 to-amber-200 rounded-full flex items-center justify-center text-2xl font-bold text-orange-700">
                        {artisan.name.charAt(0)}
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 group-hover:text-orange-600 transition-colors">
                          {artisan.name}
                        </h3>
                        <p className="text-orange-600 font-medium">{artisan.specialty}</p>
                      </div>
                    </div>
                    <p className="text-gray-600 mb-4 line-clamp-2">{artisan.description}</p>
                    <div className="flex items-center justify-between">
                      <Rating rating={artisan.rating} totalReviews={artisan.totalReviews} size="sm" />
                      <div className="flex items-center space-x-2">
                        {artisan.verified && (
                          <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full font-medium">
                            ✓ Verified
                          </span>
                        )}
                        <span className="text-sm text-gray-500">{artisan.yearsExperience}+ years</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Products */}
      <section className="py-16 bg-gradient-to-r from-orange-50 to-amber-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold font-display text-gray-900 mb-4">
              Latest Handcrafted Items
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Fresh from our artisans' workshops - discover the newest additions to our collection
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {latestProducts.map((product, index) => (
              <Card key={product.id} className="hover-lift cursor-pointer group animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                <CardContent className="p-0">
                  <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-t-xl flex items-center justify-center text-gray-500 mb-4">
                    Product Image
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-orange-600 transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">
                      by {getArtisanName(product.artisanId)}
                    </p>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-2xl font-bold text-green-600">
                        ${product.price.toFixed(2)}
                      </span>
                      <Rating rating={product.rating} totalReviews={product.totalReviews} size="sm" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full font-medium">
                        {product.category}
                      </span>
                      <span className="text-xs text-green-600 font-medium">
                        {product.stockQuantity} in stock
                      </span>
                    </div>
                    <Button className="w-full mt-3" size="sm">
                      Add to Cart
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/shop">
              <Button size="lg" variant="outline">
                View All Products
                <span className="ml-2">→</span>
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold font-display text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Your journey to finding unique handcrafted treasures in three simple steps
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'Discover',
                description: 'Browse through our curated collection of unique handcrafted items from verified artisans worldwide.',
                icon: '🔍'
              },
              {
                step: '02',
                title: 'Connect',
                description: 'Learn about the artisans, their stories, and the craftsmanship behind each beautiful piece.',
                icon: '🤝'
              },
              {
                step: '03',
                title: 'Acquire',
                description: 'Purchase directly from creators and become part of a community that values authentic craftsmanship.',
                icon: '🛍️'
              }
            ].map((item, index) => (
              <Card key={index} className="text-center hover-lift animate-fade-in" style={{ animationDelay: `${index * 200}ms` }}>
                <CardContent className="p-8">
                  <div className="text-6xl mb-4">{item.icon}</div>
                  <div className="text-sm font-bold text-orange-500 mb-2">STEP {item.step}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{item.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-orange-500 to-amber-500 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold font-display mb-4">
            Are You an Artisan?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Join our growing community of talented creators and showcase your unique handcrafted items to a global audience.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="outline" className="bg-white text-orange-600 border-white hover:bg-orange-50">
              Become a Seller
            </Button>
            <Button size="lg" variant="ghost" className="text-white border-white hover:bg-white/10">
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-amber-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">H</span>
                </div>
                <span className="text-xl font-bold font-display">Handcrafted Haven</span>
              </div>
              <p className="text-gray-400 mb-4">
                Connecting artisans with craft enthusiasts worldwide through authentic, handmade treasures.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Shop</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/shop" className="hover:text-white transition-colors">All Products</Link></li>
                <li><Link href="/shop?category=Jewelry" className="hover:text-white transition-colors">Jewelry</Link></li>
                <li><Link href="/shop?category=Pottery" className="hover:text-white transition-colors">Pottery</Link></li>
                <li><Link href="/shop?category=Textiles" className="hover:text-white transition-colors">Textiles</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Shipping Info</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Returns</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Newsletter</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Instagram</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Facebook</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Twitter</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Handcrafted Haven. All rights reserved. Made with ❤️ for artisans worldwide.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}