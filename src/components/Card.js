"use client"
import useCartStore from "@/cartStore";
import Image from "next/image";
import Link from "next/link";
import { FaShoppingCart } from "react-icons/fa";
import { toast } from "react-hot-toast";

function Card({ product }) {
  const addToCart = useCartStore((state) => state.addToCart);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const finalPrice = product.discount
      ? product.price - (product.price * product.discount) / 100
      : product.price;

    addToCart({
      product,
      quantity: 1,
      price: finalPrice,
    });
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <Link href={`/details/${product?.slug}`}>
      <div className="relative shadow-md max-w-sm cursor-pointer rounded-2xl overflow-hidden group bg-white transition">
        {/* Discount Badge */}
        {product.discount && (
          <div className="absolute top-0 left-0 bg-red-600 text-white text-sm font-semibold px-3 py-1 z-10">
            -{Math.floor(product.discount)}%
          </div>
        )}

        {/* Product Image */}
        <div className="relative h-72 overflow-hidden flex items-center justify-center">
          <Image
            src={product?.image}
            width={200}
            height={200}
            alt={product?.name || "Product Image"}
            className="group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Product Info */}
        <div className="p-4 space-y-2">
          <h1 className="text-gray-800 group-hover:text-amber-600 md:text-2xl text-xl font-semibold truncate transition-colors">
            {product?.name}
          </h1>
          <p className="md:text-xl text-lg text-gray-500 truncate">
            {product.description}
          </p>
          <br />
          <br />
        </div>

        {/* Price Section */}
        <div className="absolute bottom-0 right-0 flex items-baseline gap-x-2 rounded-tl-xl bg-amber-500 px-4 py-2 shadow-lg">
          {product.discount ? (
            <>
              <span className="text-base font-medium text-black/60 line-through">
                د.م. {Math.floor(product.price)}
              </span>
              <span className="text-xl font-bold text-black">
                د.م.{" "}
                {Math.floor(
                  product.price - (product.price * product.discount) / 100
                )}
              </span>
            </>
          ) : (
            <span className="text-xl font-bold text-black">
              د.م. {Math.floor(product.price)}
            </span>
          )}
        </div>

        {/* Add to Cart Button - hidden until hover */}
        {/* <button
          onClick={handleAddToCart}
          className="absolute bottom-40 right-1/2 translate-x-1/2 bg-amber-500 hover:bg-amber-600 text-white font-semibold px-4 py-2 rounded-xl shadow-md flex items-center gap-2 opacity-0 translate-y-5 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300"
        >
          <FaShoppingCart />
          Add to Cart
        </button> */}
      </div>
    </Link>
  );
}

export default Card;
