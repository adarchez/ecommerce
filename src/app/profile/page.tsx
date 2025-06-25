// app/profile/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const [user, setUser] = useState<{ name: string; email: string } | null>(
    null
  );
  const router = useRouter();

  useEffect(() => {
    // Simulación de autenticación
    const fakeUser = {
      name: "John Doe",
      email: "john@example.com",
    };

    // Si no hay usuario, podrías redirigir o mostrar login
    setUser(fakeUser);
    // Si querés redireccionar cuando no hay sesión:
    // if (!fakeUser) router.push("/login");
  }, []);

  if (!user) {
    return <p className="text-center mt-10">Cargando perfil...</p>;
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white dark:bg-neutral-800 rounded-md shadow-md mt-6">
      <h1 className="text-2xl font-bold mb-4">Perfil de usuario</h1>
      <div className="space-y-2">
        <div>
          <span className="font-semibold">Nombre:</span> {user.name}
        </div>
        <div>
          <span className="font-semibold">Email:</span> {user.email}
        </div>
        {/* Agregá más info como dirección, historial, etc. */}
      </div>
    </div>
  );
}
