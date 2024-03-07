import React, { useCallback, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Filters } from "../../types/produc.type";
import useAuth from "../../hooks/auth/useAuth";
import { useSellersUsersMutation } from "../../services/user.service";

interface ProductFilterProps {
    onFilterChange: (filters: Filters) => void;
}

const ProductFilter: React.FC<ProductFilterProps> = ({ onFilterChange }) => {
    const { isAdmin } = useAuth();
    const [sellersUsers, { data, isLoading, isError }] = useSellersUsersMutation()

    const fetchingSellers = useCallback(async () => {
        try {
            await sellersUsers('');
        } catch (error) {
            console.error("Error fetching user:", error);
        }
    }, [sellersUsers]);

    const initialValues = {
        page: "1",
        pageSize: "10",
        searchName: "",
        searchSku: "",
        minPrice: 0,
        maxPrice: 100000000000,
    }

    const formik = useFormik({
        initialValues: {
            ...initialValues,
            userId: 0,
        },
        validationSchema: Yup.object({
            searchName: Yup.string().max(255, "Search Name must be 255 characters or less"),
            searchSku: Yup.string().max(255, "Search SKU must be 255 characters or less"),
            minPrice: Yup.number().typeError("Min Price must be a number").min(0, "Min Price must be a non-negative number"),
            maxPrice: Yup.number()
                .typeError("Max Price must be a number")
                .min(0, "Max Price must be a non-negative number")
                .when("minPrice", (minPrice, schema) => schema.min(Number(minPrice || 0), "Max Price must be greater than or equal to Min Price")),
            userId: isAdmin ? Yup.number().optional() : Yup.string().optional(),
        }),
        onSubmit: (values) => {
            onFilterChange(values);
        },
    });

    const handleResetFilters = () => {
        formik.resetForm();
        onFilterChange(formik.initialValues);
    };

    useEffect(() => {
        if (isAdmin) {
            fetchingSellers()
        }
    }, [fetchingSellers, isAdmin])

    return (
        <form onSubmit={formik.handleSubmit} className="mb-4">
            <div className="grid grid-cols-1 gap-4">
                <div className="mb-4">
                    <label htmlFor="searchName" className="block text-sm font-medium text-gray-700 mb-1">
                        Search Name:
                    </label>
                    <input
                        type="text"
                        name="searchName"
                        id="searchName"
                        value={formik.values.searchName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="w-full border border-gray-300 p-2 rounded-md focus:ring focus:ring-blue-200 focus:outline-none"
                    />
                    {formik.touched.searchName && formik.errors.searchName && <div className="text-red-500 text-sm">{formik.errors.searchName}</div>}
                </div>
                <div className="mb-4">
                    <label htmlFor="searchSku" className="block text-sm font-medium text-gray-700 mb-1">
                        Search SKU:
                    </label>
                    <input
                        type="text"
                        name="searchSku"
                        id="searchSku"
                        value={formik.values.searchSku}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="w-full border border-gray-300 p-2 rounded-md focus:ring focus:ring-blue-200 focus:outline-none"
                    />
                    {formik.touched.searchSku && formik.errors.searchSku && <div className="text-red-500 text-sm">{formik.errors.searchSku}</div>}
                </div>
                <div className="mb-4">
                    <label htmlFor="minPrice" className="block text-sm font-medium text-gray-700 mb-1">
                        Min Price:
                    </label>
                    <input
                        type="number"
                        name="minPrice"
                        id="minPrice"
                        value={formik.values.minPrice}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="w-full border border-gray-300 p-2 rounded-md focus:ring focus:ring-blue-200 focus:outline-none"
                    />
                    {formik.touched.minPrice && formik.errors.minPrice && <div className="text-red-500 text-sm">{formik.errors.minPrice}</div>}
                </div>
                <div className="mb-4">
                    <label htmlFor="maxPrice" className="block text-sm font-medium text-gray-700 mb-1">
                        Max Price:
                    </label>
                    <input
                        type="number"
                        name="maxPrice"
                        id="maxPrice"
                        value={formik.values.maxPrice}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="w-full border border-gray-300 p-2 rounded-md focus:ring focus:ring-blue-200 focus:outline-none"
                    />
                    {formik.touched.maxPrice && formik.errors.maxPrice && <div className="text-red-500 text-sm">{formik.errors.maxPrice}</div>}
                </div>
                {isAdmin && !isError && (
                    <div className="mb-4">
                        <label htmlFor="seller" className="block text-sm font-medium text-gray-700 mb-1">
                            Seller:
                        </label>
                        <select
                            name="userId"
                            id="userId"
                            value={formik.values.userId}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className="w-full border border-gray-300 p-2 rounded-md focus:ring focus:ring-blue-200 focus:outline-none"
                            disabled={isLoading}
                        >
                            <option value="">Select Seller</option>
                            {
                                data?.data.map(seller => {
                                    return (
                                        <option key={seller.id} value={seller.id}>{seller.name}</option>
                                    )
                                })
                            }
                        </select>
                        {formik.touched.userId && formik.errors.userId && <div className="text-red-500 text-sm">{formik.errors.userId}</div>}
                    </div>
                )}
            </div>
            <div className="flex gap-4 mt-2">
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                    Apply Filters
                </button>
                <button type="button" onClick={handleResetFilters} className="bg-gray-300 text-gray-700 px-4 py-2 rounded">
                    Reset Filters
                </button>
            </div>
        </form>
    );
};

export default ProductFilter;
