import Card from "@/src/components/Card";
import Comments from "@/src/components/Comments";
import Details from "@/src/components/Details";
import { getProductBySlug, getProductsRetailed } from "@/src/sanity/product-util";


export const revalidate = 10;
export default async  function Page({ params }) {
  const { slug } = params;

  const product = await getProductBySlug(slug);
  const relatedProducts = await getProductsRetailed(4,slug);
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
      <Comments  product={product[0]}/>
    <h2 className="text-2xl font-bold text-[#5B20B6]   my-10 text-center ">Related Products</h2>
       <div className=" max-w-7xl mx-auto mt-20 mb:mx-1  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 ">
       

        {relatedProducts.map((item) => (
          <Card key={item._id} product={item} />
        ))}
      </div>
    </div>
    </div>
  );
}
