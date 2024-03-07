import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AccessDenied = () => {
    const [countdown, setCountdown] = useState(5);
    const navigate = useNavigate();

    useEffect(() => {
        const countdownInterval = setInterval(() => {
            setCountdown((prevCount) => prevCount - 1);
        }, 1000);

        return () => clearInterval(countdownInterval);
    }, []);

    useEffect(() => {
        if (countdown === 0) {
            navigate('/');
        }
    }, [countdown, navigate]);

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-4xl font-bold text-red-600">Access Denied</h1>
            <p className="text-gray-600 text-lg mt-2">You don't have permission to access this page.</p>
            <p className="text-gray-600 text-lg mt-2">Redirecting in {countdown} seconds...</p>
            <button onClick={() => navigate('/')} className="mt-4 font-semibold text-lg bg-purple-600 text-white py-3 px-12 rounded-full">
                Go to Home
            </button>
        </div>
    );
}

export default AccessDenied;
