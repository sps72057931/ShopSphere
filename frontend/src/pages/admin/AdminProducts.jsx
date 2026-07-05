import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiEdit2, FiTrash2, FiPlusCircle } from "react-icons/fi";
import productService from "../../services/productService";
import Loader from "../../components/Loader";
import toast from "react-hot-toast";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const data = await productService.getProducts({ limit: 1000 });
      setProducts(data.products);
    } catch (error) {
      toast.error("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    setDeletingId(id);
    try {
      await productService.deleteProduct(id);
      toast.success("Product deleted");
      setProducts((prev) => prev.filter((p) => p._id !== id));
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete product");
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) return <Loader fullScreen />;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">All Products ({products.length})</h2>
        <Link to="/admin/products/new" className="btn-primary flex items-center gap-2 text-sm">
          <FiPlusCircle /> Add Product
        </Link>
      </div>

      {products.length === 0 ? (
        <div className="card p-10 text-center text-gray-500">No products yet. Add your first product!</div>
      ) : (
        <div className="card overflow-x-auto">
          <table className="w-full text-sm min-w-[700px]">
            <thead>
              <tr className="text-left text-gray-500 border-b bg-gray-50">
                <th className="p-4">Product</th>
                <th className="p-4">Category</th>
                <th className="p-4">Price</th>
                <th className="p-4">Stock</th>
                <th className="p-4">Featured</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id} className="border-b last:border-0 hover:bg-gray-50">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={product.images?.[0]?.url || "https://via.placeholder.com/50"}
                        alt={product.name}
                        className="w-10 h-10 rounded-lg object-cover"
                      />
                      <span className="font-medium text-gray-800 line-clamp-1 max-w-[200px]">
                        {product.name}
                      </span>
                    </div>
                  </td>
                  <td className="p-4 text-gray-600">{product.category}</td>
                  <td className="p-4 text-gray-800 font-medium">
                    ₹{product.discountPrice > 0 ? product.discountPrice : product.price}
                  </td>
                  <td className="p-4">
                    <span className={product.stock === 0 ? "text-red-600 font-medium" : "text-gray-700"}>
                      {product.stock}
                    </span>
                  </td>
                  <td className="p-4">
                    {product.featured ? (
                      <span className="badge bg-green-100 text-green-700">Yes</span>
                    ) : (
                      <span className="badge bg-gray-100 text-gray-500">No</span>
                    )}
                  </td>
                  <td className="p-4">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        to={`/admin/products/edit/${product._id}`}
                        className="p-2 text-primary-600 hover:bg-primary-50 rounded-lg"
                      >
                        <FiEdit2 size={16} />
                      </Link>
                      <button
                        onClick={() => handleDelete(product._id)}
                        disabled={deletingId === product._id}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg disabled:opacity-50"
                      >
                        <FiTrash2 size={16} />
                      </button>
                    </div>
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

export default AdminProducts;
