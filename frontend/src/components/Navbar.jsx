import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FiShoppingCart,
  FiUser,
  FiMenu,
  FiX,
  FiSearch,
  FiLogOut,
  FiPackage,
  FiGrid,
} from "react-icons/fi";
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const { user, isAuthenticated, isAdmin, logout } = useContext(AuthContext);
  const { itemsCount } = useContext(CartContext);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/products?keyword=${encodeURIComponent(search)}`);
    setMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    setProfileOpen(false);
    navigate("/");
  };

  return (
    <header
      className={`sticky top-0 z-50 bg-white transition-shadow duration-300 ${
        scrolled ? "shadow-md" : "shadow-sm"
      }`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <span className="text-2xl font-extrabold text-primary-600">Shop</span>
            <span className="text-2xl font-extrabold text-accent-500">Sphere</span>
          </Link>

          {/* Search - desktop */}
          <form
            onSubmit={handleSearch}
            className="hidden md:flex flex-1 max-w-xl relative"
          >
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search for products, brands and more..."
              className="w-full pl-4 pr-10 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
            />
            <button
              type="submit"
              className="absolute right-1 top-1/2 -translate-y-1/2 bg-primary-600 hover:bg-primary-700 text-white rounded-full p-2"
            >
              <FiSearch size={16} />
            </button>
          </form>

          {/* Right icons */}
          <div className="hidden md:flex items-center gap-6">
            <Link to="/products" className="text-gray-700 hover:text-primary-600 font-medium text-sm flex items-center gap-1">
              <FiGrid /> Shop
            </Link>

            <div className="relative">
              <button
                onClick={() => setProfileOpen((p) => !p)}
                className="flex items-center gap-1 text-gray-700 hover:text-primary-600 font-medium text-sm"
              >
                <FiUser size={18} />
                {isAuthenticated ? user.name.split(" ")[0] : "Account"}
              </button>

              {profileOpen && (
                <div
                  className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-2 animate-fade-in"
                  onMouseLeave={() => setProfileOpen(false)}
                >
                  {isAuthenticated ? (
                    <>
                      <div className="px-4 py-2 text-xs text-gray-400">
                        Signed in as <br />
                        <span className="text-gray-700 font-medium">{user.email}</span>
                      </div>
                      <hr className="my-1" />
                      <Link
                        to="/orders"
                        onClick={() => setProfileOpen(false)}
                        className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      >
                        <FiPackage /> My Orders
                      </Link>
                      {isAdmin && (
                        <Link
                          to="/admin"
                          onClick={() => setProfileOpen(false)}
                          className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        >
                          <FiGrid /> Admin Dashboard
                        </Link>
                      )}
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                      >
                        <FiLogOut /> Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/login"
                        onClick={() => setProfileOpen(false)}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      >
                        Login
                      </Link>
                      <Link
                        to="/register"
                        onClick={() => setProfileOpen(false)}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      >
                        Register
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>

            <Link to="/cart" className="relative text-gray-700 hover:text-primary-600">
              <FiShoppingCart size={22} />
              {itemsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-accent-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {itemsCount}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile controls */}
          <div className="flex md:hidden items-center gap-4">
            <Link to="/cart" className="relative text-gray-700">
              <FiShoppingCart size={22} />
              {itemsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-accent-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {itemsCount}
                </span>
              )}
            </Link>
            <button onClick={() => setMenuOpen((p) => !p)} className="text-gray-700">
              {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 animate-slide-up">
          <div className="container-custom py-4 space-y-4">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search products..."
                className="w-full pl-4 pr-10 py-2 rounded-full border border-gray-300 text-sm"
              />
              <button
                type="submit"
                className="absolute right-1 top-1/2 -translate-y-1/2 bg-primary-600 text-white rounded-full p-2"
              >
                <FiSearch size={16} />
              </button>
            </form>

            <Link
              to="/products"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-2 text-gray-700 font-medium py-1"
            >
              <FiGrid /> Shop
            </Link>

            {isAuthenticated ? (
              <>
                <Link
                  to="/orders"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-2 text-gray-700 font-medium py-1"
                >
                  <FiPackage /> My Orders
                </Link>
                {isAdmin && (
                  <Link
                    to="/admin"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-2 text-gray-700 font-medium py-1"
                  >
                    <FiGrid /> Admin Dashboard
                  </Link>
                )}
                <button
                  onClick={() => {
                    handleLogout();
                    setMenuOpen(false);
                  }}
                  className="flex items-center gap-2 text-red-600 font-medium py-1"
                >
                  <FiLogOut /> Logout
                </button>
              </>
            ) : (
              <div className="flex gap-3">
                <Link
                  to="/login"
                  onClick={() => setMenuOpen(false)}
                  className="btn-secondary flex-1 text-center"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMenuOpen(false)}
                  className="btn-primary flex-1 text-center"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
