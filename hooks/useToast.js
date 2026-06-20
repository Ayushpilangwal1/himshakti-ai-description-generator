"use client";

import { createContext, useCallback, useContext, useState } from "react";

/**
 * useToast — custom hook for showing toast notifications.
 *
 * Usage:
 *   const { toast } = useToast();
 *   toast({ message: "Saved!", type: "success" });
 *
 * Types: "success" | "error" | "info"
 * Default duration: 3000ms
 */

const ToastContext = createContext(null);

let toastIdCounter = 0;

export function ToastContextProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback(({ message, type = "info", duration = 3000 }) => {
    const id = ++toastIdCounter;
    setToasts((prev) => [...prev, { id, message, type, duration }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, duration);

    return id;
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastContextProvider");
  }
  return {
    toast: context.addToast,
    removeToast: context.removeToast,
  };
}

export { ToastContext };
