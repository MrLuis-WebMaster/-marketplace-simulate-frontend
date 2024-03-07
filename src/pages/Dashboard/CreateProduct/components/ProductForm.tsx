import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { ProductFormValues } from '../../../../types/produc.type';
import { useCreateProductMutation } from '../../../../services/products.service';
import toast from 'react-hot-toast';
import { ActionResponse } from '../../../../types/server.type';
import Button from '../../../../components/Button';


const ProductForm: React.FC = () => {
    const [createProduct, { isLoading }] = useCreateProductMutation()
    const productSchema = Yup.object({
        name: Yup.string().required('Name is required'),
        sku: Yup.string()
            .required('SKU is required')
            .matches(/^[a-zA-Z0-9]{6}$/, 'SKU must be alphanumeric and have a length of 6 characters'),
        quantity: Yup.number()
            .required('Quantity is required')
            .min(1, 'Quantity must be greater than 0'),
        price: Yup.number()
            .required('Price is required')
            .min(0, 'Price must be non-negative'),
    });

    const initialValues: ProductFormValues = {
        name: '',
        sku: '',
        quantity: 0,
        price: 0,
    };

    const handleSubmit = async (values: ProductFormValues) => {
        try {
            const response = await createProduct(values) as ActionResponse<boolean>
            if (response.error) {
                console.log(response)
                throw new Error(response.error.data.message || 'Internal Server Error')
            }
            toast.success('Created!', {
                position: 'top-right',
            })
            formik.resetForm({ values: formik.initialValues });
        } catch (error) {
            if (error instanceof Error) {
                toast.error(error.message, {
                    position: 'top-right',
                    duration: 5000,
                });
            }
        }
    };

    const formik = useFormik({
        initialValues,
        validationSchema: productSchema,
        onSubmit: handleSubmit,
    });

    return (
        <form className="space-y-4 md:space-y-6" onSubmit={formik.handleSubmit}>
            <div>
                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">
                    Product Name
                </label>
                <input
                    type="text"
                    name="name"
                    id="name"
                    className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 ${formik.touched.name && formik.errors.name ? 'border-red-500' : ''}`}
                    placeholder="Product Name"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.name}
                    required
                />
                {formik.touched.name && formik.errors.name && (
                    <p className="text-sm text-red-500">{formik.errors.name}</p>
                )}
            </div>
            <div>
                <label htmlFor="sku" className="block mb-2 text-sm font-medium text-gray-900">
                    SKU
                </label>
                <input
                    type="text"
                    name="sku"
                    id="sku"
                    className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 ${formik.touched.sku && formik.errors.sku ? 'border-red-500' : ''}`}
                    placeholder="SKU"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.sku}
                    required
                />
                {formik.touched.sku && formik.errors.sku && (
                    <p className="text-sm text-red-500">{formik.errors.sku}</p>
                )}
            </div>
            <div>
                <label htmlFor="quantity" className="block mb-2 text-sm font-medium text-gray-900">
                    Quantity
                </label>
                <input
                    type="number"
                    name="quantity"
                    id="quantity"
                    className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 ${formik.touched.quantity && formik.errors.quantity ? 'border-red-500' : ''}`}
                    placeholder="Quantity"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.quantity}
                    required
                />
                {formik.touched.quantity && formik.errors.quantity && (
                    <p className="text-sm text-red-500">{formik.errors.quantity}</p>
                )}
            </div>
            <div>
                <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900">
                    Price
                </label>
                <input
                    type="number"
                    name="price"
                    id="price"
                    className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 ${formik.touched.price && formik.errors.price ? 'border-red-500' : ''}`}
                    placeholder="Price"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.price}
                    required
                />
                {formik.touched.price && formik.errors.price && (
                    <p className="text-sm text-red-500">{formik.errors.price}</p>
                )}
            </div>
            <Button
                variant="primary"
                type="submit"
                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-purple-500 disabled:bg-opacity-60 disabled:cursor-not-allowed"
                disabled={isLoading}
            >
                {isLoading ? 'Loading...' : 'Create Product'}
            </Button>
        </form>
    );
};

export default ProductForm;
