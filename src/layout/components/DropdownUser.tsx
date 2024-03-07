import { Link } from 'react-router-dom'
import { UserRole } from '../../types/user.type'
import useAuth from '../../hooks/auth/useAuth'
import Dropdown from '../../components/Dropdown'

const DropdownUser = () => {
    const { auth, logout } = useAuth()

    return (
        <>
            {
                auth.isAuthenticated && (
                    <>
                        <Dropdown>
                            <Dropdown.Button className="flex items-center space-x-2 cursor-pointer py-2 px-3 rounded border">
                                <span className="block text-sm truncate">{auth.user?.name}</span>
                                <i className='bx bxs-user-circle'></i>
                            </Dropdown.Button>
                            <Dropdown.Body className="absolute z-[5] top-full right-0 mt-2 bg-white border border-gray-300 rounded shadow-md p-4 w-full">
                                <span className="block text-sm truncate">Login with</span>
                                <span className="block truncate italic mb-2 text-xs">{auth.user?.email}</span>
                                <hr className='mb-2' />
                                {auth.isAuthenticated && (auth?.user?.role === UserRole.ADMIN || auth?.user?.role === UserRole.SELLER) && (
                                    <Link to="/dashboard" className="block mb-2 text-gray-500">
                                        Dashboard
                                    </Link>
                                )}
                                <span
                                    role="button"
                                    onClick={() => logout()}
                                    className="block text-red-500 cursor-pointer"
                                >
                                    Sign out
                                </span>
                            </Dropdown.Body>
                        </Dropdown>
                    </>
                )
            }
            {
                !auth.isAuthenticated && (

                    <Link to="/login" className="text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 bg-purple-500">
                        Log In
                    </Link>
                )
            }
        </>
    )
}

export default DropdownUser