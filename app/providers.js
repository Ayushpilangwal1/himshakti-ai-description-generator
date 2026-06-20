"use client";

import { ThemeProvider } from "@/context/ThemeContext";
import { ToastContextProvider } from "@/hooks/useToast";
import { ToastContainer } from "@/components/ui/Toast";

/**
 * ClientProviders — wraps children with ThemeProvider and ToastProvider.
 * Extracted into a client component so the root layout stays as a server component.
 */
export function ClientProviders({ children }) {
  return (
    <ThemeProvider>
      <ToastContextProvider>
        {children}
        <ToastContainer />
      </ToastContextProvider>
    </ThemeProvider>
  );
}
