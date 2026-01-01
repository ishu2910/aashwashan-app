import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Homepage from "./pages/Homepage";
import AboutPage from "./pages/AboutPage";
import ServicesPage from "./pages/ServicesPage";
import SingleService from "./pages/SingleService";
import TeamPage from "./pages/TeamPage";
import PricingPage from "./pages/PricingPage";
import FAQPage from "./pages/FAQPage";
import BlogPage from "./pages/BlogPage";
import SingleBlog from "./pages/SingleBlog";
import ContactPage from "./pages/ContactPage";
import AppointmentPage from "./pages/AppointmentPage";
import Error404 from "./pages/Error404";
import { Toaster } from "./components/ui/toaster";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/service/:id" element={<SingleService />} />
          <Route path="/team" element={<TeamPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:id" element={<SingleBlog />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/appointment" element={<AppointmentPage />} />
          <Route path="*" element={<Error404 />} />
        </Routes>
        <Footer />
        <Toaster />
      </BrowserRouter>
    </div>
  );
}

export default App;
