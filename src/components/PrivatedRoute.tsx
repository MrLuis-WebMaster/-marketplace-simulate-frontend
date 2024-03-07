import { ReactNode, useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { logout } from '../redux/slices/auth.slice'
import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'

const PrivateRoute = ({ children }: {children: ReactNode}) => {
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

    return children
}

export default PrivateRoute
