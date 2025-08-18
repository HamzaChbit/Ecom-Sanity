import { Inter } from "next/font/google";
import "./globals.css";

import ToastProvider from "@/src/sanity/Tosat";
import Header from "@/src/components/Header";
import Footer from "@/src/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: 'DESKTOPPLUS',
  description: 'Explore the latest in technology and elevate your lifestyle with cutting-edge gadgets. ',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ToastProvider />
        
        {/* This wrapper fixes the footer positioning issue */}
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