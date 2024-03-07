import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';
import { logout as logoutAction } from '../../redux/slices/auth.slice';
import { useNavigate } from 'react-router-dom';
import { UserRole } from '../../types/user.type';

const useAuth = () => {
    const auth = useSelector((state: RootState) => state.auth);
    const isAdmin = auth.user?.role === UserRole.ADMIN
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logout = () => {
        dispatch(logoutAction());
        navigate('/');
    };
    return { auth, logout , isAdmin };
};

export default useAuth;
