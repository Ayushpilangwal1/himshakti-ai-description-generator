"use client";

/**
 * Loader — loading indicator component.
 *
 * Props:
 *  @param {"spinner"|"skeleton"} type — loader variant (default: "spinner")
 *  @param {string} className — additional CSS classes (especially useful for skeleton sizing)
 *
 * Spinner: animated rotating circle with brand green accent.
 * Skeleton: pulsing gray block — use className to set desired height/width.
 */
export function Loader({ type = "spinner", className = "" }) {
  if (type === "skeleton") {
    return (
      <div
        className={`animate-pulse rounded-xl bg-gray-200 dark:bg-gray-800 ${className}`}
        role="status"
        aria-label="Loading content"
      >
        <span className="sr-only">Loading...</span>
      </div>
    );
  }

  // spinner (default)
  return (
    <div
      className={`flex items-center justify-center ${className}`}
      role="status"
      aria-label="Loading"
    >
      <div className="relative">
        {/* Outer ring */}
        <div className="w-10 h-10 rounded-full border-4 border-gray-200 dark:border-gray-700" />
        {/* Spinning arc */}
        <div className="absolute inset-0 w-10 h-10 rounded-full border-4 border-transparent border-t-brand-green animate-spin" />
      </div>
      <span className="sr-only">Loading...</span>
    </div>
  );
}
