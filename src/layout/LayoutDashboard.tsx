import { ReactNode, useEffect, useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import 'boxicons';
import LoginUser from './components/LoginUser';

const SidebarLink = ({ to, children }: { children: ReactNode, to: string }) => {
    const location = useLocation();
    const isActive = location.pathname === to;

    return (
        <Link
            to={to}
            className={`flex items-center space-x-2 px-3 py-2 rounded-md transition-all ${isActive ? 'bg-gray-600' : 'hover:bg-gray-600'
                }`}
        >
            {children}
        </Link>
    );
};

const LayoutDashboard = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 768);

    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };

    useEffect(() => {
        const handleResize = () => {
            setSidebarOpen(window.innerWidth >= 768);
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div className="flex max-h-screen h-screen overflow-hidden">
            <aside
                className={`
                    w-90 bg-gray-800 flex-shrink-0 text-white p-4 
                    flex flex-col transition-all duration-500 ease-in 
                    fixed top-0 bottom-0 z-30 md:static ${isSidebarOpen ? '' : 'hidden'}`
                }
            >
                <div className="flex items-center mb-8">
                    <div className='flex items-center justify-between w-full'>
                        <Link to="/dashboard">
                            <span className="self-center text-2xl md:text-5xl font-black whitespace-nowrap truncate text-purple-500">
                                MarketJoy
                            </span>
                        </Link>
                        <button onClick={toggleSidebar} className='md:hidden'>
                            <i className='bx bx-x text-2xl md:text-xl'></i>
                        </button>
                    </div>
                </div>
                <nav>
                    <ul className="space-y-2">
                        <SidebarLink to="/dashboard/products">
                            <i className="bx bx-package text-2xl"></i>
                            <span>Products</span>
                        </SidebarLink>
                        <SidebarLink to="/dashboard/create-product">
                            <i className="bx bx-receipt text-2xl"></i>
                            <span>Create Product</span>
                        </SidebarLink>
                    </ul>
                </nav>
                <LoginUser />
                <div className='fixed bg-black bg-opacity-20 inset-0 z-[-1] md:hidden' onClick={toggleSidebar} role='button'></div>
            </aside>
            <div className="flex-grow overflow-y-auto">
                <header className="flex items-center justify-between bg-white border-b w-full p-5 sticky top-0 z-20">
                    <button
                        className="text-black focus:outline-none text-3xl"
                        onClick={toggleSidebar}
                    >
                        <i className="bx bx-menu"></i>
                    </button>
                    <Link to="/products" className="text-md flex items-center gap-2">
                        <i className="bx bx-store-alt h-8 w-8 text-2xl  md:text-lg md:h-5 md:w-5"></i>
                        <span className='hidden md:block'>
                            Back to marketplace
                        </span>
                    </Link>
                </header>
                <main className="p-5 text-black text-opacity-85">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default LayoutDashboard;
