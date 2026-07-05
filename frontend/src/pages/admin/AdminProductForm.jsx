import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FiUploadCloud, FiX } from "react-icons/fi";
import productService from "../../services/productService";
import Loader from "../../components/Loader";
import toast from "react-hot-toast";

const CATEGORY_OPTIONS = [
  "Electronics",
  "Fashion",
  "Home & Kitchen",
  "Books",
  "Toys",
  "Sports",
  "Beauty",
  "Groceries",
  "Other",
];

const AdminProductForm = () => {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    discountPrice: "",
    category: "Electronics",
    brand: "",
    stock: "",
    featured: false,
  });
  const [imageFiles, setImageFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
  const [loading, setLoading] = useState(isEdit);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isEdit) {
      productService.getProductById(id).then((data) => {
        setFormData({
          name: data.name,
          description: data.description,
          price: data.price,
          discountPrice: data.discountPrice || "",
          category: data.category,
          brand: data.brand || "",
          stock: data.stock,
          featured: data.featured,
        });
        setExistingImages(data.images || []);
        setLoading(false);
      }).catch(() => {
        toast.error("Failed to load product");
        setLoading(false);
      });
    }
  }, [id, isEdit]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImageFiles(files);
    setPreviews(files.map((file) => URL.createObjectURL(file)));
  };

  const removePreview = (idx) => {
    setImageFiles((prev) => prev.filter((_, i) => i !== idx));
    setPreviews((prev) => prev.filter((_, i) => i !== idx));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Product name is required";
    if (!formData.description.trim()) newErrors.description = "Description is required";
    if (!formData.price || formData.price <= 0) newErrors.price = "Enter a valid price";
    if (formData.stock === "" || formData.stock < 0) newErrors.stock = "Enter valid stock";
    if (!isEdit && imageFiles.length === 0) newErrors.images = "At least one image is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => data.append(key, value));
      imageFiles.forEach((file) => data.append("images", file));

      if (isEdit) {
        await productService.updateProduct(id, data);
        toast.success("Product updated successfully");
      } else {
        await productService.createProduct(data);
        toast.success("Product created successfully");
      }
      navigate("/admin/products");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to save product");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <Loader fullScreen />;

  return (
    <div className="card p-6 max-w-3xl">
      <h2 className="text-lg font-semibold text-gray-900 mb-6">
        {isEdit ? "Edit Product" : "Add New Product"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5" noValidate>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Product Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="input-field"
            placeholder="e.g. Wireless Bluetooth Headphones"
          />
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Description</label>
          <textarea
            rows={4}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="input-field"
            placeholder="Describe the product features and benefits..."
          />
          {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
        </div>

        <div className="grid grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Price (₹)</label>
            <input
              type="number"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              className="input-field"
              placeholder="999"
            />
            {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Discount Price (₹)</label>
            <input
              type="number"
              value={formData.discountPrice}
              onChange={(e) => setFormData({ ...formData, discountPrice: e.target.value })}
              className="input-field"
              placeholder="Optional"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Category</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="input-field"
            >
              {CATEGORY_OPTIONS.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Brand</label>
            <input
              type="text"
              value={formData.brand}
              onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
              className="input-field"
              placeholder="e.g. Generic"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-5 items-end">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Stock Quantity</label>
            <input
              type="number"
              value={formData.stock}
              onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
              className="input-field"
              placeholder="0"
            />
            {errors.stock && <p className="text-red-500 text-xs mt-1">{errors.stock}</p>}
          </div>
          <label className="flex items-center gap-2 pb-2.5 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.featured}
              onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
              className="accent-primary-600 w-4 h-4"
            />
            <span className="text-sm font-medium text-gray-700">Mark as Featured</span>
          </label>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Product Images</label>

          {existingImages.length > 0 && (
            <div className="flex flex-wrap gap-3 mb-3">
              {existingImages.map((img, idx) => (
                <img key={idx} src={img.url} alt="" className="w-20 h-20 rounded-lg object-cover border" />
              ))}
            </div>
          )}

          <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 cursor-pointer hover:border-primary-400 transition-colors">
            <FiUploadCloud className="text-gray-400 mb-2" size={28} />
            <span className="text-sm text-gray-500">Click to upload images (max 5)</span>
            <input type="file" accept="image/*" multiple onChange={handleImageChange} className="hidden" />
          </label>
          {errors.images && <p className="text-red-500 text-xs mt-1">{errors.images}</p>}

          {previews.length > 0 && (
            <div className="flex flex-wrap gap-3 mt-3">
              {previews.map((src, idx) => (
                <div key={idx} className="relative">
                  <img src={src} alt="" className="w-20 h-20 rounded-lg object-cover border" />
                  <button
                    type="button"
                    onClick={() => removePreview(idx)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                  >
                    <FiX size={12} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex gap-3 pt-2">
          <button type="submit" disabled={submitting} className="btn-primary">
            {submitting ? "Saving..." : isEdit ? "Update Product" : "Create Product"}
          </button>
          <button
            type="button"
            onClick={() => navigate("/admin/products")}
            className="btn-secondary"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminProductForm;
