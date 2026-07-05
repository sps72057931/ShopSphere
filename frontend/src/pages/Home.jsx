import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiArrowRight, FiTruck, FiRefreshCw, FiHeadphones, FiShield } from "react-icons/fi";
import productService from "../services/productService";
import ProductCard from "../components/ProductCard";
import Loader from "../components/Loader";
import toast from "react-hot-toast";

const CATEGORY_IMAGES = {
  Electronics: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=500",
  Fashion: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=500",
  "Home & Kitchen": "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=500",
  Books: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=500",
  Toys: "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=500",
  Sports: "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=500",
};

const Home = () => {
  const [featured, setFeatured] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [featuredData, categoriesData] = await Promise.all([
          productService.getFeaturedProducts(),
          productService.getCategories(),
        ]);
        setFeatured(featuredData);
        setCategories(categoriesData);
      } catch (error) {
        toast.error("Failed to load homepage data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-700 via-primary-600 to-primary-800 overflow-hidden">
        <div className="container-custom py-16 sm:py-24 relative z-10">
          <div className="max-w-2xl">
            <span className="badge bg-accent-500 text-white mb-4">🔥 New Season Sale</span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6">
              Shop Smarter,<br />Live Better
            </h1>
            <p className="text-primary-100 text-lg mb-8 max-w-lg">
              Discover amazing deals on electronics, fashion, home essentials and more.
              Quality products delivered to your doorstep with Cash on Delivery.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/products" className="btn-accent flex items-center gap-2 text-base px-6 py-3">
                Shop Now <FiArrowRight />
              </Link>
              <Link to="/products" className="bg-white/10 hover:bg-white/20 text-white font-medium px-6 py-3 rounded-lg border border-white/30 backdrop-blur-sm transition-colors">
                Explore Categories
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute right-0 top-0 w-1/2 h-full opacity-20 hidden lg:block">
          <div className="w-full h-full bg-white rounded-full blur-3xl transform translate-x-1/3 -translate-y-1/4" />
        </div>
      </section>

      {/* Trust badges */}
      <section className="border-b border-gray-100 bg-white">
        <div className="container-custom py-6 grid grid-cols-2 sm:grid-cols-4 gap-6">
          {[
            { icon: FiTruck, label: "Free Shipping", sub: "On orders over ₹999" },
            { icon: FiRefreshCw, label: "Easy Returns", sub: "7-day return policy" },
            { icon: FiHeadphones, label: "24/7 Support", sub: "Dedicated support" },
            { icon: FiShield, label: "Secure Shopping", sub: "100% protected" },
          ].map((item, idx) => (
            <div key={idx} className="flex items-center gap-3">
              <item.icon className="text-primary-600 shrink-0" size={26} />
              <div>
                <p className="font-semibold text-sm text-gray-900">{item.label}</p>
                <p className="text-xs text-gray-500">{item.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      {categories.length > 0 && (
        <section className="container-custom py-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="section-title">Shop by Category</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((cat) => (
              <Link
                key={cat}
                to={`/products?category=${encodeURIComponent(cat)}`}
                className="group relative rounded-xl overflow-hidden aspect-square shadow-sm hover:shadow-lg transition-shadow"
              >
                <img
                  src={CATEGORY_IMAGES[cat] || "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=500"}
                  alt={cat}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/40 flex items-end p-3">
                  <span className="text-white font-semibold text-sm">{cat}</span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Featured Products */}
      <section className="container-custom py-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="section-title">Featured Products</h2>
          <Link to="/products" className="text-primary-600 font-medium text-sm flex items-center gap-1 hover:underline">
            View All <FiArrowRight size={14} />
          </Link>
        </div>

        {loading ? (
          <Loader />
        ) : featured.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No featured products available yet.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {featured.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* Promo banner */}
      <section className="container-custom pb-12">
        <div className="bg-gradient-to-r from-accent-500 to-accent-600 rounded-2xl p-8 sm:p-12 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-center sm:text-left">
            <h3 className="text-white text-2xl sm:text-3xl font-bold mb-2">
              Get 20% Off Your First Order
            </h3>
            <p className="text-orange-100">Pay conveniently with Cash on Delivery. No hidden charges.</p>
          </div>
          <Link to="/products" className="bg-white text-accent-600 font-semibold px-6 py-3 rounded-lg hover:bg-orange-50 transition-colors shrink-0">
            Start Shopping
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
