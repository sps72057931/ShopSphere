import React, { useEffect, useState } from "react";
import { FiBox, FiShoppingBag, FiDollarSign, FiClock } from "react-icons/fi";
import productService from "../../services/productService";
import orderService from "../../services/orderService";
import Loader from "../../components/Loader";

const AdminOverview = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [productsData, orders] = await Promise.all([
          productService.getProducts({ limit: 1000 }),
          orderService.getAllOrders(),
        ]);

        const totalRevenue = orders.reduce((acc, o) => acc + o.totalPrice, 0);
        const pendingOrders = orders.filter((o) =>
          ["Processing", "Packed", "Shipped", "Out for Delivery"].includes(o.orderStatus)
        ).length;

        setStats({
          totalProducts: productsData.total,
          totalOrders: orders.length,
          totalRevenue,
          pendingOrders,
          recentOrders: orders.slice(0, 5),
        });
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) return <Loader fullScreen />;

  const cards = [
    { label: "Total Products", value: stats.totalProducts, icon: FiBox, color: "bg-blue-500" },
    { label: "Total Orders", value: stats.totalOrders, icon: FiShoppingBag, color: "bg-green-500" },
    { label: "Total Revenue", value: `₹${stats.totalRevenue}`, icon: FiDollarSign, color: "bg-purple-500" },
    { label: "Pending Orders", value: stats.pendingOrders, icon: FiClock, color: "bg-orange-500" },
  ];

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
        {cards.map((card) => (
          <div key={card.label} className="card p-5 flex items-center gap-4">
            <div className={`${card.color} text-white p-3 rounded-xl`}>
              <card.icon size={22} />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{card.value}</p>
              <p className="text-sm text-gray-500">{card.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="card p-6">
        <h3 className="font-semibold text-gray-900 mb-4">Recent Orders</h3>
        {stats.recentOrders.length === 0 ? (
          <p className="text-gray-500 text-sm">No orders yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-500 border-b">
                  <th className="pb-2">Order ID</th>
                  <th className="pb-2">Customer</th>
                  <th className="pb-2">Status</th>
                  <th className="pb-2 text-right">Total</th>
                </tr>
              </thead>
              <tbody>
                {stats.recentOrders.map((order) => (
                  <tr key={order._id} className="border-b last:border-0">
                    <td className="py-3 text-gray-700">#{order._id.slice(-8).toUpperCase()}</td>
                    <td className="py-3 text-gray-700">{order.user?.name || "N/A"}</td>
                    <td className="py-3 text-gray-700">{order.orderStatus}</td>
                    <td className="py-3 text-gray-900 font-medium text-right">₹{order.totalPrice}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminOverview;
