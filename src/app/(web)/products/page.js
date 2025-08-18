

import ProductsView from "@/src/components/ProductsView";
import { getProducts } from "@/src/sanity/product-util";

export const metadata = {
  title: "All Products - DESKTOPPLUS",
  description: "Browse our collection of high-quality products. Find the best deals on the latest items.",
  keywords: ["products", "e-commerce", "shopping", "deals"],
};

// 2. The page is now an async Server Component
export default async function ProductsPage() {
  // 3. Fetch data on the server
  const initialProducts = await getProducts();

  
  return <ProductsView initialProducts={initialProducts} />;
}