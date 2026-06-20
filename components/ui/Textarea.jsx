"use client";

/**
 * Textarea — reusable multi-line form input component.
 *
 * Props:
 *  @param {string} label — field label text
 *  @param {string} placeholder — placeholder text
 *  @param {string} value — controlled input value
 *  @param {function} onChange — change handler
 *  @param {string} error — error message (shown in red below the field)
 *  @param {number} rows — number of visible text lines (default: 4)
 *  @param {string} id — input id (auto-generated from label if not provided)
 *  @param {string} className — additional CSS classes for the wrapper
 */
export function Textarea({
  label,
  placeholder,
  value,
  onChange,
  error,
  rows = 4,
  id,
  className = "",
  ...rest
}) {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

  return (
    <div className={className}>
      {label && (
        <label
          htmlFor={inputId}
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5"
        >
          {label}
        </label>
      )}
      <textarea
        id={inputId}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        rows={rows}
        className={`w-full rounded-lg px-4 py-3 text-sm transition-colors duration-200 resize-y
          bg-white dark:bg-gray-800
          border ${error ? "border-red-500" : "border-gray-300 dark:border-gray-700"}
          text-gray-900 dark:text-white
          placeholder-gray-400 dark:placeholder-gray-500
          focus:outline-none focus:border-brand-green focus:ring-2 focus:ring-brand-green/30
        `}
        {...rest}
      />
      {error && (
        <p className="mt-1.5 text-sm text-red-500 flex items-center gap-1">
          <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
              clipRule="evenodd"
            />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
}
