/**
 * components/ui/index.js
 *
 * Barrel export for the HimShakti UI component library.
 * Usage: import { Button, Input, Modal, Loader } from "@/components/ui";
 */

export { Button } from "./Button";
export { Input } from "./Input";
export { Modal } from "./Modal";
export { ToastContainer } from "./Toast";
export { Loader } from "./Loader";

// Re-export the toast hook for convenience
export { useToast } from "@/hooks/useToast";
