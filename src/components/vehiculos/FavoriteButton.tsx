"use client";

import { useState, useEffect, useTransition } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

interface FavoriteButtonProps {
  vehicleId: string;
  /** Variante visual: "icon" muestra solo el corazón, "full" muestra texto */
  variant?: "icon" | "full";
  className?: string;
}

export default function FavoriteButton({
  vehicleId,
  variant = "icon",
  className = "",
}: FavoriteButtonProps) {
  const [isFav, setIsFav] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const supabase = createClient();

  // Verificar si el vehículo ya está en favoritos del usuario
  useEffect(() => {
    let cancelled = false;

    async function check() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user || cancelled) {
        setLoading(false);
        return;
      }

      const { data } = await supabase
        .from("favorites")
        .select("id")
        .eq("user_id", user.id)
        .eq("vehicle_id", vehicleId)
        .maybeSingle();

      if (!cancelled) {
        setIsFav(!!data);
        setLoading(false);
      }
    }

    check();
    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [vehicleId]);

  async function handleToggle(e: React.MouseEvent) {
    e.preventDefault(); // Evitar navegación si está dentro de un <Link>
    e.stopPropagation();

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      // No logueado → enviar al login
      router.push(`/auth/login?redirect=${encodeURIComponent(window.location.pathname)}`);
      return;
    }

    startTransition(async () => {
      if (isFav) {
        // Quitar de favoritos
        await supabase
          .from("favorites")
          .delete()
          .eq("user_id", user.id)
          .eq("vehicle_id", vehicleId);
        setIsFav(false);
      } else {
        // Añadir a favoritos
        await supabase
          .from("favorites")
          .insert({ user_id: user.id, vehicle_id: vehicleId });
        setIsFav(true);
      }
    });
  }

  if (loading) {
    // Skeleton mientras carga
    if (variant === "icon") {
      return (
        <button
          disabled
          className={`w-9 h-9 rounded-full bg-[var(--color-negro-3)] flex items-center justify-center opacity-40 ${className}`}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-gris)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>
      );
    }
    return null;
  }

  if (variant === "icon") {
    return (
      <button
        onClick={handleToggle}
        disabled={isPending}
        className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 ${
          isFav
            ? "bg-red-500/20 text-red-400 hover:bg-red-500/30"
            : "bg-[var(--color-negro-3)]/80 text-[var(--color-gris)] hover:text-red-400 hover:bg-red-500/10"
        } backdrop-blur-sm ${isPending ? "opacity-60" : ""} ${className}`}
        title={isFav ? "Quitar de favoritos" : "Añadir a favoritos"}
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill={isFav ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
      </button>
    );
  }

  // variant === "full"
  return (
    <button
      onClick={handleToggle}
      disabled={isPending}
      className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
        isFav
          ? "bg-red-500/15 text-red-400 border border-red-500/20 hover:bg-red-500/25"
          : "bg-[var(--color-negro-3)] text-[var(--color-gris-claro)] border border-[var(--color-borde)] hover:border-red-500/30 hover:text-red-400"
      } ${isPending ? "opacity-60 cursor-not-allowed" : ""} ${className}`}
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill={isFav ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
      {isFav ? "En favoritos" : "Guardar favorito"}
    </button>
  );
}
