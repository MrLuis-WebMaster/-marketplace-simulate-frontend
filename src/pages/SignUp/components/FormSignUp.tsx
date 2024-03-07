import { useFormik } from "formik";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { UserRole } from "../../../types/user.type";
import { useCreateCustomerMutation, useCreateSellerMutation } from "../../../services/user.service";
import toast from "react-hot-toast";
import { ActionResponse } from "../../../types/server.type";
import Button from "../../../components/Button";


const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email address").required("Email is required"),
    password: Yup.string()
        .required("Password is required")
        .min(8, "Password must be at least 8 characters")
        .matches(
            /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^a-zA-Z\d])/,
            "Password must contain at least one number, one uppercase letter, and one special character"
        ),
});

const FormSignUp = ({ role }: { role: UserRole}) => {
    const [createCustomer, { isLoading: isLoadingCustomer }] = useCreateCustomerMutation()
    const [createSeller,  { isLoading: isLoadingSeller }] = useCreateSellerMutation()
    const actions: Record<string, (values: { name: string; email: string; password: string; }) => Promise<unknown>> = {
        [UserRole.CUSTOMER]: (values) => createCustomer(values),
        [UserRole.SELLER]: (values) => createSeller(values),
    }
    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            password: "",
        },
        validationSchema,
        onSubmit: async (values) => {
            try {
                const response = await actions[role](values) as ActionResponse<boolean>
                if (response.error) {
                    throw new Error(response.error.data.message || 'Internal Server Error')
                }
                toast.success('User created')
                formik.resetForm({ values: formik.initialValues });
            } catch (error) {
                if (error instanceof Error) {
                    console.error(error);
                    toast.error(error.message, {
                        duration: 5000,
                    });
                }
            }
        },
    });

    return (
        <form className="space-y-4 md:space-y-6" onSubmit={formik.handleSubmit}>
            <div>
                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">
                    Your name
                </label>
                <input
                    type="text"
                    name="name"
                    id="name"
                    className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 ${formik.touched.name && formik.errors.name ? "border-red-500" : ""
                        }`}
                    placeholder="John Doe"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.name}
                    required
                    autoComplete="off"
                />
                {formik.touched.name && formik.errors.name && (
                    <p className="text-sm text-red-500">{formik.errors.name}</p>
                )}
            </div>
            <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">
                    Your email
                </label>
                <input
                    type="email"
                    name="email"
                    id="email"
                    className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 ${formik.touched.email && formik.errors.email ? "border-red-500" : ""
                        }`}
                    placeholder="name@company.com"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                    required
                    autoComplete="off"
                />
                {formik.touched.email && formik.errors.email && (
                    <p className="text-sm text-red-500">{formik.errors.email}</p>
                )}
            </div>
            <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">
                    Password
                </label>
                <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 ${formik.touched.password && formik.errors.password ? "border-red-500" : ""
                        }`}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                    required
                    autoComplete="off"
                />
                {formik.touched.password && formik.errors.password && (
                    <p className="text-sm text-red-500">{formik.errors.password}</p>
                )}
            </div>
            <Button
                variant="primary"
                type="submit"
                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-purple-500 disabled:bg-opacity-60 disabled:cursor-not-allowed"
                disabled={isLoadingCustomer || isLoadingSeller}
                >
                {isLoadingCustomer || isLoadingSeller ? 'Loading...' : 'Sign Up'}
            </Button>
            <p className="text-sm font-light text-gray-500">
                Already have an account? <Link to="/login" className="font-medium text-primary-600 hover:underline">Login</Link>
            </p>
        </form>
    );
};

export default FormSignUp;
