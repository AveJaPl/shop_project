import React, { useState, useEffect } from "react";
import IProductFormProps from "@/types/IProductFormProps";
import Category from "@/types/Category";
import { IAddedProduct, IModifiedProduct, Product } from "@/types/product";
import {
  getAllProducts,
  AddProduct,
  UpdateProduct,
  DeleteProduct,
  GetAllCategories,
} from "@/services/ProductService";
import { useRouter } from "next/navigation";

const ProductForm: React.FC<IProductFormProps> = ({ onSubmit, formType }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    price: 0,
    description: "",
    category: "",
    quantity: 0
  });
  const router = useRouter()

  const labelStyle = "block text-sm font-medium text-gray-700";
  const inputStyle = "mt-1 p-2 border rounded w-full";
  
  useEffect(() => {
    GetAllCategories().then(setCategories);
    if (formType !== "add") {
      getAllProducts().then(setProducts);
    }

  }, [formType]);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const productId = event.target.value;
    const product = products.find((p) => p.id!.toString() === productId);
    const category = categories.find((c)=>c.id === product?.categoryId);
    setSelectedProduct(product || null);
    if (product) {
      setFormData({
        name: product.name,
        price: product.price,
        description: product.description,
        category: category?.name || "Bez Kategorii",
        quantity: 0
      });
    }
  };
  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
      if (formType === "add") {
        const productToAdd = {
          ...formData,
        };
        await AddProduct(productToAdd as IAddedProduct);

      } else if (formType === "edit" && selectedProduct) {
        const category = categories.find((c)=>c.id === selectedProduct.categoryId);
        const productToUpdate = {
          ...selectedProduct,
          ...formData,
          id: selectedProduct.id,
          price: formData.price === 0 ? selectedProduct.price : formData.price,
          name: formData.name === "" ? selectedProduct.name : formData.name,
          description: formData.description === "" ? selectedProduct.description : formData.description,
          category: formData.category === "" ? category?.name || "Bez Kategorii" : formData.category,
          additionalQuantity: formData.quantity,
        };
        await UpdateProduct(selectedProduct.id as number, productToUpdate as IModifiedProduct);
        
      } else if (formType === "delete" && selectedProduct) {
        await DeleteProduct(selectedProduct.id!);

      }
      onSubmit(event);
  };

  return (
    <form onSubmit={handleFormSubmit} className="space-y-4">
      {formType !== "add" && (
        <select
          value={selectedProduct?.id.toString()}
          onChange={handleSelectChange}
          className="block w-full p-2 border rounded"
        >
          <option value="">Select a product</option>
          {products.map((product) => (
            <option key={product.id} value={product.id}>
              {product.name}
            </option>
          ))}
        </select>
      )}
      {formType !== "delete" && (
        <>
          {/* ... additional fields here ... */}
          <div>
            <label htmlFor="name" className={labelStyle}>
              Name:
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              className={inputStyle}
              value={formData.name}
              onChange={handleInputChange}
            />
          </div>
          {/* Repeat the above pattern for each field, adapting input types as needed */}
          <label htmlFor="price" className={labelStyle}>
            Price:
          </label>
          <input
            id="price"
            name="price"
            type="number"
            required
            className={inputStyle}
            value={formData.price}
            onChange={handleInputChange}
          />

          <label htmlFor="description" className={labelStyle}>
            Description:
          </label>
          <textarea
            id="description"
            name="description"
            className={inputStyle}
            value={formData.description}
            onChange={handleInputChange}
          />
          <label htmlFor="category" className={labelStyle}>
            Category:
          </label>
          <input
            id="category"
            name="category"
            list="category-list"
            className={inputStyle}
            value={formData.category}
            onChange={handleInputChange}
            placeholder="Select a category or type a new one"
          />
          <datalist id="category-list">
            {categories.map((category) => (
              <option key={category.id} value={category.name} />
            ))}
          </datalist>
          <label htmlFor="quantity" className={labelStyle}>
            {formType === 'add' ? 'Quantity' : 'Additional Quantity'}
          </label>
          <input
            id="quantity"
            name="quantity"
            className={inputStyle}
            value={formData.quantity}
            onChange={handleInputChange}
            />
        </>
      )}
      <button
        type="submit"
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
      >
        {formType === "add"
          ? "Add Product"
          : formType === "edit"
          ? "Save Changes"
          : "Delete Product"}
      </button>
    </form>
  );
};

export default ProductForm;
