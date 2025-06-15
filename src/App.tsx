
import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "@/components/Layout";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./contexts/AuthContext";

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

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            {/* Login Route - Standalone */}
            <Route path="/login" element={<Login />} />

            {/* Admin Route - Protected and Standalone */}
            <Route 
              path="/admin" 
              element={
                <ProtectedRoute requiredRole="it">
                  <Admin />
                </ProtectedRoute>
              } 
            />

            {/* Home Route - Standalone */}
            <Route path="/" element={<Index />} />

            {/* Public Routes with Layout */}
            <Route path="/who-we-are" element={
              <Layout>
                <Suspense fallback={<PageLoader />}>
                  <WhoWeAre />
                </Suspense>
              </Layout>
            } />
            
            <Route path="/our-faith" element={
              <Layout>
                <Suspense fallback={<PageLoader />}>
                  <OurFaith />
                </Suspense>
              </Layout>
            } />
            
            <Route path="/our-leadership" element={
              <Layout>
                <Suspense fallback={<PageLoader />}>
                  <OurLeadership />
                </Suspense>
              </Layout>
            } />
            
            <Route path="/events" element={
              <Layout>
                <Suspense fallback={<PageLoader />}>
                  <Events />
                </Suspense>
              </Layout>
            } />
            
            <Route path="/contact" element={
              <Layout>
                <Suspense fallback={<PageLoader />}>
                  <Contact />
                </Suspense>
              </Layout>
            } />
            
            <Route path="/get-involved" element={
              <Layout>
                <Suspense fallback={<PageLoader />}>
                  <GetInvolved />
                </Suspense>
              </Layout>
            } />
            
            <Route path="/give" element={
              <Layout>
                <Suspense fallback={<PageLoader />}>
                  <Give />
                </Suspense>
              </Layout>
            } />
            
            <Route path="/constitution" element={
              <Layout>
                <Suspense fallback={<PageLoader />}>
                  <Constitution />
                </Suspense>
              </Layout>
            } />
            
            <Route path="/sermons" element={
              <Layout>
                <Suspense fallback={<PageLoader />}>
                  <Sermons />
                </Suspense>
              </Layout>
            } />

            {/* 404 Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
