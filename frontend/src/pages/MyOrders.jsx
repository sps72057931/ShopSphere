import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiPackage, FiChevronRight } from "react-icons/fi";
import orderService from "../services/orderService";
import { OrderStatusBadge } from "../components/OrderStatus";
import Loader from "../components/Loader";
import toast from "react-hot-toast";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await orderService.getMyOrders();
        setOrders(data);
      } catch (error) {
        toast.error("Failed to load orders");
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading) return <Loader fullScreen />;

  return (
    <div className="container-custom py-8">
      <h1 className="section-title mb-6">My Orders</h1>

      {orders.length === 0 ? (
        <div className="text-center py-16">
          <FiPackage className="mx-auto text-gray-300 mb-4" size={64} />
          <p className="text-gray-500 mb-6">You haven't placed any orders yet.</p>
          <Link to="/products" className="btn-primary inline-block">
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <Link
              key={order._id}
              to={`/orders/${order._id}`}
              className="card p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="flex items-center gap-4">
                <div className="flex -space-x-3">
                  {order.orderItems.slice(0, 3).map((item, idx) => (
                    <img
                      key={idx}
                      src={item.image || "https://via.placeholder.com/60"}
                      alt={item.name}
                      className="w-12 h-12 rounded-lg object-cover border-2 border-white"
                    />
                  ))}
                </div>
                <div>
                  <p className="font-medium text-gray-900 text-sm">
                    Order #{order._id.slice(-8).toUpperCase()}
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {new Date(order.createdAt).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}{" "}
                    • {order.orderItems.length} item{order.orderItems.length > 1 ? "s" : ""}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 sm:gap-8">
                <OrderStatusBadge status={order.orderStatus} />
                <p className="font-bold text-gray-900">₹{order.totalPrice}</p>
                <FiChevronRight className="text-gray-400" />
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrders;
