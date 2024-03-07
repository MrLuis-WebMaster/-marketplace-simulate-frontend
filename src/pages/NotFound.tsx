import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold text-gray-800">Oops! Page not found</h1>
      <p className="text-gray-600 text-lg mt-2">Sorry, the page you are looking for does not exist.</p>
      <Link to="/">
        <button className="mt-4 font-semibold text-lg bg-purple-600 text-white py-3 px-12 rounded-full">Go to Home</button>
      </Link>
    </div>
  );
}

export default NotFound;
