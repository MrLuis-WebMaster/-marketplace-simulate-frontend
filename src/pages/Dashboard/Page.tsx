import { Link } from "react-router-dom"

const Dashboard = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-2xl md:text-4xl font-extrabold mb-8">Welcome to the Admin Dashboard!</h1>

      <p className="md:text-lg text-gray-600 mb-6">
        As an administrator, you have the power to manage and oversee various aspects of the marketplace.
        Explore administrative tools, monitor user activities, and maintain a secure environment.
      </p>

      <div className="flex flex-col md:flex-row gap-6">
        <Link to="/dashboard/products" className="bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600 focus:outline-none">
          Products
        </Link>
        <Link to="/dashboard/create-product" className="bg-green-500 text-white py-3 px-6 rounded-lg hover:bg-green-600 focus:outline-none">
          Create Product
        </Link>
      </div>
    </div>
  )
}

export default Dashboard