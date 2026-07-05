import React, { useState, useContext, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FiDollarSign, FiCheckCircle } from "react-icons/fi";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import orderService from "../services/orderService";
import toast from "react-hot-toast";

const Checkout = () => {
  const { cartItems, itemsPrice, shippingPrice, totalPrice, clearCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const [address, setAddress] = useState({
    fullName: user?.name || "",
    street: user?.address?.street || "",
    city: user?.address?.city || "",
    state: user?.address?.state || "",
    pincode: user?.address?.pincode || "",
    phone: user?.address?.phone || "",
  });

  useEffect(() => {
    if (cartItems.length === 0) {
      navigate("/cart");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const validate = () => {
    const newErrors = {};
    Object.entries(address).forEach(([key, value]) => {
      if (!value.trim()) newErrors[key] = "This field is required";
    });
    if (address.pincode && !/^\d{4,10}$/.test(address.pincode)) {
      newErrors.pincode = "Enter a valid pincode";
    }
    if (address.phone && !/^\d{7,15}$/.test(address.phone)) {
      newErrors.phone = "Enter a valid phone number";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (field, value) => {
    setAddress((prev) => ({ ...prev, [field]: value }));
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const orderItems = cartItems.map((item) => ({
        product: item._id,
        quantity: item.quantity,
      }));

      const order = await orderService.createOrder({
        orderItems,
        shippingAddress: address,
      });

      clearCart();
      toast.success("Order placed successfully!");
      navigate(`/orders/${order._id}`);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to place order");
    } finally {
      setLoading(false);
    }
  };

  const fields = [
    { name: "fullName", label: "Full Name", placeholder: "John Doe" },
    { name: "street", label: "Street Address", placeholder: "123 Main Street, Apt 4B" },
    { name: "city", label: "City", placeholder: "Mumbai" },
    { name: "state", label: "State", placeholder: "Maharashtra" },
    { name: "pincode", label: "Pincode", placeholder: "400001" },
    { name: "phone", label: "Phone Number", placeholder: "9876543210" },
  ];

  return (
    <div className="container-custom py-8">
      <h1 className="section-title mb-6">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <form onSubmit={handlePlaceOrder} className="card p-6 space-y-5" noValidate>
            <h2 className="font-semibold text-lg text-gray-900 mb-2">Shipping Address</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {fields.map((field) => (
                <div key={field.name} className={field.name === "street" ? "sm:col-span-2" : ""}>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">{field.label}</label>
                  <input
                    type="text"
                    value={address[field.name]}
                    onChange={(e) => handleChange(field.name, e.target.value)}
                    placeholder={field.placeholder}
                    className="input-field"
                  />
                  {errors[field.name] && (
                    <p className="text-red-500 text-xs mt-1">{errors[field.name]}</p>
                  )}
                </div>
              ))}
            </div>

            <div className="border-t border-gray-100 pt-5">
              <h2 className="font-semibold text-lg text-gray-900 mb-3">Payment Method</h2>
              <div className="flex items-center gap-3 bg-primary-50 border border-primary-200 rounded-lg p-4">
                <FiDollarSign className="text-primary-600" size={22} />
                <div>
                  <p className="font-medium text-gray-900">Cash on Delivery</p>
                  <p className="text-sm text-gray-500">Pay with cash when your order is delivered</p>
                </div>
                <FiCheckCircle className="text-primary-600 ml-auto" size={20} />
              </div>
            </div>

            <button type="submit" disabled={loading} className="btn-primary w-full mt-4">
              {loading ? "Placing Order..." : `Place Order - ₹${totalPrice}`}
            </button>
          </form>
        </div>

        {/* Order summary */}
        <div className="lg:col-span-1">
          <div className="card p-6 sticky top-20">
            <h3 className="font-semibold text-lg text-gray-900 mb-4">Order Summary</h3>
            <div className="space-y-3 max-h-64 overflow-y-auto mb-4">
              {cartItems.map((item) => (
                <div key={item._id} className="flex gap-3 items-center">
                  <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded-lg" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-800 line-clamp-1">{item.name}</p>
                    <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                  </div>
                  <p className="text-sm font-semibold text-gray-900">₹{item.price * item.quantity}</p>
                </div>
              ))}
            </div>
            <hr className="mb-4" />
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>₹{itemsPrice}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span>{shippingPrice === 0 ? "Free" : `₹${shippingPrice}`}</span>
              </div>
              <hr />
              <div className="flex justify-between font-bold text-gray-900 text-base">
                <span>Total</span>
                <span>₹{totalPrice}</span>
              </div>
            </div>
            <Link to="/cart" className="block text-center text-sm text-primary-600 hover:underline mt-4">
              Edit Cart
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
