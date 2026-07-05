import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiTrash2, FiMinus, FiPlus, FiShoppingBag, FiArrowRight } from "react-icons/fi";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";

const Cart = () => {
  const { cartItems, removeFromCart, increaseQty, decreaseQty, itemsPrice, shippingPrice, totalPrice } =
    useContext(CartContext);
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (!isAuthenticated) {
      navigate("/login?redirect=checkout");
    } else {
      navigate("/checkout");
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="container-custom py-20 text-center">
        <FiShoppingBag className="mx-auto text-gray-300 mb-4" size={64} />
        <h2 className="text-xl font-semibold text-gray-700 mb-2">Your cart is empty</h2>
        <p className="text-gray-500 mb-6">Looks like you haven't added anything yet.</p>
        <Link to="/products" className="btn-primary inline-flex items-center gap-2">
          Start Shopping <FiArrowRight />
        </Link>
      </div>
    );
  }

  return (
    <div className="container-custom py-8">
      <h1 className="section-title mb-6">Shopping Cart ({cartItems.length})</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map((item) => (
            <div key={item._id} className="card p-4 flex gap-4 items-center">
              <img
                src={item.image || "https://via.placeholder.com/100"}
                alt={item.name}
                className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-lg shrink-0"
              />
              <div className="flex-1 min-w-0">
                <Link to={`/products/${item._id}`} className="font-medium text-gray-900 hover:text-primary-600 line-clamp-2">
                  {item.name}
                </Link>
                <p className="text-gray-500 text-sm mt-1">₹{item.price} each</p>

                <div className="flex items-center gap-4 mt-3">
                  <div className="flex items-center border border-gray-300 rounded-lg">
                    <button onClick={() => decreaseQty(item._id)} className="p-1.5 hover:bg-gray-50">
                      <FiMinus size={14} />
                    </button>
                    <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                    <button
                      onClick={() => increaseQty(item._id)}
                      disabled={item.quantity >= item.stock}
                      className="p-1.5 hover:bg-gray-50 disabled:opacity-40"
                    >
                      <FiPlus size={14} />
                    </button>
                  </div>
                  <button
                    onClick={() => removeFromCart(item._id)}
                    className="text-red-500 hover:text-red-700 flex items-center gap-1 text-sm"
                  >
                    <FiTrash2 size={14} /> Remove
                  </button>
                </div>
              </div>
              <p className="font-bold text-gray-900 shrink-0">₹{item.price * item.quantity}</p>
            </div>
          ))}
        </div>

        {/* Order summary */}
        <div className="lg:col-span-1">
          <div className="card p-6 sticky top-20">
            <h3 className="font-semibold text-lg text-gray-900 mb-4">Order Summary</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>₹{itemsPrice}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span>{shippingPrice === 0 ? "Free" : `₹${shippingPrice}`}</span>
              </div>
              {shippingPrice > 0 && (
                <p className="text-xs text-primary-600">Add ₹{999 - itemsPrice} more for free shipping</p>
              )}
              <hr />
              <div className="flex justify-between font-bold text-gray-900 text-base">
                <span>Total</span>
                <span>₹{totalPrice}</span>
              </div>
            </div>

            <button onClick={handleCheckout} className="btn-primary w-full mt-6 flex items-center justify-center gap-2">
              Proceed to Checkout <FiArrowRight />
            </button>

            <p className="text-xs text-gray-400 text-center mt-3">
              Cash on Delivery available. Pay when you receive your order.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
