import Image from "next/image";
import Link from "next/link";

function Card({ product }) {
  return (
    <Link href={`/details/${product?.slug}`}>
      <div className="relative shadow-md max-w-sm cursor-pointer rounded-2xl overflow-hidden">
        
        {/* === Discount Badge === */}
        {product.discount && (
          <div className="absolute top-0 left-0 bg-red-500 text-white text-sm font-semibold px-3 py-1 z-10">
            -{product.discount}%
          </div>
        )}

        <div className="relative h-72 overflow-hidden flex items-center justify-center aspect-ratio-1 hover:scale-105 transition-transform duration-300">
          <Image
            src={product?.image}
            width={150} height={150}
            alt={product?.name || "Product Image"}
          />
        </div>

        <div className="p-4 space-y-2">
          <h1 className="text-[#5B20B6] hover:text-[#441583] text-2xl font-semibold truncate">{product?.name}</h1>
          <p className="text-xl text-gray-500 truncate">{product.description}</p>
          <br/>
          <br/>
        </div>

        {/* Price Section - CSS Improved */}
        <div className="absolute bottom-0 right-0 flex items-baseline gap-x-2 rounded-tl-xl bg-[#F5F3FF] px-4 py-2 shadow-lg">
          {product.discount ? (
            <>
              <span className="text-base font-medium text-gray-400 line-through">
                ${product.price.toFixed(2)}
              </span>
              <span className="text-xl font-bold text-[#5B20B6]">
                ${(product.price - (product.price * product.discount / 100)).toFixed(2)}
              </span>
            </>
          ) : (
            <span className="text-xl font-bold text-[#5B20B6]">
                ${product.price.toFixed(2)}
            </span>
          )}
        </div>

      </div>
    </Link>
  );
}

export default Card;