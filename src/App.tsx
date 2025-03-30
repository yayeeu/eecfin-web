
import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Layout from "@/components/Layout";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import RoleGuard from "@/components/auth/RoleGuard";

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
const Auth = lazy(() => import("./pages/Auth"));
const Profile = lazy(() => import("./pages/Profile"));

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
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={
              <RoleGuard allowedRoles={['admin', 'member', 'elder', 'it']} isPublicRoute={true}>
                <Index />
              </RoleGuard>
            } />
            <Route path="/who-we-are" element={
              <RoleGuard allowedRoles={['admin', 'member', 'elder', 'it']} isPublicRoute={true}>
                <Layout>
                  <Suspense fallback={<PageLoader />}>
                    <WhoWeAre />
                  </Suspense>
                </Layout>
              </RoleGuard>
            } />
            <Route path="/our-faith" element={
              <RoleGuard allowedRoles={['admin', 'member', 'elder', 'it']} isPublicRoute={true}>
                <Layout>
                  <Suspense fallback={<PageLoader />}>
                    <OurFaith />
                  </Suspense>
                </Layout>
              </RoleGuard>
            } />
            <Route path="/events" element={
              <RoleGuard allowedRoles={['admin', 'member', 'elder', 'it']} isPublicRoute={true}>
                <Layout>
                  <Suspense fallback={<PageLoader />}>
                    <Events />
                  </Suspense>
                </Layout>
              </RoleGuard>
            } />
            <Route path="/sermons" element={
              <RoleGuard allowedRoles={['admin', 'member', 'elder', 'it']} isPublicRoute={true}>
                <Layout>
                  <Suspense fallback={<PageLoader />}>
                    <Sermons />
                  </Suspense>
                </Layout>
              </RoleGuard>
            } />
            <Route path="/contact" element={
              <RoleGuard allowedRoles={['admin', 'member', 'elder', 'it']} isPublicRoute={true}>
                <Layout>
                  <Suspense fallback={<PageLoader />}>
                    <Contact />
                  </Suspense>
                </Layout>
              </RoleGuard>
            } />
            <Route path="/get-involved" element={
              <RoleGuard allowedRoles={['admin', 'member', 'elder', 'it']} isPublicRoute={true}>
                <Layout>
                  <Suspense fallback={<PageLoader />}>
                    <GetInvolved />
                  </Suspense>
                </Layout>
              </RoleGuard>
            } />
            <Route path="/give" element={
              <RoleGuard allowedRoles={['admin', 'member', 'elder', 'it']} isPublicRoute={true}>
                <Layout>
                  <Suspense fallback={<PageLoader />}>
                    <Give />
                  </Suspense>
                </Layout>
              </RoleGuard>
            } />
            <Route path="/constitution" element={
              <RoleGuard allowedRoles={['admin', 'member', 'elder', 'it']} isPublicRoute={true}>
                <Layout>
                  <Suspense fallback={<PageLoader />}>
                    <Constitution />
                  </Suspense>
                </Layout>
              </RoleGuard>
            } />
            <Route path="/auth" element={
              <Suspense fallback={<PageLoader />}>
                <Auth />
              </Suspense>
            } />
            <Route path="/profile" element={
              <RoleGuard allowedRoles={['admin', 'member', 'elder', 'it']}>
                <Suspense fallback={<PageLoader />}>
                  <Profile />
                </Suspense>
              </RoleGuard>
            } />
            <Route path="/admin" element={
              <RoleGuard allowedRoles={['admin', 'member', 'elder', 'it']}>
                <Suspense fallback={<PageLoader />}>
                  <Admin />
                </Suspense>
              </RoleGuard>
            } />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
