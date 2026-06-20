export default function Card({ title, description, image, actionLabel = "View Details" }) {
  return (
    <div className="bg-white dark:bg-brand-dark-card rounded-xl shadow-lg overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border border-gray-200 dark:border-gray-800">
      {/* Image */}
      <div className="h-48 bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
        {image ? (
          <img src={image} alt={title} className="w-full h-full object-cover" />
        ) : (
          <span className="text-5xl">📦</span>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{description}</p>

        <button className="mt-4 w-full bg-brand-green hover:bg-brand-green-hover text-white text-sm font-semibold py-2.5 rounded-lg transition-colors cursor-pointer active:scale-[0.98]">
          {actionLabel}
        </button>
      </div>
    </div>
  );
}
