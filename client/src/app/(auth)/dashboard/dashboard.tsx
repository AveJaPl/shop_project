"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface User {
  email: string;
  id: number;
  name: string;
}

const DashboardComponent: React.FC<{ user: User }> = ({ user }) => {
  const router = useRouter();
  const [selectedPage, setSelectedPage] = useState("orders");

  const logout = async () => {
    try {
      await axios.post(
        "http://localhost:4000/user/logout",
        {},
        { withCredentials: true }
      );
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  const handlePageChange = (page: string) => {
    setSelectedPage(page);
  };

  return (
    <div className="h-full bg-gray-100 flex justify-center items-stretch py-12 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col justify-between h-full max-w-md w-1/3 bg-white p-6 space-y-8">
        <div>
          <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
          {user && (
            <div className="bg-blue-100 p-4 rounded-xl mb-6 space-y-4">
              <h2 className="text-lg font-semibold mb-2">
                Welcome, {user.name}
              </h2>
              <p className="text-gray-600">Your email is {user.email}</p>
            </div>
          )}
          <div className="space-y-4">
            <button
              onClick={() => handlePageChange("orders")}
              className="text-left block w-full text-lg font-semibold bg-blue-50 p-4 rounded-lg hover:bg-blue-100 transition"
            >
              Your Orders
            </button>
            <button
              onClick={() => handlePageChange("reviews")}
              className="text-left block w-full text-lg font-semibold bg-blue-50 p-4 rounded-lg hover:bg-blue-100 transition"
            >
              Your Reviews
            </button>
            <button
              onClick={() => handlePageChange("settings")}
              className="text-left block w-full text-lg font-semibold bg-blue-50 p-4 rounded-lg hover:bg-blue-100 transition"
            >
              Settings
            </button>
          </div>
        </div>
        <div>
          <button
            onClick={logout}
            className="block w-full text-lg font-semibold bg-red-500 text-white p-4 rounded-lg hover:bg-red-600 transition"
          >
            Wyloguj
          </button>
        </div>
      </div>
      <div className="max-w-lg w-2/3 bg-white p-6 border-l-2 border-indigo-300 space-y-8">
        <div className="w-full bg-blue-50 p-5">
          {selectedPage === "orders" && <OrdersComponent />}
          {selectedPage === "reviews" && <ReviewsComponent />}
          {selectedPage === "settings" && <SettingsComponent />}
        </div>
      </div>
    </div>
  );
};

function OrdersComponent() {
  return <div>Tutaj będzie zawartość zamówień.</div>;
}

function ReviewsComponent() {
  return <div>Tutaj będzie zawartość recenzji.</div>;
}

function SettingsComponent() {
  return <div>Tutaj będą ustawienia użytkownika.</div>;
}

export default DashboardComponent;
