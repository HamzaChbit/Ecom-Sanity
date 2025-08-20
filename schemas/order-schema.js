const order = {
  name: "order",
  title: "Orders",
  type: "document",
  fields: [
    {
      name: "firstName",
      title: "First Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "lastName",
      title: "Last Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "phone",
      title: "Phone",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
 
    {
      name: "address",
      title: "Address",
      type: "string",
      validation: (Rule) => Rule.required(),
    },

    // Product details
    {
      name: "name",
      title: "Product Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "qty",
      title: "Quantity",
      type: "number",
      validation: (Rule) => Rule.required().min(1),
    },
    {
      name: "color",
      title: "Color",
      type: "string",
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
      validation: (Rule) => Rule.min(0).max(100),
      initialValue: 0,
    },

    // Metadata
    {
      name: "createdAt",
      title: "Created At",
      type: "datetime",
      options: {
        dateFormat: "YYYY-MM-DDTHH:mm:ssZ",
      },
      readOnly: true,
    },
    // {
    //   name: "paid",
    //   title: "Paid",
    //   type: "boolean",
    // },
    // {
    //   name: "delivered",
    //   title: "Delivered",
    //   type: "boolean",
    // },
  ],
  initialValue: {
    createdAt: new Date().toISOString(),
  },
};

export default order;
