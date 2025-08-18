
import { createClient, groq } from "next-sanity";


const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  title: "Sanity-ecom",
  apiVersion: "2023-11-21",
  token: process.env.NEXT_PUBLIC_SANITY_API_TOKEN,
  useCdn: true,
});



export async function getProductBySlug(slug) {
  return client.fetch(
    groq`*[_type == "product" && slug.current == $slug && archived != true]{
      _id,
      _createdAt,
      name,
      slug,
      specs,
      description,
      price,
       discount,
      "image": image.asset->url,
      "slug": slug.current,
      "extraImages": extraImages[].asset->url,
        colors,
    
    }`,
    { slug }
  );
}

// export async function getProductsByCategory(categoryId) {
//   return client.fetch(
//     groq`*[_type == "product" && category._ref == $categoryId]{
//       _id,
//       name,
//       slug,
//       description,
//       price,
//       "image": image.asset->url,
//       "extraImages": extraImages[].asset->url,
//       colors,
//       category->{
//         _id,
//         title
//       }
//     }`,
//     { categoryId }
//   );
// }
export async function getProductsByCategorySlug(slug) {
  return client.fetch(
    groq`*[_type == "product" && parentCategory->slug.current == $slug && archived != true]{
      _id,
      name,
      price,
       discount,
       _createdAt,   
      specs,
      "image": image.asset->url,
      "slug": slug.current,
      parentCategory->{
        _id,
        title,
        "slug": slug.current
      },
      brandCategory->{
        _id,
        title,
        "slug": slug.current
      }
    }`,
    { slug }
  );
}

export async function getProductsByBrandSlug(slug) {
  return client.fetch(
    groq`*[_type == "product" && brandCategory->slug.current == $slug && archived != true]{
      _id,
      name,
      price,
      discount,
      _createdAt, 
      specs,
      "image": image.asset->url,
      "slug": slug.current,
      parentCategory->{
        _id,
        title,
        "slug": slug.current
      },
      
      "brand": brandCategory->{
        _id,
        title,
        "slug": slug.current
      }
    }`,
    { slug }
  );
}


// export async function getProductsByBrandSlug(slug) {
//   return client.fetch(
//     groq`*[_type == "product" && brandCategory->slug.current == $slug && archived != true]{
//       _id,
//       name,
//       price,
//        discount,
//        createdAt,
//        specs,
//       "image": image.asset->url,
//       "slug": slug.current,
//       parentCategory->{
//         _id,
//         title,
//         "slug": slug.current
//       },
//       brandCategory->{
//         _id,
//         title,
//         "slug": slug.current
//       }
//     }`,
//     { slug }
//   );
// }





export async function getFeaturedProducts() {
  return client.fetch(
    groq`*[_type == "product" && featured == true && archived != true]{
      _id,
      name,
      "slug": slug.current,
      "image": image.asset->url,
      price,
      discount,
      specs,
      description,
      category->{title, slug}
    } | order(createdAt desc)`
  );
}



export async function getProducts() {
  return client.fetch(
    groq`*[_type == "product" && archived != true]{
      _id,
      _createdAt,
      name,
      slug,
      description,
      price,
      category,
       discount,
       specs,
      "image": image.asset->url,
      "slug": slug.current,
      "extraImages": extraImages[].asset->url,
      colors,
  
    }`
  );
  
}

export async function getProductsRetailed(limit = 4, excludeSlug = null) {
  const products = await client.fetch(
    groq`*[_type == "product" && archived != true]{
      _id,
      name,
      price,
      discount,
      specs,
      "slug": slug.current,
      "image": image.asset->url
    }`
  );

  // نحيد المنتج الرئيسي
  const filtered = excludeSlug
    ? products.filter((p) => p.slug !== excludeSlug)
    : products;

  // shuffle + slice
  return filtered.sort(() => 0.5 - Math.random()).slice(0, limit);
}

