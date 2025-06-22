import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex items-center justify-center self-center border-2 rounded-2xl px-6 py-12 border-indigo-200">
      <div className="text-center max-w-md">
        <h1 className="text-7xl font-bold text-indigo-600">404</h1>
        <p className="mt-4 text-2xl font-semibold text-red-500">
          Page not found
        </p>
        <p className="mt-2 text-gray-500">
          Sorry, the page you are looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/feed"
          className="inline-block mt-6 px-6 py-3 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 transition"
        >
          Go back home
        </Link>
      </div>
    </div>
  );
}
