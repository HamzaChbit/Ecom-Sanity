import { createOrder } from "@/src/sanity/order-util";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { firstName, lastName, phone,  cart, address } = await req.json();

    if (!firstName || !lastName || !phone ||  !cart?.length || !address) {
      return NextResponse.json({ message: "Please fill all fields" }, { status: 400 });
    }

    // ديال sanity → خاصك تحدثو حتى هو باش يقبل هاد الحقول
    const createdOrders = await createOrder(firstName, lastName, phone, cart, address);

    return NextResponse.json(
      { message: "Order created successfully", orders: createdOrders },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error creating order:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
