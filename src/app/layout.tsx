import "./globals.css";
import { ReactNode } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import { ToastProvider } from "@/context/ToastContext";
import { ThemeProvider } from "next-themes";

export const metadata = {
  title: "My E-commerce Store",
  description: "E-commerce created with Next.js + Tailwind",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className="min-h-screen flex flex-col font-sans bg-neutral-200 text-gray-900 dark:bg-black dark:text-gray-100">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
        >
          <ToastProvider>
            <CartProvider>
              <WishlistProvider>
                <Navbar />
                <main className="flex-1 container mx-auto px-4 py-4">
                  {children}
                </main>
                <Footer />
              </WishlistProvider>
            </CartProvider>
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
