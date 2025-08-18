import BrandView from "@/src/components/BrandView";
import { getProductsByBrandSlug } from "@/src/sanity/product-util"; // We'll create this in the next step

// This function runs on the server to generate dynamic metadata
export async function generateMetadata({ params }) {
  const { slug } = params;
  
  // Create a clean title from the slug (e.g., "hewlett-packard" becomes "Hewlett Packard")
  const brandTitle = slug
    .replace(/-/g, ' ')
    .replace(/\b\w/g, char => char.toUpperCase());

  return {
    title: `${brandTitle} | DESKTOPPLUS`,
    description: `Shop the best ${brandTitle} products at DESKTOPPLUS.`,
  };
}

// This is the main Page component (it's a Server Component)
export default async function BrandPage({ params }) {
  const { slug } = params;
  
  // Fetch the initial products on the server
  const initialProducts = await getProductsByBrandSlug(slug);

  // Pass the server-fetched data to the client component as a prop
  return <BrandView initialProducts={initialProducts} />;
}