import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { FiGrid, FiBox, FiShoppingBag, FiPlusCircle } from "react-icons/fi";

const AdminLayout = () => {
  const links = [
    { to: "/admin", label: "Overview", icon: FiGrid, end: true },
    { to: "/admin/products", label: "Products", icon: FiBox },
    { to: "/admin/products/new", label: "Add Product", icon: FiPlusCircle },
    { to: "/admin/orders", label: "Orders", icon: FiShoppingBag },
  ];

  return (
    <div className="container-custom py-8">
      <h1 className="section-title mb-6">Admin Dashboard</h1>
      <div className="flex flex-col lg:flex-row gap-8">
        <aside className="lg:w-56 shrink-0">
          <nav className="card p-3 flex lg:flex-col gap-1 overflow-x-auto">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.end}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                    isActive
                      ? "bg-primary-600 text-white"
                      : "text-gray-700 hover:bg-gray-50"
                  }`
                }
              >
                <link.icon size={16} /> {link.label}
              </NavLink>
            ))}
          </nav>
        </aside>
        <div className="flex-1 min-w-0">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
