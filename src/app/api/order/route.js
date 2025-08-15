import { NextResponse } from "next/server";
import { createOrder } from "@/sanity/order-util";

export async function POST(req) {
  try {
    const { email, cart, address, city, zipCode, country } = await req.json();

    if ( !cart?.length || !address || !city || !zipCode || !country || !email) {
      return NextResponse.json({ message: "Please fill all fields" }, { status: 400 });
    }

    const createdOrders = await createOrder(email, cart, address, city, zipCode, country);

    return NextResponse.json(
      { message: "Order created successfully", orders: createdOrders },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error creating order:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
