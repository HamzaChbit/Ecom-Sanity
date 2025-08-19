import Banner from "@/src/components/Banner";
import { getFeaturedProducts } from "@/src/sanity/product-util";
import dynamic from 'next/dynamic';

export const metadata = {
  title: "DESKTOPPLUS | High-Quality Laptops & Tech in Agadir, Morocco",
  description: "Your one-stop shop for the latest laptops, computer components, and tech gadgets in Morocco. Quality products, 2-month warranty, and delivery across the country.",
  openGraph: {
    title: "DESKTOPPLUS | Laptops & Tech",
    description: "Discover the best deals on high-quality tech in Morocco.",
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'DESKTOPPLUS Store Promotion',
      },
    ],
  },
};

// ✅ FIX: Removed `{ ssr: false }` to enable Server-Side Rendering.
// This is now the default, so you can simplify the import.
const FeaturedRoom = dynamic(
  () => import('@/src/components/FeaturedRoom')
);

export const revalidate = 10;

export default async function Home() {
  const featuredRoom = await getFeaturedProducts();

  return (
    <div>
      <Banner />

      <div className="max-w-7xl mx-auto flex flex-col items-center justify-center mt-10 space-y-4 px-4">
        <h1 className="text-4xl font-bold text-amber-500 text-center">
          Produits populaires
        </h1>
      </div>

      <FeaturedRoom featuredRoom={featuredRoom} />
    </div>
  );
}