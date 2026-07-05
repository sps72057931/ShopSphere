import React from "react";

const ProductFilters = ({
  categories,
  selectedCategory,
  onCategoryChange,
  priceRange,
  onPriceChange,
  sort,
  onSortChange,
  onReset,
}) => {
  return (
    <div className="card p-5 space-y-6">
      <div>
        <h3 className="font-semibold text-gray-900 mb-3">Sort By</h3>
        <select
          value={sort}
          onChange={(e) => onSortChange(e.target.value)}
          className="input-field text-sm"
        >
          <option value="">Newest</option>
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
          <option value="name_asc">Name: A to Z</option>
          <option value="rating">Highest Rated</option>
        </select>
      </div>

      <div>
        <h3 className="font-semibold text-gray-900 mb-3">Category</h3>
        <div className="space-y-2 max-h-48 overflow-y-auto">
          <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
            <input
              type="radio"
              name="category"
              checked={selectedCategory === "All" || !selectedCategory}
              onChange={() => onCategoryChange("All")}
              className="accent-primary-600"
            />
            All Categories
          </label>
          {categories.map((cat) => (
            <label key={cat} className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
              <input
                type="radio"
                name="category"
                checked={selectedCategory === cat}
                onChange={() => onCategoryChange(cat)}
                className="accent-primary-600"
              />
              {cat}
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-semibold text-gray-900 mb-3">Price Range</h3>
        <div className="flex items-center gap-2">
          <input
            type="number"
            placeholder="Min"
            value={priceRange.min}
            onChange={(e) => onPriceChange({ ...priceRange, min: e.target.value })}
            className="input-field text-sm w-full"
          />
          <span className="text-gray-400">-</span>
          <input
            type="number"
            placeholder="Max"
            value={priceRange.max}
            onChange={(e) => onPriceChange({ ...priceRange, max: e.target.value })}
            className="input-field text-sm w-full"
          />
        </div>
      </div>

      <button onClick={onReset} className="btn-secondary w-full text-sm">
        Reset Filters
      </button>
    </div>
  );
};

export default ProductFilters;
