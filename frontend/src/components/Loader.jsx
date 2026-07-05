import React from "react";

const Loader = ({ fullScreen = false, size = "md" }) => {
  const sizeClass = size === "sm" ? "w-5 h-5" : size === "lg" ? "w-16 h-16" : "w-10 h-10";

  const spinner = (
    <div
      className={`${sizeClass} border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin`}
    />
  );

  if (fullScreen) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        {spinner}
      </div>
    );
  }

  return <div className="flex items-center justify-center py-8">{spinner}</div>;
};

export default Loader;
