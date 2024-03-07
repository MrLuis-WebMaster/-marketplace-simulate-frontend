import React, { useState } from "react";
import Paginator from "../../components/Paginator";
import ProductFilter from "../../components/Product/ProductFilter";
import Products from "../../components/Product/Products";
import { useGetPublicProductsQuery } from "../../services/products.service";
import Dropdown from "../../components/Dropdown";
import ErrorFeedback from "../../components/Product/ErrorFeedback";


const ProductsDashboard: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [filterParams, setFilterParams] = useState({
    page: currentPage.toString(),
    pageSize: "10",
    searchName: "",
    searchSku: "",
    minPrice: 0,
    maxPrice: 10000000,
  });

  const { data, isFetching, isLoading, isError } = useGetPublicProductsQuery({ ...filterParams });

  const handleFilterChange = (newFilterParams: Partial<typeof filterParams>) => {
    setCurrentPage(1);
    setFilterParams({ ...filterParams, ...newFilterParams, page: currentPage.toString() });
  };

  if (isError && !isFetching) {
    return <ErrorFeedback />;
  }

  const products = data?.data.products;

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-5">
        {Boolean(products?.length && data?.data?.meta?.totalPages) && <Paginator currentPage={currentPage} totalPages={data?.data?.meta?.totalPages} onPageChange={(page) => paginate(page)} />}
        <div className="ml-auto">
          <Dropdown>
            <Dropdown.Button className="text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 bg-purple-500">
              Filters
            </Dropdown.Button>
            <Dropdown.Body className="absolute z-10 top-full right-0 mt-2 bg-white border border-gray-300 rounded shadow-md p-4 w-72">
              <ProductFilter onFilterChange={handleFilterChange} />
            </Dropdown.Body>
          </Dropdown>
        </div>
      </div>
      <Products
        products={products}
        {
          ...{
            isFetching,
            isLoading,
            isError
          }
        }
      />
    </div>
  );
};

export default ProductsDashboard;
