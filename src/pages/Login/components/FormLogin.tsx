import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useLoginMutation } from "../../../services/auth.service";
import { useDispatch } from "react-redux";
import { setUser } from "../../../redux/slices/auth.slice";
import { useEffect } from "react";
import { ActionResponse } from "../../../types/server.type";
import toast from "react-hot-toast";
import Button from "../../../components/Button";

const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email address").required("Email is required"),
    password: Yup.string()
        .required("Password is required")
        .min(8, "Password must be at least 8 characters")
        .matches(
            /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^a-zA-Z\d])/,
            "Password must contain at least one number, one uppercase letter, and one special character"
        ),
});

const FormLogin = () => {
    const [login, { isLoading, data, isError }] = useLoginMutation()
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema,
        onSubmit: async (values) => {
            try {
                const response = await login(values) as ActionResponse<boolean>
                if (response.error) {
                    throw new Error(response.error.data.message || 'Internal Server Error')
                }
                toast.success('Good!')
                formik.resetForm({ values: formik.initialValues });
            } catch (error) {
                if (error instanceof Error) {
                    toast.error(error.message, {
                        duration: 5000,
                    });
                }
            }
        },
    });

    useEffect(() => {
        if (!isLoading && !isError && data?.data) {
            dispatch(setUser(data.data)), navigate('/products')
        }
    },[data, dispatch, isError, isLoading, navigate])

    return (
        <form className="space-y-4 md:space-y-6" onSubmit={formik.handleSubmit}>
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
                />
                {formik.touched.password && formik.errors.password && (
                    <p className="text-sm text-red-500">{formik.errors.password}</p>
                )}
            </div>
            <Button
                variant="primary"
                type="submit"
                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-purple-500 disabled:bg-opacity-60 disabled:cursor-not-allowed"
                disabled={isLoading}
            >
                {isLoading ? 'Loading...' : 'Login'}
            </Button>
            <p className="text-sm font-light text-gray-500">
                Don’t have an account yet? <Link to="/sign-up" className="font-medium text-primary-600 hover:underline">Sign up</Link>
            </p>
        </form>
    );
};

export default FormLogin;
