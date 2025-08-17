import { createClient } from "next-sanity";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2023-11-21",
  token: process.env.NEXT_PUBLIC_SANITY_API_TOKEN,
  useCdn: true,
});

export async function createOrder(firstName, lastName, phone, email, cart, address) {
  try {
    const orderCreationPromises = [];

    cart.forEach((orderData) => {
      const { name, quantity, price, color, discount = 0 } = orderData;

      const finalPrice = discount
        ? price * (1 - discount / 100) * quantity
        : price * quantity;

      const orderCreationPromise = client.create({
        _type: "order",
        firstName,          // prenom
        lastName,           // nom
        phone,              // numéro
        email,
        address,
        name,               // product name
        qty: quantity,
        price: finalPrice,
        color: color || null,
        discount,
        createdAt: new Date().toISOString(),
      });

      orderCreationPromises.push(orderCreationPromise);
    });

    const createdOrders = await Promise.all(orderCreationPromises);
    return createdOrders;
  } catch (error) {
    console.error("Error creating order:", error.message);
    throw new Error("Failed to create order");
  }
}
