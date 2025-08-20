import Image from "next/image";
import Link from "next/link";

function Card({ product }) {
  // Le prix avec réduction est calculé une seule fois ici
  const discountedPrice = product.discount
    ? Math.floor(product.price - (product.price * product.discount) / 100)
    : Math.floor(product.price);

  return (
    <Link href={`/details/${product?.slug}`} className="block">
      <div className="group relative max-w-sm cursor-pointer overflow-hidden rounded-2xl bg-white shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
        
        {product.discount && (
          <div className="absolute left-0 top-0 z-10 bg-red-600 px-3 py-1 text-sm font-semibold text-white">
            -{Math.floor(product.discount)}%
          </div>
        )}

        <div className="relative flex h-72 items-center justify-center overflow-hidden bg-gray-50 p-4">
          <Image
            src={product?.image}
            width={220}
            height={220}
            alt={product?.name || "Image du produit"}
            className="object-contain transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        {/* Espace réservé pour le prix avec padding-bottom */}
        <div className="space-y-2 p-4 pb-20">
          <h1 
            className="truncate text-xl font-semibold text-brand-dark transition-colors md:text-2xl group-hover:text-brand-amber"
          >
            {product?.name}
          </h1>
          <p className="truncate text-base text-gray-500">{product.description}</p>
        </div>

        {/* Section du prix avec les couleurs de la marque */}
        <div 
          className="absolute bottom-0 right-0 flex items-baseline gap-x-2 rounded-tl-xl bg-brand-amber px-4 py-2 text-brand-dark shadow-lg"
        >
          {product.discount ? (
            <>
              <span className="text-base font-medium text-black/60 line-through">
                د.م. {Math.floor(product.price)}
              </span>
              <span className="text-xl font-bold">
                د.م. {discountedPrice}
              </span>
            </>
          ) : (
            <span className="text-xl font-bold">
              د.م. {Math.floor(product.price)}
            </span>
          )}
        </div>

      </div>
    </Link>
  );
}

export default Card;