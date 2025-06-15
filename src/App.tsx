
import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "@/components/Layout";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// Lazy-loaded components for better initial loading performance
const WhoWeAre = lazy(() => import("./pages/WhoWeAre"));
const OurFaith = lazy(() => import("./pages/OurFaith"));
const OurLeadership = lazy(() => import("./pages/OurLeadership"));
const Events = lazy(() => import("./pages/Events"));
const Contact = lazy(() => import("./pages/Contact"));
const GetInvolved = lazy(() => import("./pages/GetInvolved"));
const Give = lazy(() => import("./pages/Give"));
const Constitution = lazy(() => import("./pages/Constitution"));
const Sermons = lazy(() => import("./pages/Sermons"));

// Configure the query client with performance optimizations
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 60 * 1000, // 1 minute
      retry: 1,
    },
  },
});

// Loading fallback for lazy-loaded components
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="w-16 h-16 border-4 border-blue-500 border-solid rounded-full border-t-transparent animate-spin"></div>
  </div>
);

// Define public routes
const publicRoutes = [
  { path: "/", element: <Index /> },
  { path: "/who-we-are", element: <WhoWeAre /> },
  { path: "/our-faith", element: <OurFaith /> },
  { path: "/our-leadership", element: <OurLeadership /> },
  { path: "/events", element: <Events /> },
  { path: "/contact", element: <Contact /> },
  { path: "/get-involved", element: <GetInvolved /> },
  { path: "/give", element: <Give /> },
  { path: "/constitution", element: <Constitution /> },
  { path: "/sermons", element: <Sermons /> }
];

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          {publicRoutes.map(route => (
            <Route 
              key={route.path} 
              path={route.path} 
              element={
                route.path === "/" ? (
                  route.element
                ) : (
                  <Layout>
                    <Suspense fallback={<PageLoader />}>
                      {route.element}
                    </Suspense>
                  </Layout>
                )
              } 
            />
          ))}

          {/* 404 Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
