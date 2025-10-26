import React from "react";                           // 👈 React must be imported first
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./index.css";
import Home from "./assets/pages/home.jsx";
import Privacy from "./assets/pages/privacy.jsx";
import Contact from "./assets/pages/contact.jsx";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/privacy-policy" element={<Privacy />} />
        <Route path="/contact-us" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
