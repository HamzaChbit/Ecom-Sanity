import Image from "next/image";
import Link from "next/link";

function Card({ product }) {
  const brandTeal = "#2DD4BF";
  const brandDarkGray = "#4a4a4a";

  return (
    <Link href={`/details/${product?.slug}`}>
      <div className="group relative max-w-sm cursor-pointer overflow-hidden rounded-2xl bg-white shadow-md">
        
        {/* Discount Badge (Kept red for visibility) */}
        {product.discount && (
          <div className="absolute left-0 top-0 z-10 bg-red-600 px-3 py-1 text-sm font-semibold text-white">
            -{Math.floor(product.discount)}%
          </div>
        )}

        <div className="relative flex h-72 items-center justify-center overflow-hidden">
          <Image
            src={product?.image}
            width={200} height={200}
            alt={product?.name || "Product Image"}
            className="transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        <div className="space-y-2 p-4">
          {/* 1. Updated title color to brand's dark gray and hover to teal */}
          <h1 
            className="truncate text-xl font-semibold transition-colors md:text-2xl group-hover:text-[--hover-color]"
            style={{ color: brandDarkGray, '--hover-color': brandTeal }}
          >
            {product?.name}
          </h1>
          <p className="truncate text-lg text-gray-500 md:text-xl">{product.description}</p>
          <br/>
          <br/>
        </div>

        {/* 2. Changed price background to brand's teal */}
        <div 
          className="absolute bottom-0 right-0 flex items-baseline gap-x-2 rounded-tl-xl px-4 py-2 shadow-lg"
          style={{ backgroundColor: brandTeal }}
        >
          {product.discount ? (
            <>
              <span className="text-base font-medium text-black/60 line-through">
                د.م. {Math.floor(product.price)}
              </span>
              <span className="text-xl font-bold text-black">
                د.م. {Math.floor(product.price - (product.price * product.discount / 100))}
              </span>
            </>
          ) : (
            <span className="text-xl font-bold text-black">
              د.م. {Math.floor(product.price)}
            </span>
          )}
        </div>

      </div>
    </Link>
  );
}

export default Card;