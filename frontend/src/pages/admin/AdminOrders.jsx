import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import orderService from "../../services/orderService";
import { OrderStatusBadge } from "../../components/OrderStatus";
import Loader from "../../components/Loader";
import toast from "react-hot-toast";

const ALL_STATUSES = ["Processing", "Packed", "Shipped", "Out for Delivery", "Delivered", "Cancelled"];

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState("All");
  const [updatingId, setUpdatingId] = useState(null);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const data = await orderService.getAllOrders();
      setOrders(data);
    } catch (error) {
      toast.error("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId, status) => {
    setUpdatingId(orderId);
    try {
      const updated = await orderService.updateOrderStatus(orderId, status);
      setOrders((prev) => prev.map((o) => (o._id === orderId ? { ...o, orderStatus: updated.orderStatus } : o)));
      toast.success(`Order status updated to ${status}`);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update status");
    } finally {
      setUpdatingId(null);
    }
  };

  const filteredOrders = filterStatus === "All" ? orders : orders.filter((o) => o.orderStatus === filterStatus);

  if (loading) return <Loader fullScreen />;

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <h2 className="text-lg font-semibold text-gray-900">All Orders ({filteredOrders.length})</h2>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="input-field w-full sm:w-56 text-sm"
        >
          <option value="All">All Statuses</option>
          {ALL_STATUSES.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      {filteredOrders.length === 0 ? (
        <div className="card p-10 text-center text-gray-500">No orders found.</div>
      ) : (
        <div className="card overflow-x-auto">
          <table className="w-full text-sm min-w-[800px]">
            <thead>
              <tr className="text-left text-gray-500 border-b bg-gray-50">
                <th className="p-4">Order ID</th>
                <th className="p-4">Customer</th>
                <th className="p-4">Date</th>
                <th className="p-4">Items</th>
                <th className="p-4">Total</th>
                <th className="p-4">Status</th>
                <th className="p-4">Update Status</th>
                <th className="p-4"></th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order._id} className="border-b last:border-0 hover:bg-gray-50">
                  <td className="p-4 font-medium text-gray-800">#{order._id.slice(-8).toUpperCase()}</td>
                  <td className="p-4 text-gray-700">
                    {order.user?.name}
                    <br />
                    <span className="text-xs text-gray-400">{order.user?.email}</span>
                  </td>
                  <td className="p-4 text-gray-600">
                    {new Date(order.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                  </td>
                  <td className="p-4 text-gray-600">{order.orderItems.length}</td>
                  <td className="p-4 font-medium text-gray-900">₹{order.totalPrice}</td>
                  <td className="p-4"><OrderStatusBadge status={order.orderStatus} /></td>
                  <td className="p-4">
                    <select
                      value={order.orderStatus}
                      disabled={updatingId === order._id}
                      onChange={(e) => handleStatusChange(order._id, e.target.value)}
                      className="input-field text-xs py-1.5"
                    >
                      {ALL_STATUSES.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </td>
                  <td className="p-4">
                    <Link to={`/orders/${order._id}`} className="text-primary-600 text-xs font-medium hover:underline">
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminOrders;
