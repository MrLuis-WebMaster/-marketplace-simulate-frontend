
const CardProductSkeleton = () => {
  return (
      <div className="animate-pulse bg-white border p-4 rounded">
          <div className="h-40 w-full bg-gray-200 rounded mb-5"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-3"></div>
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-5"></div>
          <div className="h-10 bg-gray-200 rounded w-full"></div>
      </div>
  )
}

export default CardProductSkeleton