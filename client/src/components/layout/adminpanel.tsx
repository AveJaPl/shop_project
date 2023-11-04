"use client"

import React, { useState } from "react";
import ProductForm from "../common/productForm";
import PromoCodeForm from "../common/promoCodeForm";

const AdminPanel: React.FC = () => {
    const [selectedAction, setSelectedAction] = useState<string | null>(null);
  
    const handlePageChange = (action: string) => {
      setSelectedAction(action);
    };
  
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      console.log('Form submitted for action:', selectedAction);
      // Process the form here (e.g., call an API)
    };
  
    return (
      <div className="admin-panel p-8">
        <h1 className="text-3xl font-bold mb-4">Admin Panel</h1>
        <div className="space-y-3">
          {!selectedAction ? (
            <>
              <p>Here you can manage the products in the store.</p>
              <div className="flex flex-col space-y-2">
                <button onClick={() => handlePageChange("view")} className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">View Products</button>
                <button onClick={() => handlePageChange("add")} className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600">Add Product</button>
                <button onClick={() => handlePageChange("edit")} className="bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600">Edit Product</button>
                <button onClick={() => handlePageChange("delete")} className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600">Delete Product</button>
                <button onClick={() => handlePageChange("add-promo")} className="bg-purple-500 text-white py-2 px-4 rounded hover:bg-purple-600">Add Promo Code</button>
              </div>
            </>
          ) : null}
          {selectedAction === "add" && (
            <ProductForm onSubmit={handleSubmit} formType="add" />
          )}
          {selectedAction === "edit" && (
            <ProductForm onSubmit={handleSubmit} formType="edit" />
          )}
           {selectedAction === "delete" && (
            <ProductForm onSubmit={handleSubmit} formType="delete" />
          )}
          {selectedAction === "add-promo" && (
            <PromoCodeForm onSubmit={handleSubmit} />
          )}
          {selectedAction && (
            <button onClick={() => setSelectedAction(null)} className="mt-4 bg-gray-300 text-black py-2 px-4 rounded hover:bg-gray-400">Back to Actions</button>
          )}
        </div>
      </div>
    );
};


export default AdminPanel;
