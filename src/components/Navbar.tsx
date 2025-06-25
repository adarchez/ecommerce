"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useTheme } from "next-themes";
import { useEffect, useState, useRef } from "react";
import { ShoppingCart, Heart, User, Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

export default function Navbar() {
  const { cart } = useCart();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // 🟨 Mantener el valor del input al recargar
  useEffect(() => {
    const current = searchParams.get("search") || "";
    setSearchTerm(current);
  }, [searchParams]);

  // 🟩 Debounce: espera 300ms después de escribir para actualizar la URL
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      const params = new URLSearchParams(window.location.search);
      if (searchTerm) {
        params.set("search", searchTerm);
      } else {
        params.delete("search");
      }
      router.push(`${pathname}?${params.toString()}`);
    }, 300);

    return () => clearTimeout(delayDebounce); // limpia timeout si el usuario sigue escribiendo
  }, [searchTerm]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // Para evitar errores de hidratación
  useEffect(() => setMounted(true), []);

  // Sumar cantidad total
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  // Cerrar el menú si se hace clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  if (!mounted) {
    // Para evitar mismatches, puedes devolver null o un loader mínimo
    return null;
  }

  return (
    <nav className="bg-neutral-100 shadow-md dark:bg-neutral-800 dark:text-white">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link
          href="/"
          className="text-xl font-bold text-slate-900 dark:text-slate-300"
        >
          E-commerce
        </Link>
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Buscar productos..."
          className="px-3 py-1.5 border border-gray-300 rounded-md w-64 text-black dark:text-white bg-white dark:bg-neutral-700 focus:outline-none focus:ring focus:border-blue-300"
        />
        <div className="space-x-5 flex items-center relative">
          {mounted && (
            <button
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              className="transition pr-2 cursor-pointer"
            >
              {theme === "light" ? (
                <Moon className="w-6 h-6 hover:text-blue-700 text-slate-700" />
              ) : (
                <Sun className="w-6 h-6 hover:text-yellow-500 text-slate-300" />
              )}
            </button>
          )}
          <Link href="/wishlist">
            <Heart className="w-6 h-6 text-slate-800 dark:text-slate-300 hover:text-pink-700 transition" />
          </Link>

          <Link href="/cart" className="relative block">
            <ShoppingCart className="w-6 h-6 text-slate-800 dark:text-slate-300 hover:text-indigo-700 transition" />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-xs text-slate-300 rounded-full px-1.5 py-0.5 shadow">
                {totalItems}
              </span>
            )}
          </Link>
          {/* User menu */}
          <div className="relative" ref={dropdownRef}>
            <button onClick={() => setMenuOpen(!menuOpen)}>
              <User className="w-6 h-6 text-text-slate-800 dark:text-slate-300 cursor-pointer" />
            </button>
            <AnimatePresence>
              {menuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-2 w-40 bg-white border dark:bg-neutral-800 border-gray-200 dark:border-gray-700 rounded-md shadow-md z-50 py-2 cursor-pointer"
                >
                  <Link
                    href="/profile"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-neutral-700"
                    onClick={closeMenu}
                  >
                    Account
                  </Link>
                  <Link
                    href="/orders"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-neutral-700"
                    onClick={closeMenu}
                  >
                    My orders
                  </Link>
                  <Link
                    href="/"
                    className="block px-4 py-2 hover:bg-gray-100 text-red-600 dark:hover:bg-neutral-700"
                    onClick={closeMenu}
                  >
                    Log out
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </nav>
  );
}
