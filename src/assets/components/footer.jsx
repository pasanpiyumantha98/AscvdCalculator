import React from "react";

function Footer() {
  return (
    <footer className="mt-12 border-t">
        <div className="max-w-6xl mx-auto px-4 py-6 text-sm text-gray-500">
          © {new Date().getFullYear()} ASCVDRiskCalculator.org
        </div>
      </footer>
  );
} export default Footer;