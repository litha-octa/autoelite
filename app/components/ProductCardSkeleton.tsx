export default function ProductCardSkeleton() {
  return (
    <div className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm animate-pulse">
      <div className="bg-gray-100 h-48" />
      <div className="p-4 space-y-3">
        <div className="h-4 bg-gray-100 rounded w-3/4" />
        <div className="space-y-1.5">
          <div className="h-3 bg-gray-50 rounded w-full" />
          <div className="h-3 bg-gray-50 rounded w-5/6" />
        </div>
        <div className="flex items-center justify-between pt-1">
          <div className="h-5 bg-gray-100 rounded w-20" />
          <div className="h-7 bg-gray-100 rounded w-14" />
        </div>
      </div>
    </div>
  );
}
