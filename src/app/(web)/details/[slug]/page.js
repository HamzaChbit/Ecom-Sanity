import Card from "@/src/components/Card";
import Comments from "@/src/components/Comments";
import Details from "@/src/components/Details";
import { getProductBySlug, getProductsRetailed } from "@/src/sanity/product-util";

export const revalidate = 10;

// This function runs on the server to generate metadata for this page
export async function generateMetadata({ params }) {
  const { slug } = params;
  const product = await getProductBySlug(slug);

  // 1. Updated brand name in metadata for not-found products
  if (!product || product.length === 0) {
    return {
      title: "Product Not Found | Viet technologie",
      description: "The product you are looking for could not be found.",
    };
  }

  const productData = product[0];

  // 2. Updated brand name for existing products
  return {
    title: `${productData.name} | Viet technologie`,
    description: productData.description?.substring(0, 160) || `Check out ${productData.name} on Viet technologie.`,
    openGraph: {
      title: `${productData.name} | Viet technologie`,
      description: productData.description?.substring(0, 160),
      images: [
        {
          url: productData.image,
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

  // Styled the not-found message to match the brand
  if (!product || product.length === 0) {
    return (
      <div className="my-20 text-center">
        <h1 className="text-3xl font-bold" style={{ color: '#4a4a4a' }}>Product Not Found</h1>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-20">
        <Details product={product[0]} />
        <Comments product={product[0]} />
        
        {/* 3. Updated "Related Products" title color to teal */}
        <h2 className="my-10 text-center text-2xl font-bold md:text-3xl" style={{ color: '#2DD4BF' }}>
          Produits Associés
        </h2>
        
        <div className="mx-auto mt-10 grid max-w-7xl grid-cols-1 gap-6 px-4 md:grid-cols-2 lg:grid-cols-4">
          {relatedProducts.map((item) => (
            <Card key={item._id} product={item} />
          ))}
        </div>
      </div>
    </div>
  );
}