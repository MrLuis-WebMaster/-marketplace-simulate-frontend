import { Link, Outlet, useLocation } from "react-router-dom";
import { useState } from "react";
import DropdownUser from "./components/DropdownUser";

const LayoutWithMenu = () => {
    const location = useLocation();
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <>
            <header className="border-gray-200 bg-white relative">
                <nav className="flex gap-4 container mx-auto px-6 sm:px-12 justify-between">
                    <div className="flex flex-wrap items-center justify-between py-4 flex-grow">
                        <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                            <span className="self-center text-2xl font-black whitespace-nowrap text-purple-800">MarketJoy</span>
                        </Link>
                        <button
                            type="button"
                            onClick={toggleMobileMenu}
                            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
                        >
                            <span className="sr-only">Open main menu</span>
                            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                            </svg>
                        </button>
                        <div
                            className={`${isMobileMenuOpen ? "block absolute top-16 left-0 right-0 z-10 bg-white rounded-lg shadow-md" : "hidden"
                                } w-full md:w-auto md:flex md:items-center ml-auto`}
                        >
                            <ul className="flex flex-col font-medium mt-4 rounded-lg bg-gray-50 lg:gap-4 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-transparent">
                                <li>
                                    <Link
                                        to="/"
                                        className={`block py-2 px-3 rounded ${location.pathname === "/" ? "border-b-4 rounded-none border-blue-700" : "text-blue-700 hover:bg-blue-100"
                                            }`}
                                    >
                                        Home
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/products"
                                        className={`block py-2 px-3 rounded ${location.pathname === "/products" ? "border-b-4 rounded-none border-blue-700" : "text-blue-700 hover:bg-blue-100"
                                            }`}
                                    >
                                        Products
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <DropdownUser />
                    </div>
                </nav>
            </header>
            <main className="container mx-auto px-6 sm:px-12 py-8">
                <Outlet />
            </main>
        </>
    );
};

export default LayoutWithMenu;
