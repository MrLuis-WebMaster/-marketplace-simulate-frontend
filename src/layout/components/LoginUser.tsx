import useAuth from '../../hooks/auth/useAuth'

const LoginUser = () => {
  const { auth, logout } = useAuth()
  return (
      <div className="mt-auto">
          <div className="text-center mb-1 flex gap-2 items-center">
              <i className='bx bxs-user-circle text-5xl'></i>
              <div className='text-left'>
                <p className="text-sm font-semibold">{auth.user?.name} | {auth.user?.role}</p>
                <p className="text-xs font-semibold">Email: {auth.user?.email}</p>
              </div>
          </div>

          <button
              onClick={() => logout()}
              className="flex items-center gap-3 mx-auto py-2 px-3 rounded hover:bg-gray-600 text-red-500 hover:text-white"
          >
              <i className='bx bx-log-out'></i>
              Sign Out
          </button>
      </div>
  )
}

export default LoginUser