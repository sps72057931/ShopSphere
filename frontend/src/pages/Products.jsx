import React, { useEffect, useState, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { FiFilter, FiX } from "react-icons/fi";
import productService from "../services/productService";
import ProductCard from "../components/ProductCard";
import ProductFilters from "../components/ProductFilters";
import Loader from "../components/Loader";
import toast from "react-hot-toast";

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);

  const keyword = searchParams.get("keyword") || "";
  const category = searchParams.get("category") || "All";
  const sort = searchParams.get("sort") || "";
  const [priceRange, setPriceRange] = useState({
    min: searchParams.get("minPrice") || "",
    max: searchParams.get("maxPrice") || "",
  });

  useEffect(() => {
    productService.getCategories().then(setCategories).catch(() => {});
  }, []);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const params = {
        keyword,
        category: category !== "All" ? category : undefined,
        sort: sort || undefined,
        minPrice: priceRange.min || undefined,
        maxPrice: priceRange.max || undefined,
        page,
        limit: 12,
      };
      const data = await productService.getProducts(params);
      setProducts(data.products);
      setPages(data.pages);
    } catch (error) {
      toast.error("Failed to load products");
    } finally {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyword, category, sort, priceRange.min, priceRange.max, page]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    setPage(1);
  }, [keyword, category, sort, priceRange.min, priceRange.max]);

  const updateParams = (updates) => {
    const next = new URLSearchParams(searchParams);
    Object.entries(updates).forEach(([key, value]) => {
      if (value) next.set(key, value);
      else next.delete(key);
    });
    setSearchParams(next);
  };

  const handleCategoryChange = (cat) => updateParams({ category: cat === "All" ? "" : cat });
  const handleSortChange = (s) => updateParams({ sort: s });
  const handlePriceChange = (range) => {
    setPriceRange(range);
    updateParams({ minPrice: range.min, maxPrice: range.max });
  };
  const handleReset = () => {
    setPriceRange({ min: "", max: "" });
    setSearchParams({});
  };

  return (
    <div className="container-custom py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="section-title">
            {keyword ? `Search results for "${keyword}"` : category !== "All" ? category : "All Products"}
          </h1>
          <p className="text-gray-500 text-sm mt-1">{products.length} products found</p>
        </div>
        <button
          onClick={() => setShowMobileFilters(true)}
          className="lg:hidden btn-secondary flex items-center gap-2 text-sm"
        >
          <FiFilter /> Filters
        </button>
      </div>

      <div className="flex gap-8">
        {/* Desktop sidebar filters */}
        <aside className="hidden lg:block w-64 shrink-0">
          <ProductFilters
            categories={categories}
            selectedCategory={category}
            onCategoryChange={handleCategoryChange}
            priceRange={priceRange}
            onPriceChange={handlePriceChange}
            sort={sort}
            onSortChange={handleSortChange}
            onReset={handleReset}
          />
        </aside>

        {/* Mobile filters drawer */}
        {showMobileFilters && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div className="absolute inset-0 bg-black/50" onClick={() => setShowMobileFilters(false)} />
            <div className="absolute right-0 top-0 bottom-0 w-80 max-w-full bg-white p-5 overflow-y-auto animate-slide-up">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-lg">Filters</h3>
                <button onClick={() => setShowMobileFilters(false)}>
                  <FiX size={22} />
                </button>
              </div>
              <ProductFilters
                categories={categories}
                selectedCategory={category}
                onCategoryChange={(c) => {
                  handleCategoryChange(c);
                }}
                priceRange={priceRange}
                onPriceChange={handlePriceChange}
                sort={sort}
                onSortChange={handleSortChange}
                onReset={handleReset}
              />
            </div>
          </div>
        )}

        {/* Product grid */}
        <div className="flex-1">
          {loading ? (
            <Loader />
          ) : products.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
              <button onClick={handleReset} className="btn-primary mt-4">
                Clear Filters
              </button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                {products.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>

              {pages > 1 && (
                <div className="flex justify-center gap-2 mt-10">
                  {[...Array(pages).keys()].map((p) => (
                    <button
                      key={p + 1}
                      onClick={() => setPage(p + 1)}
                      className={`w-10 h-10 rounded-lg font-medium text-sm ${
                        page === p + 1
                          ? "bg-primary-600 text-white"
                          : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      {p + 1}
                    </button>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;
