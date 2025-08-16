import { createClient, groq } from "next-sanity";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  title: "Sanity-ecom",
  apiVersion: "2023-11-21",
  token: process.env.NEXT_PUBLIC_SANITY_API_TOKEN,
  useCdn: true,
});

// Function to get orders by email and sort by the latest
// export async function getOrdersByEmail(email) {
//     try {
//       // Query orders from Sanity with a GROQ query
//       const orders = await client.fetch(
//         `*[_type == 'order' && email == $email] | order(createdAt desc)`,
//         { email },
//         {next: {
//           revalidate: 1, //revalidate every 30 days
//        }});
  
//       // Return the sorted orders
//       return orders;
//     } catch (error) {
//       // Handle errors appropriately
//       console.error('Error getting orders:', error.message);
//       throw new Error('Failed to get orders');
//     }
//   }


  export async function createAddress(email,address,city, zipCode,country) {
  
       const currentDate = new Date().toISOString();
    const data = {
      _type: 'order',
      address,
      city,
      email,
      zipCode,
      country,
     
      createdAt: currentDate,
    };
  
    // Use the client to create a new document in the 'contact' collection
    const response = await client.create(data).catch((error) => {
      console.error('Error creating contact:', error.message);
      throw new Error('Failed to create contact');
    });
  
    return response;
  }
  
  export async function createOrder(email,cart,address,city, zipCode,country) {
    console.log(email,cart,address,city, zipCode,country);
    try {
      // Create an array to store the promises for creating each order
      const orderCreationPromises = [];
  
      // Iterate over the orderDataArray and create a promise for each order
      cart.forEach((orderData) => {
        // Extract order data
        const { name, quantity, price,color} = orderData;

        // Create a promise for creating each order
        const orderCreationPromise = client.create({
          _type: 'order',
          name,
          qty: quantity,
          price:price * quantity, // Assuming price is per item, multiply by quantity
          color,
        
          // paid: true,
          // delivered: false,
          email,
          address,
          city, zipCode,country,
          createdAt: new Date().toISOString(),
        });
  
        // Add the promise to the array
        orderCreationPromises.push(orderCreationPromise);
      });
  
      // Wait for all order creation promises to resolve
      const createdOrders = await Promise.all(orderCreationPromises);
  
      // Return the created orders
      return createdOrders;
    } catch (error) {
      // Handle errors appropriately
      console.error('Error creating order:', error.message);
      throw new Error('Failed to create order');
    }
  }
  