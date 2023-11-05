"use client";

import React, { useState } from "react";
import ProductForm from "../common/productForm";
import PromoCodeForm from "../common/promoCodeForm";
import IAdminAction from "@/types/IAdminAction";
import actionButtonsConfig from "@/types/ActionButtonConfig";

const AdminPanel: React.FC = () => {
  const [selectedAction, setSelectedAction] = useState<string | null>(null);
  const handlePageChange = (action: string) => {
    setSelectedAction(action);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Form submitted for action:", selectedAction);
    setSelectedAction(null)
    // Process the form here (e.g., call an API)
  };

  const handleActionSelect = (action: IAdminAction) => {
    setSelectedAction(action);
  };

  const renderForm = () => {
    switch (selectedAction) {
      case IAdminAction.Add:
      case IAdminAction.Edit:
      case IAdminAction.Delete:
        return (
          <ProductForm onSubmit={handleSubmit} formType={selectedAction} />
        );
      case IAdminAction.AddPromo:
        return <PromoCodeForm onSubmit={handleSubmit} />;
      default:
        return null;
    }
  };

  return (
    <div className="admin-panel p-8">
      <h1 className="text-3xl font-bold mb-4">Admin Panel</h1>
      <div className="space-y-3">
        {!selectedAction ? (
          <>
            <p>Here you can manage the products in the store.</p>
            <div className="flex flex-col space-y-2">
              {Object.entries(actionButtonsConfig).map(
                ([action, { label, color }]) => (
                  <button
                    key={action}
                    onClick={() => handleActionSelect(action as IAdminAction)}
                    className={`bg-${color}-500 text-white py-2 px-4 rounded hover:bg-${color}-600`}
                  >
                    {label}
                  </button>
                )
              )}
            </div>
          </>
        ) : (
          renderForm()
        )}
        {selectedAction && (
          <button
            onClick={() => setSelectedAction(null)}
            className="mt-4 bg-gray-300 text-black py-2 px-4 rounded hover:bg-gray-400"
          >
            Back to Actions
          </button>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
