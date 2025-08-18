import { Inter } from "next/font/google";
import "./globals.css";

import ToastProvider from "@/src/sanity/Tosat";
import Header from "@/src/components/Header";
import Footer from "@/src/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  // Using a title object for more powerful SEO
  title: {
    default: "DESKTOPPLUS | Laptops & Tech in Agadir, Morocco", // Title for the homepage
    template: "%s | DESKTOPPLUS", // Template for all other pages
  },
  description: "Explore the latest in technology and elevate your lifestyle with cutting-edge gadgets from DESKTOPPLUS. High-quality laptops and IT equipment delivered across Morocco.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ToastProvider />
        
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </div>
        
      </body>
    </html>
  );
}