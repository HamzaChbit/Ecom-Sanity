import CategoryView from "@/src/components/CategoryView";
import { getProductsByCategorySlug } from "@/src/sanity/product-util";
 // We'll create this in the next step
export const revalidate = 10;
// This function runs on the server to generate dynamic metadata
export async function generateMetadata({ params }) {
  const { slug } = params;
  
  // Create a clean title from the slug (e.g., "pc-portable" becomes "Pc Portable")
  const categoryTitle = slug
    .replace(/-/g, ' ')
    .replace(/\b\w/g, char => char.toUpperCase());

  return {
    title: `${categoryTitle} | DESKTOPPLUS`,
    description: `Find the best deals on ${categoryTitle} at DESKTOPPLUS.`,
  };
}

// This is the main Page component (it's a Server Component)
export default async function CategoryPage({ params }) {
  const { slug } = params;
  
  // Fetch the initial products on the server
  const initialProducts = await getProductsByCategorySlug(slug);

  // Pass the server-fetched data to the client component as a prop
  return <CategoryView initialProducts={initialProducts} />;
}