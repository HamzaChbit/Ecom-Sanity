import { createClient, groq } from "next-sanity";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2023-11-21",
  token: process.env.NEXT_PUBLIC_SANITY_API_TOKEN,
  useCdn: true,
});




// export async function getCategories() {
//   return client.fetch(
//     groq`*[_type == "category"]{
//      _id, 
//      title
//       }`
//   );
// }


// export async function getCategories() {
//   return client.fetch(
//     groq`*[_type == "category"]{ _id, title, "slug": slug.current }`
//   );
// }

export async function getParentCategories() {
  return client.fetch(
    groq`*[_type == "category" && !defined(parent)]{
      _id,
      title,
      "slug": slug.current
    }`
  );
}

// getCategoriesWithChildren.js
export async function getCategoriesWithChildren() {
  return client.fetch(`
    *[_type == "category"]{
      _id,
      title,
      "slug": slug.current,
      children[]->{
        _id,
        title,
        "slug": slug.current
      }
    }
  `);
}
export async function getSubcategories(parentTitle) {
  return client.fetch(
    groq`*[_type=="category" && parent->title == $parentTitle]{
      _id,
      title,
      "slug": slug.current
    }`,
    { parentTitle }
  );
}
