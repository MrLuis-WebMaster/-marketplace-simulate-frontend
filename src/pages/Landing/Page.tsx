import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="flex flex-col items-center h-full w-full lg:max-w-[65%] mx-auto mt-40">
      <h1 className="text-4xl lg:text-5xl text-blue-900 leading-none mb-4 font-black text-center">
        Welcome to "MarketJoy"!
      </h1>
      <p className="lg:text-lg mb-8 text-blue-900 text-center">
        Explore the joy of discovering unique products at MarketJoy.
      </p>
      <Link
        to="/products"
        className="font-semibold text-lg bg-purple-600 text-white py-3 px-12 rounded-full"
      >
        See Products
      </Link>
    </div>
  );
};

export default Landing;
