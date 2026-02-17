"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

export default function BackToHome() {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    // If we are NOT on the home page
    if (pathname !== "/") {
      // 1. Push a dummy state to history so "Back" doesn't leave the app immediately
      // This creates a buffer: [Previous, Current, Current(Buffer)]
      window.history.pushState(null, "", window.location.href);

      // 2. Listen for the Back button
      const handlePopState = () => {
        // user pressed back, consumed the buffer
        // Now redirect specifically to Home
        router.push("/");
      };

      window.addEventListener("popstate", handlePopState);

      return () => {
        window.removeEventListener("popstate", handlePopState);
      };
    }
  }, [pathname, router]);

  return null;
}
