"use client";

const UserCardSkeleton = () => {
  return (
    <div className="card bg-white rounded-lg overflow-hidden border border-border-color animate-pulse-slow">
      <div className="p-5 flex flex-col md:flex-row md:items-center gap-5">
        <div className="flex-shrink-0">
          <div className="relative w-20 h-20 rounded-full bg-gray-200 shadow-md"></div>
        </div>

        <div className="flex-grow">
          <div className="h-6 bg-gray-200 rounded w-3/4 mb-3"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2 mt-2">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
            </div>

            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
            </div>

            <div className="flex items-center gap-2 md:col-span-2">
              <div className="w-4 h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
            </div>

            <div className="flex items-center gap-2 md:col-span-2">
              <div className="w-4 h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-3 border-t border-border-color pt-3 px-5 pb-4">
        <div className="flex justify-between items-center">
          <div className="h-5 bg-gray-200 rounded w-20"></div>
          <div className="flex gap-2">
            <div className="h-6 bg-gray-200 rounded w-16"></div>
            <div className="h-6 bg-gray-200 rounded w-16"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCardSkeleton;
