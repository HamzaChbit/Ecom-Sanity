import Image from "next/image";
import Link from "next/link";

function Card({ product }) {
  return (
    <Link href={`/details/${product?.slug}`}>
      <div className="relative shadow-md max-w-sm cursor-pointer rounded-2xl overflow-hidden group">
        
        {/* === Discount Badge === */}
        {product.discount && (
          <div className="absolute top-0 left-0 bg-red-500 text-white text-sm font-semibold px-3 py-1 z-10">
            -{product.discount}%
          </div>
        )}

        <div className="relative h-72 overflow-hidden flex items-center justify-center bg-white aspect-ratio-1">
          <Image
            src={product?.image}
            width={150} height={150}
            alt={product?.name || "Product Image"}
            // Updated image hover effect using group-hover
            className="group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        <div className="p-4 space-y-2 bg-white">
          {/* 1. Product name color changed to gold */}
          <h1 className="text-black group-hover:text-amber-600 text-2xl font-semibold truncate transition-colors">
            {product?.name}
          </h1>
          <p className="text-xl text-gray-500 truncate">{product.description}</p>
          <br/>
          <br/>
        </div>

        {/* 2. Price Section colors updated */}
        <div className="absolute bottom-0 right-0 flex items-baseline gap-x-2 rounded-tl-xl bg-amber-50 px-4 py-2 shadow-lg">
          {product.discount ? (
            <>
              <span className="text-base font-medium text-gray-400 line-through">
                ${product.price.toFixed(2)}
              </span>
              <span className="text-xl font-bold text-amber-500">
                ${(product.price - (product.price * product.discount / 100)).toFixed(2)}
              </span>
            </>
          ) : (
            <span className="text-xl font-bold text-amber-500">
              ${product.price.toFixed(2)}
            </span>
          )}
        </div>

      </div>
    </Link>
  );
}

export default Card;