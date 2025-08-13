import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getArtisanById, getProductsByArtisanId } from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/ui/product-card';

interface SellerPageProps {
  params: {
    id: string;
  };
}

export default function SellerPage({ params }: SellerPageProps) {
  const artisan = getArtisanById(params.id);
  const products = getProductsByArtisanId(params.id);

  if (!artisan) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link href="/">
          <Button variant="outline">← Back to Home</Button>
        </Link>
      </div>

      {/* Artisan Profile Header */}
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg p-8 mb-8">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center">
            <span className="text-4xl font-bold text-gray-600">
              {artisan.name.charAt(0)}
            </span>
          </div>
          <div className="text-center md:text-left">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{artisan.name}</h1>
            <p className="text-xl text-amber-600 mb-3">Specialty: {artisan.specialty}</p>
            <p className="text-gray-700 max-w-2xl">{artisan.description}</p>
            <div className="flex flex-wrap gap-2 mt-4">
              <span className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm">
                {artisan.specialty}
              </span>
              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                Verified Artisan
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Products Section */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Products by {artisan.name}
        </h2>

        {products.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product}
                artisanName={artisan.name}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No products available from this artisan yet.</p>
          </div>
        )}
      </section>

      {/* Contact Section */}
      <section className="mt-12 bg-gray-50 rounded-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact {artisan.name}</h2>
        <p className="text-gray-700 mb-6">
          Interested in custom work or have questions about their products? Get in touch!
        </p>
        <div className="flex flex-wrap gap-4">
          <Button>Send Message</Button>
          <Button variant="outline">View Portfolio</Button>
        </div>
      </section>
    </div>
  );
}
