import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";
import AIChatbot from "./components/AIChatbot";
import Homepage from "./pages/Homepage";
import AboutPage from "./pages/AboutPage";
import ResourcesPage from "./pages/ResourcesPage";
import CommunityPage from "./pages/CommunityPage";
import SingleService from "./pages/SingleService";
import TeamPage from "./pages/TeamPage";
import PricingPage from "./pages/PricingPage";
import FAQPage from "./pages/FAQPage";
import BlogPage from "./pages/BlogPage";
import SingleBlog from "./pages/SingleBlog";
import ContactPage from "./pages/ContactPage";
import AppointmentPage from "./pages/AppointmentPage";
import JoinOurTeamPage from "./pages/JoinOurTeamPage";
import SelfAssessmentPage from "./pages/SelfAssessmentPage";
import AdminLoginPage from "./pages/AdminLoginPage";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import TherapistLoginPage from "./pages/TherapistLoginPage";
import TherapistDashboardPage from "./pages/TherapistDashboardPage";
import UserAuthPage from "./pages/UserAuthPage";
import Error404 from "./pages/Error404";
import { Toaster } from "./components/ui/toaster";

// Scroll to top component
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

// Layout component for public pages (with Navbar and Footer)
function PublicLayout({ children }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
      <WhatsAppButton />
      <AIChatbot />
    </>
  );
}

// Layout for admin pages (no Navbar/Footer)
function AdminLayout({ children }) {
  return <>{children}</>;
}

function AppRoutes() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');
  const isAuthRoute = location.pathname === '/auth';

  return (
    <>
      <ScrollToTop />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<PublicLayout><Homepage /></PublicLayout>} />
        <Route path="/about" element={<PublicLayout><AboutPage /></PublicLayout>} />
        <Route path="/services" element={<PublicLayout><ResourcesPage /></PublicLayout>} />
        <Route path="/resources" element={<PublicLayout><ResourcesPage /></PublicLayout>} />
        <Route path="/community" element={<PublicLayout><CommunityPage /></PublicLayout>} />
        <Route path="/service/:id" element={<PublicLayout><SingleService /></PublicLayout>} />
        <Route path="/team" element={<PublicLayout><TeamPage /></PublicLayout>} />
        <Route path="/pricing" element={<PublicLayout><PricingPage /></PublicLayout>} />
        <Route path="/faq" element={<PublicLayout><FAQPage /></PublicLayout>} />
        <Route path="/blog" element={<PublicLayout><BlogPage /></PublicLayout>} />
        <Route path="/blog/:slug" element={<PublicLayout><SingleBlog /></PublicLayout>} />
        <Route path="/contact" element={<PublicLayout><ContactPage /></PublicLayout>} />
        <Route path="/appointment" element={<PublicLayout><AppointmentPage /></PublicLayout>} />
        <Route path="/join-team" element={<PublicLayout><JoinOurTeamPage /></PublicLayout>} />
        <Route path="/self-assessment" element={<PublicLayout><SelfAssessmentPage /></PublicLayout>} />
        
        {/* Auth Routes */}
        <Route path="/auth" element={<UserAuthPage />} />
        
        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLayout><AdminLoginPage /></AdminLayout>} />
        <Route path="/admin/dashboard" element={<AdminLayout><AdminDashboardPage /></AdminLayout>} />
        <Route path="/admin" element={<AdminLayout><AdminLoginPage /></AdminLayout>} />
        
        {/* Therapist Routes */}
        <Route path="/therapist/login" element={<AdminLayout><TherapistLoginPage /></AdminLayout>} />
        <Route path="/therapist/dashboard" element={<AdminLayout><TherapistDashboardPage /></AdminLayout>} />
        <Route path="/therapist" element={<AdminLayout><TherapistLoginPage /></AdminLayout>} />
        
        {/* 404 */}
        <Route path="*" element={<PublicLayout><Error404 /></PublicLayout>} />
      </Routes>
      <Toaster />
    </>
  );
}

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
