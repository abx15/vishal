import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { ArrowLeft, Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error:", location.pathname);
  }, [location.pathname]);

  return (
    <main className="min-h-screen flex items-center justify-center bg-cream pt-20">
      <div className="container-wide text-center py-20">
        <h1 className="heading-display text-primary mb-4">404</h1>
        <h2 className="heading-section mb-4">Page Not Found</h2>
        <p className="text-body max-w-md mx-auto mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link to="/" className="btn-primary">
            <Home className="w-5 h-5" />
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
};

export default NotFound;
