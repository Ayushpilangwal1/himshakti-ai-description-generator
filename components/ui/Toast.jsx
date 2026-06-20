"use client";

import { useContext, useEffect, useState } from "react";
import { ToastContext } from "@/hooks/useToast";

/**
 * Toast — notification component that auto-dismisses.
 *
 * Rendered by ToastProvider. Individual toasts animate in/out.
 * Types: "success" (green), "error" (red), "info" (blue).
 */

const typeStyles = {
  success: {
    bg: "bg-emerald-50 dark:bg-emerald-900/40 border-emerald-400 dark:border-emerald-600",
    text: "text-emerald-800 dark:text-emerald-200",
    icon: (
      <svg className="w-5 h-5 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
        <path
          fillRule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
          clipRule="evenodd"
        />
      </svg>
    ),
  },
  error: {
    bg: "bg-red-50 dark:bg-red-900/40 border-red-400 dark:border-red-600",
    text: "text-red-800 dark:text-red-200",
    icon: (
      <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
        <path
          fillRule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
          clipRule="evenodd"
        />
      </svg>
    ),
  },
  info: {
    bg: "bg-blue-50 dark:bg-blue-900/40 border-blue-400 dark:border-blue-600",
    text: "text-blue-800 dark:text-blue-200",
    icon: (
      <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
        <path
          fillRule="evenodd"
          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
          clipRule="evenodd"
        />
      </svg>
    ),
  },
};

function SingleToast({ id, message, type = "info", removeToast }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger enter animation
    requestAnimationFrame(() => setIsVisible(true));
  }, []);

  const style = typeStyles[type] || typeStyles.info;

  const handleDismiss = () => {
    setIsVisible(false);
    setTimeout(() => removeToast(id), 200);
  };

  return (
    <div
      role="alert"
      className={`flex items-start gap-3 w-full max-w-sm px-4 py-3 rounded-xl border shadow-lg backdrop-blur-sm
        transition-all duration-300 ease-out
        ${isVisible ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"}
        ${style.bg}`}
    >
      <span className="shrink-0 mt-0.5">{style.icon}</span>
      <p className={`text-sm font-medium flex-1 ${style.text}`}>{message}</p>
      <button
        onClick={handleDismiss}
        className="shrink-0 p-0.5 rounded-md text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors cursor-pointer"
        aria-label="Dismiss notification"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}

/**
 * ToastProvider — renders the toast container. Place in layout.
 * Uses the ToastContextProvider from hooks/useToast.js.
 */
export function ToastContainer() {
  const context = useContext(ToastContext);
  if (!context) return null;

  const { toasts, removeToast } = context;

  return (
    <div
      aria-live="polite"
      aria-atomic="true"
      className="fixed top-4 right-4 sm:right-6 z-[200] flex flex-col gap-3 items-end pointer-events-none"
    >
      {toasts.map((t) => (
        <div key={t.id} className="pointer-events-auto">
          <SingleToast {...t} removeToast={removeToast} />
        </div>
      ))}
    </div>
  );
}
