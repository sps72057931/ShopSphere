import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { FiShoppingCart, FiStar } from "react-icons/fi";
import { CartContext } from "../context/CartContext";

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext);

  const hasDiscount = product.discountPrice > 0 && product.discountPrice < product.price;
  const discountPercent = hasDiscount
    ? Math.round(((product.price - product.discountPrice) / product.price) * 100)
    : 0;

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };

  return (
    <Link to={`/products/${product._id}`} className="card group overflow-hidden flex flex-col h-full">
      <div className="relative overflow-hidden aspect-square bg-gray-50">
        <img
          src={product.images?.[0]?.url || "https://via.placeholder.com/400"}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        {hasDiscount && (
          <span className="absolute top-2 left-2 badge bg-accent-500 text-white">
            -{discountPercent}%
          </span>
        )}
        {product.stock === 0 && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="text-white font-semibold text-sm">Out of Stock</span>
          </div>
        )}
        <button
          onClick={handleAddToCart}
          disabled={product.stock === 0}
          className="absolute bottom-2 right-2 bg-white text-primary-600 p-2.5 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-primary-600 hover:text-white disabled:opacity-0"
          title="Add to cart"
        >
          <FiShoppingCart size={16} />
        </button>
      </div>

      <div className="p-4 flex flex-col flex-1">
        <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">{product.category}</p>
        <h3 className="font-semibold text-gray-900 text-sm sm:text-base line-clamp-2 mb-2 flex-1">
          {product.name}
        </h3>

        <div className="flex items-center gap-1 mb-2">
          <FiStar className="text-yellow-400 fill-yellow-400" size={14} />
          <span className="text-xs text-gray-500">
            {product.ratings?.toFixed(1) || "New"} ({product.numReviews || 0})
          </span>
        </div>

        <div className="flex items-baseline gap-2">
          <span className="text-lg font-bold text-gray-900">
            ₹{hasDiscount ? product.discountPrice : product.price}
          </span>
          {hasDiscount && (
            <span className="text-sm text-gray-400 line-through">₹{product.price}</span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
