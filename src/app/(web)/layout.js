import { Inter } from "next/font/google";
import "./globals.css";

import ToastProvider from "@/src/sanity/Tosat";
import Header from "@/src/components/Header";
import Footer from "@/src/components/Footer";

const inter = Inter({ subsets: ["latin"] });

// البيانات الوصفية المحدثة باللغة الفرنسية
export const metadata = {
  title: {
    default: "VITE TECNOLOGIE | PC Portables & Tech à Agadir, Maroc", // عنوان الصفحة الرئيسية
    template: "%s | VITE TECNOLOGIE", // قالب للصفحات الأخرى
  },
  description: "Découvrez les dernières nouveautés technologiques de VITE TECNOLOGIE. PC portables et matériel informatique de haute qualité livrés partout au Maroc.",
};

export default function RootLayout({ children }) {
  return (
   
    <html lang="fr">
      <head>
       
        <meta charSet="utf-8" />
      </head>
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