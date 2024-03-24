'use client'

import Footer from "@/app/components/Footer";
import Details from "../../components/Details";
import Header from "../../components/Header";
import { getProductBySlug } from "@/sanity/product-util";
import { useEffect, useState } from "react";
import Comments from "@/app/components/Comments";

export default  function Page({ params }) {
  const { slug } = params;


  
  const [product, setProduct] = useState(null); // State to hold product data

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productData = await getProductBySlug(slug);
        setProduct(productData);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct(); // Call fetchProduct when component mounts
  }, [slug]); // Dependency array should include slug, not product

  return (
    <div>
      <Header />
      <div className="mb-20">
      {product && <Details product={product[0]} />} 
      <Comments  product={product[0]}/>
      </div>
      <Footer />
    </div>
  );
}
