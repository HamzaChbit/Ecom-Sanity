
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
    groq`*[_type == "product" && slug.current == $slug]{
      _id,
      createdAt,
      name,
      slug,
      description,
      price,
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
    groq`*[_type == "product" && category->slug.current == $slug]{
      _id,
      name,
      price,
      "image": image.asset->url,
      "slug": slug.current,
      category->{
        _id,
        title,
        "slug": slug.current
      }
    }`,
    { slug }
  );
}

export async function getFeaturedProducts() {
  return client.fetch(
    groq`*[_type == "product" && featured == true]{
      _id,
      name,
      "slug": slug.current,
      "image": image.asset->url,
      price,
      description,
      category->{title, slug}
    } | order(createdAt desc)`
  );
}



export async function getProducts() {
  return client.fetch(
    groq`*[_type == "product"]{
      _id,
      createdAt,
      name,
      slug,
      description,
      price,
      category,
      "image": image.asset->url,
      "slug": slug.current,
      "extraImages": extraImages[].asset->url,
      colors,
  
    }`
  );
  
}