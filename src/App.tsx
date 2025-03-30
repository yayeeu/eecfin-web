
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
const Events = lazy(() => import("./pages/Events"));
const Contact = lazy(() => import("./pages/Contact"));
const GetInvolved = lazy(() => import("./pages/GetInvolved"));
const Sermons = lazy(() => import("./pages/Sermons"));
const Give = lazy(() => import("./pages/Give"));
const Constitution = lazy(() => import("./pages/Constitution"));
const Admin = lazy(() => import("./pages/Admin"));

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
        <Routes>
          <Route path="/" element={<Index />} />
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
          <Route path="/events" element={
            <Layout>
              <Suspense fallback={<PageLoader />}>
                <Events />
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
          <Route path="/admin" element={
            <Suspense fallback={<PageLoader />}>
              <Admin />
            </Suspense>
          } />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
