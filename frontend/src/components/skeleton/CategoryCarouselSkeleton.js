const CategoryCarouselSkeleton = ({ count = 5 }) => (
  <div
    className="flex gap-4 overflow-hidden my-10 px-3 animate-pulse"
    aria-hidden="true"
  >
    {Array.from({ length: count }).map((_, i) => (
      <div
        key={i}
        className="flex-shrink-0 w-56 sm:w-64 min-h-[240px] sm:min-h-[260px] bg-white rounded-2xl border border-gray-100 overflow-hidden"
      >
        <div className="aspect-[4/3] bg-gray-100" />
        <div className="px-4 py-4 border-t border-gray-50">
          <div className="h-3 bg-gray-100 rounded w-3/4 mx-auto" />
        </div>
      </div>
    ))}
  </div>
);

export default CategoryCarouselSkeleton;
