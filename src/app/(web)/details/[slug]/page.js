import Card from "@/src/components/Card";
import Comments from "@/src/components/Comments";
import Details from "@/src/components/Details";
import { getProductBySlug, getProductsRetailed } from "@/src/sanity/product-util";

export const revalidate = 10;

// ## 1. METADATA MISE À JOUR AVEC "DESKTOP PLUS" ##
export async function generateMetadata({ params }) {
  const { slug } = params;
  const product = await getProductBySlug(slug);

  if (!product || product.length === 0) {
    return {
      title: "Produit non trouvé | DESKTOP PLUS",
      description: "Le produit que vous recherchez n'a pas pu être trouvé.",
    };
  }

  const productData = product[0];

  return {
    title: `${productData.name} | DESKTOP PLUS`,
    description: productData.description?.substring(0, 160) || `Découvrez ${productData.name} sur DESKTOP PLUS.`,
    openGraph: {
      title: `${productData.name} | DESKTOP PLUS`,
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

  if (!product || product.length === 0) {
    return (
      <div className="my-20 text-center">
        <h1 className="text-3xl font-bold text-brand-dark">Produit non trouvé</h1>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-20">
        <Details product={product[0]} />
        {/* <Comments product={product[0]} /> */}
        
        {/* ## 2. STYLE MIS À JOUR AVEC la couleur "brand-amber" ## */}
        <h2 className="my-10 text-center text-3xl font-bold text-brand-amber md:text-4xl">
          Produits Associés
        </h2>
        
        <div className="mx-auto mt-10 grid max-w-7xl grid-cols-1 gap-6 px-4 sm:grid-cols-2 lg:grid-cols-4">
          {relatedProducts.map((item) => (
            <Card key={item._id} product={item} />
          ))}
        </div>
      </div>
    </div>
  );
}