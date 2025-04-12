
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: Cave dweller attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-amber-100">
      <div className="text-center bg-stone-700 p-8 rounded-lg border-4 border-amber-800">
        <h1 className="text-4xl font-bold mb-4 text-amber-500">404</h1>
        <p className="text-xl text-amber-300 mb-4">Oops! This cave does not exist</p>
        <a href="/" className="text-amber-400 hover:text-amber-200 underline">
          Return to Ember Totem
        </a>
      </div>
    </div>
  );
};

export default NotFound;
