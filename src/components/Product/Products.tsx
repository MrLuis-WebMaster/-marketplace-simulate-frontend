import { Product } from "../../types/produc.type"
import CardProduct from "./CardProduct"
import CardProductSkeleton from "./CardProductSkeleton"

interface ProductsProps {
    products?: Product[]
    isFetching: boolean
    isLoading: boolean
    isError: boolean
}

const Products = ({ products, isFetching, isLoading, isError}: ProductsProps) => {
  const gridClass = "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
  return (
    <>
          {Boolean(!products?.length && !isFetching) && (<div>No products available.</div>)}
          {
              (isLoading || isFetching) && !isError && (
                  <div className={gridClass}>
                      {[...Array(10)].map((_, index) => (
                          <CardProductSkeleton key={index} />
                      ))}
                  </div>
              )
          }
          {
              Boolean(products?.length) && !isFetching  && (
                  <div className={gridClass}>
                      {products?.map((product) => (
                          <CardProduct key={product.id} {...product} />
                      ))}
                  </div>
              )
          }
    </>
  )
}

export default Products