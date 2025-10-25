import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="border-b bg-white shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
        {/* Logo / Title */}
        <h1 className="text-xl sm:text-2xl font-bold text-blue-600 text-center sm:text-left">
          ASCVDRiskCalculator.org
        </h1>

        {/* Navigation Buttons */}
        <nav className="flex justify-center sm:justify-end flex-wrap gap-4">
          <Link to="/"><button className="text-gray-700 hover:text-blue-600 font-medium text-sm sm:text-base" href="/">
            Home
          </button></Link>

          <Link to="/privacy-policy">
          <button className="text-gray-700 hover:text-blue-600 font-medium text-sm sm:text-base" href="/privacy-policy">
            Privacy Policy
          </button></Link>

          <Link to="/contact-us">
          <button className="text-gray-700 hover:text-blue-600 font-medium text-sm sm:text-base" href="/contact-us">
            Contact Us
          </button></Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;
