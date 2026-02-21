import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import Shop from "./pages/Shop.jsx";
import ProductDetails from "./pages/ProductDetails.jsx";
import Cart from "./pages/Cart.jsx";
import Contact from "./pages/Contact.jsx";
import NotFound from "./pages/NotFound.jsx";
import SiteLoader from "./components/SiteLoader.jsx";
import Admin from "./pages/Admin.jsx";
import FloatingWhatsApp from "./components/FloatingWhatsApp.jsx";
import ChatBotFree from "./components/ChatBotFree.jsx";

export default function App() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 650);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <SiteLoader done={ready} />

      <div className="bokeh">
        <Navbar />

        <main className="flex-1">
          <Routes>
            <Route path="/admin" element={<Admin />} />
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        <Footer />
        <ChatBotFree />
      </div>

      {/* Replace with her real WhatsApp number */}
      <FloatingWhatsApp phoneE164="27817118312" />
    </div>
  );
}