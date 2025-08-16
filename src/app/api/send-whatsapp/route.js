
import twilio from "twilio";

const accountSid = process.env.NEXT_PUBLIC_TWILIO_ACCOUNT_SID;
const authToken = process.env.NEXT_PUBLIC_TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

export async function POST(req) {
  try {
    const { message, phoneNumber } = await req.json(); // ← hna, await req.json() !!!

    const sentMessage = await client.messages.create({
      from: "whatsapp:+14155238886", // Twilio sandbox number
      to: `whatsapp:${phoneNumber}`, 
      body: message,
    });

    return new Response(JSON.stringify({ success: true, sid: sentMessage.sid }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("WhatsApp API error:", error.message);
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
