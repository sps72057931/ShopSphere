import React, { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { FiStar, FiMinus, FiPlus, FiShoppingCart, FiCheck, FiTruck, FiShield } from "react-icons/fi";
import productService from "../services/productService";
import { CartContext } from "../context/CartContext";
import Loader from "../components/Loader";
import toast from "react-hot-toast";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const data = await productService.getProductById(id);
        setProduct(data);
        setActiveImage(0);
        setQuantity(1);
      } catch (error) {
        toast.error("Product not found");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) return <Loader fullScreen />;
  if (!product) {
    return (
      <div className="container-custom py-16 text-center">
        <p className="text-gray-500 text-lg">Product not found.</p>
        <Link to="/products" className="btn-primary mt-4 inline-block">
          Back to Products
        </Link>
      </div>
    );
  }

  const hasDiscount = product.discountPrice > 0 && product.discountPrice < product.price;
  const displayPrice = hasDiscount ? product.discountPrice : product.price;
  const discountPercent = hasDiscount
    ? Math.round(((product.price - product.discountPrice) / product.price) * 100)
    : 0;

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  return (
    <div className="container-custom py-8">
      <nav className="text-sm text-gray-500 mb-6">
        <Link to="/" className="hover:text-primary-600">Home</Link> /{" "}
        <Link to="/products" className="hover:text-primary-600">Products</Link> /{" "}
        <Link to={`/products?category=${product.category}`} className="hover:text-primary-600">{product.category}</Link>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Images */}
        <div>
          <div className="aspect-square rounded-xl overflow-hidden bg-gray-50 border border-gray-100 mb-4">
            <img
              src={product.images?.[activeImage]?.url || "https://via.placeholder.com/600"}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          {product.images?.length > 1 && (
            <div className="flex gap-3">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(idx)}
                  className={`w-16 h-16 rounded-lg overflow-hidden border-2 ${
                    activeImage === idx ? "border-primary-600" : "border-gray-200"
                  }`}
                >
                  <img src={img.url} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div>
          <p className="text-sm text-primary-600 font-medium uppercase tracking-wide mb-2">
            {product.brand}
          </p>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">{product.name}</h1>

          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center gap-1 bg-green-50 text-green-700 px-2 py-1 rounded text-sm font-medium">
              {product.ratings?.toFixed(1) || "New"} <FiStar className="fill-green-700" size={12} />
            </div>
            <span className="text-sm text-gray-500">{product.numReviews || 0} reviews</span>
          </div>

          <div className="flex items-baseline gap-3 mb-6">
            <span className="text-3xl font-bold text-gray-900">₹{displayPrice}</span>
            {hasDiscount && (
              <>
                <span className="text-lg text-gray-400 line-through">₹{product.price}</span>
                <span className="badge bg-accent-500 text-white">{discountPercent}% OFF</span>
              </>
            )}
          </div>

          <p className="text-gray-600 leading-relaxed mb-6">{product.description}</p>

          <div className="flex items-center gap-2 mb-6">
            {product.stock > 0 ? (
              <span className="flex items-center gap-1 text-green-600 text-sm font-medium">
                <FiCheck /> In Stock ({product.stock} available)
              </span>
            ) : (
              <span className="text-red-600 text-sm font-medium">Out of Stock</span>
            )}
          </div>

          {product.stock > 0 && (
            <>
              <div className="flex items-center gap-4 mb-6">
                <span className="font-medium text-gray-700">Quantity:</span>
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="p-2 hover:bg-gray-50"
                  >
                    <FiMinus size={16} />
                  </button>
                  <span className="w-10 text-center font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                    className="p-2 hover:bg-gray-50"
                  >
                    <FiPlus size={16} />
                  </button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button onClick={handleAddToCart} className="btn-primary flex items-center justify-center gap-2 flex-1">
                  <FiShoppingCart /> Add to Cart
                </button>
                <Link to="/cart" onClick={handleAddToCart} className="btn-accent flex items-center justify-center gap-2 flex-1">
                  Buy Now
                </Link>
              </div>
            </>
          )}

          <div className="border-t border-gray-100 mt-8 pt-6 space-y-3">
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <FiTruck className="text-primary-600" size={18} />
              Free delivery on orders above ₹999
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <FiShield className="text-primary-600" size={18} />
              Cash on Delivery available
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
