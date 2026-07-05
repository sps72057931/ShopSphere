import React from "react";
import { FiClock, FiPackage, FiTruck, FiMapPin, FiCheckCircle, FiXCircle } from "react-icons/fi";

export const ORDER_STEPS = ["Processing", "Packed", "Shipped", "Out for Delivery", "Delivered"];

const STATUS_CONFIG = {
  Processing: { color: "bg-yellow-100 text-yellow-800", icon: FiClock },
  Packed: { color: "bg-blue-100 text-blue-800", icon: FiPackage },
  Shipped: { color: "bg-indigo-100 text-indigo-800", icon: FiTruck },
  "Out for Delivery": { color: "bg-purple-100 text-purple-800", icon: FiMapPin },
  Delivered: { color: "bg-green-100 text-green-800", icon: FiCheckCircle },
  Cancelled: { color: "bg-red-100 text-red-800", icon: FiXCircle },
};

export const OrderStatusBadge = ({ status }) => {
  const config = STATUS_CONFIG[status] || STATUS_CONFIG.Processing;
  const Icon = config.icon;
  return (
    <span className={`badge ${config.color} gap-1`}>
      <Icon size={12} />
      {status}
    </span>
  );
};

export const OrderStatusTracker = ({ status }) => {
  if (status === "Cancelled") {
    return (
      <div className="flex items-center gap-2 text-red-600 font-medium py-4">
        <FiXCircle size={20} />
        This order has been cancelled.
      </div>
    );
  }

  const currentIndex = ORDER_STEPS.indexOf(status);

  return (
    <div className="flex items-start justify-between overflow-x-auto py-4 gap-1">
      {ORDER_STEPS.map((step, idx) => {
        const config = STATUS_CONFIG[step];
        const Icon = config.icon;
        const isDone = idx <= currentIndex;
        return (
          <div key={step} className="flex-1 flex flex-col items-center min-w-[80px] relative">
            {idx !== 0 && (
              <div
                className={`absolute top-4 -left-1/2 w-full h-0.5 ${
                  idx <= currentIndex ? "bg-primary-600" : "bg-gray-200"
                }`}
              />
            )}
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center z-10 ${
                isDone ? "bg-primary-600 text-white" : "bg-gray-200 text-gray-400"
              }`}
            >
              <Icon size={16} />
            </div>
            <p className={`text-xs mt-2 text-center ${isDone ? "text-gray-900 font-medium" : "text-gray-400"}`}>
              {step}
            </p>
          </div>
        );
      })}
    </div>
  );
};
