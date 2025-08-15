

import Details from "@/src/components/Details";
import { getProductBySlug } from "@/src/sanity/product-util";



export default async  function Page({ params }) {
  const { slug } = params;

  const product = await getProductBySlug(slug);
  
  //  const [product, setProduct] = useState([]); // State to hold product data



  // useEffect(() => {
  //   const fetchData = async () => {
  //     const products = await getProductBySlug(slug);
  //     setProduct(products);
  //   };
  //   fetchData();
  // }, []);

  return (
    <div>

      <div className="mb-20">
      {product && <Details product={product[0]} />} 
      {/* <Comments  product={product[0]}/> */}
      </div>
  
    </div>
  );
}
