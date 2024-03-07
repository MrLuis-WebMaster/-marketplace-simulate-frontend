import { ReactNode, useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { logout } from '../redux/slices/auth.slice'
import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import { UserRole } from '../types/user.type'

const PrivateRoute = ({ children, roles }: {children: ReactNode, roles: UserRole[]}) => {
    const user = useSelector((state: RootState) => state.auth.user)
    useEffect(() => {
        const token = user?.token
        if (token) {
            const expirationTime = user.exp * 1000
            const currentTime = Date.now()
            const timeRemaining = expirationTime - currentTime
            const logoutTimer = setTimeout(logout, timeRemaining)
            return () => clearTimeout(logoutTimer)
        }
    }, [user?.exp, user?.token])

    if (!user) {
        return <Navigate to={'/login'} />
    }

    if(user && !roles.includes(user.role)) {
        return <Navigate to={'/access-denied'} />
    }

    return children
}

export default PrivateRoute
