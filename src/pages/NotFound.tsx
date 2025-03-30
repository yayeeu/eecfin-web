
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center p-8 max-w-lg">
        <h1 className="text-6xl font-bold text-eecfin-navy mb-4">404</h1>
        <p className="text-2xl text-gray-600 mb-6">
          Oops! We couldn't find the page you're looking for.
        </p>
        <p className="text-gray-500 mb-8">
          The page you are trying to access might have been removed, had its name changed, 
          or is temporarily unavailable.
        </p>
        <Button asChild className="bg-eecfin-navy hover:bg-eecfin-navy/80">
          <Link to="/">Return to Home</Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
