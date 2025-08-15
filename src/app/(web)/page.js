import Banner from "@/src/components/Banner";
import FeaturedRoom from "@/src/components/FeaturedRoom";
import { getFeaturedProducts } from "@/src/sanity/product-util";







export default async function Home() {


  const featuredRoom = await getFeaturedProducts();

  return (
    <div>


    <div className="flex flex-col items-center justify-center mt-10 space-y-4">
       <h1  className="text-4xl font-bold text-[#5B20B6] text-center">Get the Best Gadgets at TechTrove!</h1>
       {/* <p className="text-center text-xl text-gray-500">Explore the latest in technology and elevate your lifestyle with cutting-edge gadgets. 🚀✨</p> */}
     </div>


   <div className="flex flex-col items-center justify-center mt-10 space-y-4">
      <Banner/>
   </div>

   <div className="flex flex-col items-center justify-center mt-10 space-y-4">
      <h1 className="text-4xl font-bold text-[#5B20B6] text-center">Featured Products</h1>
   </div>

   <FeaturedRoom featuredRoom={featuredRoom} />



 </div>
  );
}
