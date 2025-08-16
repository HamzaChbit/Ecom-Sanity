
const category = {
  name: "category",
  title: "Categories",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
    },
    // {
    //   name: "slug",
    //   title: "Slug",
    //   type: "slug",
    //   options: {
    //     source: "title",
    //     maxLength: 96,
    //   },
    
    // },
     {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title", // f Studio, auto-generate slug
        maxLength: 96,
    slugify: input => input.toLowerCase().replace(/\s+/g, '-')

      },
      
    },
        {
      name: "parent",
      title: "Parent Category",
      type: "reference",
      to: [{ type: "category" }],
      description: "إذا هادي subcategory اختار parent، وإلا خليها فاضية للأب",
    },

  ],
}
export default category;