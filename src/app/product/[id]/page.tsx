import ProductClient from './client';

type ProductProps = {
  params: {
    id: string;
  };
};

// Using an async function to make the component a Server Component
export default async function ProductPage({ params }: ProductProps) {
  // This makes params compatible with PageProps which expects a Promise
  return <ProductClient id={params.id} />;
}