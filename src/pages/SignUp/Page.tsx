import { Link, Outlet, useLocation } from "react-router-dom";

const SignUp = () => {
    const location = useLocation();
    return (
        <section className="bg-gray-50 min-h-screen flex items-center justify-center px-6 py-8 mx-auto">
            <div className="w-full lg:max-w-[70%] bg-white rounded-lg shadow p-8 gap-8 flex flex-col lg:flex-row min-h-[430px] flex-wrap">
                <div className="flex-grow lg:max-w-[50%]">
                    <h2 className="text-2xl font-bold">Sign Up</h2>
                    <p className="mb-4">Choose your role:</p>
                    <div className="mb-4">
                        <Link
                            to="/sign-up/customer"
                            className={`block bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300 ${location.pathname.includes('customer') ? 'ring ring-blue-600 border-blue-300' : 'bg-opacity-50'}`}
                        >
                            Register as Customer
                        </Link>
                        <p className="text-gray-700 mt-1">
                            As a customer, you can browse products and make purchases.
                        </p>
                    </div>
                    <div className="mb-4">
                        <Link
                            to="/sign-up/seller"
                            className={`block bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none focus:ring focus:border-green-300 ${location.pathname.includes('seller') ? 'ring ring-green-600 border-green-300' : 'bg-opacity-50'}`}
                        >
                            Register as Seller
                        </Link>
                        <p className="text-gray-700 mt-1">
                            As a seller, you can create and manage your own products.
                        </p>
                    </div>
                </div>
                <div className="flex-grow lg:max-w-[50%]">
                    <Outlet />
                </div>
                <Link to="/" className="text-center block w-full">Back to home</Link>
            </div>
        </section>
    );
}

export default SignUp;
