const AccessDenied = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-4xl font-bold text-red-600">Access Denied</h1>
            <p className="text-gray-600 text-lg mt-2">You don't have permission to access this page.</p>
        </div>
    );
}

export default AccessDenied;
