"use client";

/**
 * Button — reusable button component.
 *
 * Props:
 *  @param {"primary"|"secondary"|"outline"} variant — visual style (default: "primary")
 *  @param {"sm"|"md"|"lg"} size — size preset (default: "md")
 *  @param {boolean} disabled — disabled state
 *  @param {function} onClick — click handler
 *  @param {React.ReactNode} children — button content
 *  @param {string} className — additional CSS classes
 *  @param {string} type — button type attribute (default: "button")
 */
export function Button({
  variant = "primary",
  size = "md",
  disabled = false,
  onClick,
  children,
  className = "",
  type = "button",
  ...rest
}) {
  const baseClasses =
    "inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-green cursor-pointer";

  const variantClasses = {
    primary:
      "bg-brand-green hover:bg-brand-green-hover text-white shadow-md hover:shadow-lg active:scale-[0.98]",
    secondary:
      "bg-brand-navy hover:bg-brand-navy-hover text-white shadow-md hover:shadow-lg active:scale-[0.98]",
    outline:
      "border-2 border-gray-400 dark:border-gray-600 bg-transparent text-gray-700 dark:text-gray-300 hover:border-brand-green hover:text-brand-green active:scale-[0.98]",
  };

  const sizeClasses = {
    sm: "px-4 py-1.5 text-sm gap-1.5",
    md: "px-6 py-2.5 text-sm gap-2",
    lg: "px-8 py-3 text-base gap-2",
  };

  const disabledClasses = disabled
    ? "opacity-50 cursor-not-allowed pointer-events-none"
    : "";

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${baseClasses} ${variantClasses[variant] || variantClasses.primary} ${sizeClasses[size] || sizeClasses.md} ${disabledClasses} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}
