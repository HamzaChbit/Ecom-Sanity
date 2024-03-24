
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import ToastProvider from "@/sanity/Tosat";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: 'TechTrove',
  description: 'Explore the latest in technology and elevate your lifestyle with cutting-edge gadgets. ',
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body className={inter.className}>
      <ToastProvider/>
        {children}
        </body>
    </html>
    </ClerkProvider>
  );
}
