import React from "react";
import { Link } from "react-router-dom";
import { FiFacebook, FiInstagram, FiTwitter, FiMail, FiTruck, FiShield, FiDollarSign } from "react-icons/fi";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-16">
      {/* Trust badges */}
      <div className="border-b border-gray-800">
        <div className="container-custom py-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="flex items-center gap-3">
            <FiTruck className="text-primary-400" size={28} />
            <div>
              <p className="font-semibold text-white">Free Shipping</p>
              <p className="text-xs text-gray-400">On orders above ₹999</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <FiDollarSign className="text-primary-400" size={28} />
            <div>
              <p className="font-semibold text-white">Cash on Delivery</p>
              <p className="text-xs text-gray-400">Pay when you receive</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <FiShield className="text-primary-400" size={28} />
            <div>
              <p className="font-semibold text-white">Secure Checkout</p>
              <p className="text-xs text-gray-400">100% safe & trusted</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container-custom py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
        <div className="col-span-2 md:col-span-1">
          <h3 className="text-xl font-bold text-white mb-3">
            Shop<span className="text-accent-500">Sphere</span>
          </h3>
          <p className="text-sm text-gray-400 mb-4">
            Your one-stop destination for quality products at unbeatable prices.
          </p>
          <div className="flex gap-3">
            <a href="#" className="hover:text-primary-400"><FiFacebook size={18} /></a>
            <a href="#" className="hover:text-primary-400"><FiInstagram size={18} /></a>
            <a href="#" className="hover:text-primary-400"><FiTwitter size={18} /></a>
            <a href="#" className="hover:text-primary-400"><FiMail size={18} /></a>
          </div>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-3">Shop</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/products" className="hover:text-primary-400">All Products</Link></li>
            <li><Link to="/products?category=Electronics" className="hover:text-primary-400">Electronics</Link></li>
            <li><Link to="/products?category=Fashion" className="hover:text-primary-400">Fashion</Link></li>
            <li><Link to="/products?category=Home%20%26%20Kitchen" className="hover:text-primary-400">Home & Kitchen</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-3">Account</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/login" className="hover:text-primary-400">Login</Link></li>
            <li><Link to="/register" className="hover:text-primary-400">Register</Link></li>
            <li><Link to="/orders" className="hover:text-primary-400">My Orders</Link></li>
            <li><Link to="/cart" className="hover:text-primary-400">Cart</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-3">Support</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-primary-400">Help Center</a></li>
            <li><a href="#" className="hover:text-primary-400">Shipping Info</a></li>
            <li><a href="#" className="hover:text-primary-400">Returns</a></li>
            <li><a href="#" className="hover:text-primary-400">Contact Us</a></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-800 py-4">
        <p className="text-center text-xs text-gray-500">
          © {new Date().getFullYear()} ShopSphere. All rights reserved. Built with the MERN stack.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
