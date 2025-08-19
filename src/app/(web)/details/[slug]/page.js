import Card from "@/src/components/Card";
import Comments from "@/src/components/Comments";
import Details from "@/src/components/Details";
import { getProductBySlug, getProductsRetailed } from "@/src/sanity/product-util";


export const revalidate = 10;

// This function runs on the server to generate metadata for this page
export async function generateMetadata({ params }) {
  const { slug } = params;
  const product = await getProductBySlug(slug);

  // Handle case where product is not found
  if (!product || product.length === 0) {
    return {
      title: "Product Not Found | DESKTOPPLUS",
      description: "The product you are looking for could not be found.",
    };
  }

  const productData = product[0];

  return {
    title: `${productData.name} | DESKTOPPLUS`,
    description: productData.description?.substring(0, 160) || `Check out ${productData.name} on DESKTOPPLUS.`,
    openGraph: {
      title: `${productData.name} | DESKTOPPLUS`,
      description: productData.description?.substring(0, 160),
      images: [
        {
          url: productData.image, // Use the product's main image for social media previews
          width: 800,
          height: 600,
          alt: productData.name,
        },
      ],
    },
  };
}


export default async function Page({ params }) {
  const { slug } = params;

  const product = await getProductBySlug(slug);
  const relatedProducts = await getProductsRetailed(4, slug);

  // Return a not-found message if the product doesn't exist
  if (!product || product.length === 0) {
    return (
      <div className="text-center my-20">
        <h1 className="text-3xl font-bold">Product Not Found</h1>
        
      </div>
    );
  }

  return (
    <div>
      <div className="mb-20">
        <Details product={product[0]} />
        <Comments product={product[0]} />
        <h2 className="md:text-3xl text-2xl font-bold text-amber-500 my-10 text-center">Produits associé</h2>
        <div className="max-w-7xl mx-auto mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
          {relatedProducts.map((item) => (
            <Card key={item._id} product={item} />
          ))}
        </div>
      </div>
    </div>
  );
}