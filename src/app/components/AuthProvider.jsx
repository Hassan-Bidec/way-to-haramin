"use client";

import { useAuthStore } from "@/lib/useAuthStore";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AuthProvider({ children }) {
  const router = useRouter();
  const pathname = usePathname();

  const { user, token, hydrated } = useAuthStore();

  const protectedRoutes = [
    "/dashboard",
    "/Book",
    "/Service",
    "/myrides",
    "/support",
    "/profile",
  ];

  const authPages = ["/login", "/register", "/auth"];

  useEffect(() => {
    // ❗ Wait for Zustand hydration
    if (!hydrated) return;

    const isLoggedIn = !!token;

    // Not logged in → trying protected
    if (!isLoggedIn && protectedRoutes.includes(pathname)) {
      router.replace("/auth");
      return;
    }

    // Logged in → trying login/register pages
    if (isLoggedIn && authPages.includes(pathname)) {
      router.replace("/dashboard");
    }
  }, [pathname, token, hydrated]);

  if (!hydrated) return null; // Prevent flickers

  return children;
}
