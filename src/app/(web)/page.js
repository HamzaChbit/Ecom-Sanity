import Banner from "@/src/components/Banner";
import FeaturedRoom from "@/src/components/FeaturedRoom";
import { getFeaturedProducts } from "@/src/sanity/product-util";

export const revalidate = 10;

export default async function Home() {
  const featuredRoom = await getFeaturedProducts();

  return (
    <div>
      <div className="flex flex-col items-center justify-center mt-10 space-y-4">
        <h1 className="text-4xl font-bold text-[#5B20B6] text-center">
          Get the Best Gadgets at TechTrove!
        </h1>
      </div>

      <div className="flex flex-col items-center justify-center mt-10 space-y-4">
        <Banner />
      </div>

      {/* HAD L'BLASSA LI Tbeddlat */}
      <div className="max-w-7xl mx-auto flex flex-col items-center justify-center mt-10 space-y-4">
        <h1 className="text-4xl font-bold text-[#5B20B6] text-center">
          Featured Products
        </h1>
      </div>

      <FeaturedRoom featuredRoom={featuredRoom} />
    </div>
  );
}