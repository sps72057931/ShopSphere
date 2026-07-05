import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { FiMapPin, FiPhone, FiDollarSign } from "react-icons/fi";
import orderService from "../services/orderService";
import { OrderStatusBadge, OrderStatusTracker } from "../components/OrderStatus";
import Loader from "../components/Loader";
import toast from "react-hot-toast";

const OrderDetail = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const data = await orderService.getOrderById(id);
        setOrder(data);
      } catch (error) {
        toast.error("Failed to load order");
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [id]);

  if (loading) return <Loader fullScreen />;
  if (!order) {
    return (
      <div className="container-custom py-16 text-center">
        <p className="text-gray-500">Order not found.</p>
        <Link to="/orders" className="btn-primary mt-4 inline-block">
          Back to Orders
        </Link>
      </div>
    );
  }

  return (
    <div className="container-custom py-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <h1 className="section-title">Order #{order._id.slice(-8).toUpperCase()}</h1>
          <p className="text-gray-500 text-sm mt-1">
            Placed on{" "}
            {new Date(order.createdAt).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
        </div>
        <OrderStatusBadge status={order.orderStatus} />
      </div>

      <div className="card p-6 mb-6">
        <h3 className="font-semibold text-gray-900 mb-2">Order Status</h3>
        <OrderStatusTracker status={order.orderStatus} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          <div className="card p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Items ({order.orderItems.length})</h3>
            <div className="space-y-4">
              {order.orderItems.map((item, idx) => (
                <div key={idx} className="flex gap-4 items-center">
                  <img
                    src={item.image || "https://via.placeholder.com/80"}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 text-sm">{item.name}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      Qty: {item.quantity} × ₹{item.price}
                    </p>
                  </div>
                  <p className="font-semibold text-gray-900">₹{item.price * item.quantity}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="card p-6">
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <FiMapPin /> Shipping Address
            </h3>
            <p className="text-gray-700 text-sm leading-relaxed">
              {order.shippingAddress.fullName}
              <br />
              {order.shippingAddress.street}, {order.shippingAddress.city}
              <br />
              {order.shippingAddress.state} - {order.shippingAddress.pincode}
            </p>
            <p className="flex items-center gap-2 text-gray-700 text-sm mt-2">
              <FiPhone size={14} /> {order.shippingAddress.phone}
            </p>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="card p-6 sticky top-20">
            <h3 className="font-semibold text-gray-900 mb-4">Payment Summary</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-gray-600">
                <span>Items Total</span>
                <span>₹{order.itemsPrice}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span>{order.shippingPrice === 0 ? "Free" : `₹${order.shippingPrice}`}</span>
              </div>
              <hr />
              <div className="flex justify-between font-bold text-gray-900 text-base">
                <span>Total</span>
                <span>₹{order.totalPrice}</span>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-primary-50 rounded-lg p-3 mt-4 text-sm text-primary-700">
              <FiDollarSign /> Cash on Delivery
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
