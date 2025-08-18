import Banner from "@/src/components/Banner";
import { getFeaturedProducts } from "@/src/sanity/product-util";
import dynamic from 'next/dynamic'; // 1. Import dynamic

// 2. Dynamically import FeaturedRoom with SSR disabled
const FeaturedRoom = dynamic(
  () => import('@/src/components/FeaturedRoom'),
  { ssr: false }
);

export const revalidate = 10;

export default async function Home() {
  const featuredRoom = await getFeaturedProducts();

  return (
    <div>
      <Banner />

      <div className="max-w-7xl mx-auto flex flex-col items-center justify-center mt-10 space-y-4">
        <h1 className="text-4xl font-bold text-amber-400 text-center">
          Produits populaires
        </h1>
      </div>

      {/* 3. Use the dynamic component as usual */}
      <FeaturedRoom featuredRoom={featuredRoom} />
    </div>
  );
}