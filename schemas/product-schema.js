const product = {
  name: "product",
  title: "Products",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name", // Use the "name" field as the source for generating the slug
        maxLength: 200, // Adjust the maximum length as needed
      },
      validation: (Rule) => Rule.required(),
    },


    // {
    //   name: "category",
    //   title: "Category",
    //   type: "string", // هنا غادي تحط category
    //   options: {
    //     list: ["Phone", "PC", "Laptop", "Tablet"], // تقدّر تزيد أو تغيّر حسب المنتجات
    //   },
    //   validation: (Rule) => Rule.required(),
    // },
// {
//   name: "category",
//   title: "Category",
//   type: "reference",
//   to: [{ type: "category" }],
//   validation: (Rule) => Rule.required(),
// }


{ 
      name: "parentCategory",
      title: "Parent Category",
      type: "reference",
      to: [{ type: "category" }],
      description: "مثلا PC Portable أو iPhone"
    },
    { 
      name: "brandCategory",
      title: "Brand / Subcategory",
      type: "reference",
      to: [{ type: "category" }],
      description: "مثلا Dell, HP, Lenovo, Samsung, Redmi"
    }
,

    {
      name: "image",
      title: "Main Image",
      type: "image",
      options: {
        hotspot: true, // Allows selecting a hotspot for cropping
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "extraImages",
      title: "Extra Images",
      type: "array",
      of: [{ type: "image" }],
    },
    {
      name: "colors",
      title: "Colors",
      type: "array",
      of: [
        {
          type: "string",
          options: {
            list: ["Grey", "Black", "Blue","white"], // Add your color options
          },
        },
      ],
    },
  // {
  //     name: "storageOptions",
  //     title: "Storage Options",
  //     type: "array",
  //     of: [
  //       {
  //         type: "string",
  //         options: { list: ["128GB", "256GB", "512GB"] }, // هنا تختار القيم
  //       },
  //     ],
  //   },




    {
      name: "description",
      title: "Description",
      type: "text",
      
    },

    {
  name: 'specs',
  title: 'Specifications',
  type: 'array',
  of: [
    {
      type: 'object',
      fields: [
        { name: 'name', title: 'Spec Name', type: 'string' },
        { name: 'value', title: 'Spec Value', type: 'string' }
      ]
    }
  ]
},




    {
      name: "price",
      title: "Price",
      type: "number",
      validation: (Rule) => Rule.required().min(0),
    },
    
    {
  name: "discount",
  title: "Discount (%)",
  type: "number",
  description: "Discount percentage for this product. Example: 20 for 20%",
  validation: (Rule) => Rule.min(0).max(100),
}
,

    {
  name: "featured",
  title: "Featured Product",
  type: "boolean",
  description: "Check this box to feature this product on the homepage",
  initialValue: false
},

   {
      name: "archived",
      title: "Archived",
      type: "boolean",
      description: "Check this box to archive the product (won't show in frontend)",
      initialValue: false,
    },



    {
      name: "createdAt",
      title: "Created At",
      type: "datetime",
      options: {
        dateFormat: "YYYY-MM-DDTHH:mm:ssZ",
      },
      readOnly: true,
    },
  ],
  initialValue: {
    createdAt: new Date().toISOString(),
  },
};

export default product;