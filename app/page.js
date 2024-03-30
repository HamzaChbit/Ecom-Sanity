'use client'
import {  getProducts } from "@/sanity/product-util";
import Banner from "./components/Banner";
import Card from "./components/Card";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { useEffect } from "react";
import { useState } from "react";
import { motion } from 'framer-motion'

export default   function Home() {

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const products = await getProducts();
      setProducts(products);
    };

    fetchProducts();
  }, []);
  return (
    <div>
    <Header/>

    <div className="flex flex-col items-center justify-center mt-10 space-y-4">
       <motion.h1 initial={{y:10,opacity:0}} animate={{y:0,opacity:1}} transition={{duration:0.2,delay:0.4}}  className="text-4xl font-bold text-[#5B20B6] text-center">Get the Best Gadgets at TechTrove!</motion.h1>
       {/* <p className="text-center text-xl text-gray-500">Explore the latest in technology and elevate your lifestyle with cutting-edge gadgets. 🚀✨</p> */}
     </div>


   <div className="flex flex-col items-center justify-center mt-10 space-y-4">
      <Banner/>
   </div>

   <motion.div className="flex flex-col items-center justify-center mt-10 space-y-4" initial={{y:10,opacity:0}} animate={{y:0,opacity:1}} transition={{duration:0.6,delay:0.7}}>
      <h1 className="text-4xl font-bold text-[#5B20B6] text-center">Featured Products</h1>
   </motion.div>

   <div className='flex p-10'>
   <motion.div className='mx-auto grid grid-cols-1 lg:grid-cols-3 gap-16' initial={{y:10,opacity:0}} animate={{y:0,opacity:1}} transition={{duration:0.7,delay:0.7}}>
   {products.map((product)=>(
      
      <Card key={product?._id} product={product}  />
  
  ))}
    
   </motion.div>
   </div>

   <Footer/>

 </div>
  );
}
