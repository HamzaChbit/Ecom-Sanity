import Banner from "@/src/components/Banner";
import FeaturesBar from "@/src/components/FeaturesBar";
import RightSide from "@/src/components/RightSide";
import { getFeaturedProducts } from "@/src/sanity/product-util";
import dynamic from 'next/dynamic';

// 1. Updated metadata with your brand name
export const metadata = {
  title: "Viet technologie | High-Quality Laptops & Tech in Agadir, Morocco",
  description: "Your one-stop shop for the latest laptops, computer components, and tech gadgets in Morocco. Quality products, 2-month warranty, and delivery across the country.",
  openGraph: {
    title: "Viet technologie | Laptops & Tech",
    description: "Discover the best deals on high-quality tech in Morocco.",
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Viet technologie Store Promotion',
      },
    ],
  },
};

const FeaturedRoom = dynamic(
  () => import('@/src/components/FeaturedRoom')
);

export const revalidate = 10;

export default async function Home() {
  const featuredRoom = await getFeaturedProducts();

  return (
    <div>
      <Banner />

      <div className="mx-auto mt-10 flex max-w-7xl flex-col items-center justify-center space-y-4 px-4">
        {/* 2. Updated title color to use your brand's teal */}
        <h1 className="text-center text-4xl font-bold text-brand-teal">
          Produits populaires
        </h1>
      </div>

      <FeaturedRoom featuredRoom={featuredRoom} />
      <FeaturesBar />

      {/* This component is positioned on the side */}
      <div className='fixed bottom-0 right-0 h-full w-28'>
        <RightSide/>
      </div>
    </div>
  );
}