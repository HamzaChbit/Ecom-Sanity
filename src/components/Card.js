import Image from "next/image";
import Link from "next/link";

function Card({ product }) {
  return (
    <Link href={`/details/${product?.slug}`}>
      <div className="relative shadow-md max-w-sm cursor-pointer rounded-2xl overflow-hidden group bg-white">
        
        {/* Discount Badge */}
        {product.discount && (
          <div className="absolute top-0 left-0 bg-red-600 text-white text-sm font-semibold px-3 py-1 z-10">
            -{Math.floor(product.discount)}%
          </div>
        )}

        {/* <div className="relative h-72 overflow-hidden flex items-center justify-center aspect-ratio-1"> */}
       {/* <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={product?.image}
            fill
            alt={product?.name || "Product Image"}
            className="group-hover:scale-105 transition-transform duration-300"
          />
        </div> */}
                <div className="relative h-72 overflow-hidden flex items-center justify-center aspect-ratio-1">
          <Image
            src={product?.image}
            width={200} height={200}
            alt={product?.name || "Product Image"}
            className="group-hover:scale-105 transition-transform duration-300"
          />
        </div>





        <div className="p-4 space-y-2">
          <h1 className="text-gray-800 group-hover:text-amber-600 md:text-2xl text-xl font-semibold truncate transition-colors">
            {product?.name}
          </h1>
          <p className="md:text-xl text-lg text-gray-500 truncate">{product.description}</p>
          <br/>
          <br/>
        </div>

        {/* Price Section: Currency updated to د.م. */}
        <div className="absolute bottom-0 right-0 flex items-baseline gap-x-2 rounded-tl-xl bg-amber-500 px-4 py-2 shadow-lg">
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