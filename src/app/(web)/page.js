import Banner from "@/src/components/Banner";
import { getFeaturedProducts } from "@/src/sanity/product-util";
import dynamic from 'next/dynamic';
export const revalidate = 10;
export const metadata = {
  // 1. Corrected brand name for consistency
  title: "Viet technologie | High-Quality Laptops & Tech in Agadir, Morocco",
  description: "Your one-stop shop for the latest laptops, computer components, and tech gadgets in Morocco. Quality products, 2-month warranty, and delivery across the country.",
  openGraph: {
    // 2. Corrected brand name here as well
    title: "Viet technologie | Laptops & Tech",
    description: "Discover the best deals on high-quality tech in Morocco.",
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        // 3. And here
        alt: 'Viet technologie Store Promotion',
      },
    ],
  },
};

const FeaturedRoom = dynamic(
  () => import('@/src/components/FeaturedRoom')
);



export default async function Home() {
  const featuredRoom = await getFeaturedProducts();

  return (
    <div>
      <Banner />

      <div className="mx-auto flex max-w-7xl flex-col items-center justify-center space-y-4 px-4 pt-10">
        {/* 4. Changed title color from amber to your brand's teal */}
        <h1 className="text-center text-4xl font-bold" style={{ color: '#2DD4BF' }}>
          Produits Populaires
        </h1>
      </div>

      <FeaturedRoom featuredRoom={featuredRoom} />
    </div>
  );
}