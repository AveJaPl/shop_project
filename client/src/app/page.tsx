import { NextPage } from "next";
import React from "react";
import BestSellers from "../components/layout/bestsellers";
import NewArrivals from "../components/layout/newarrivals";
import RecommendedProducts from "../components/layout/recommendedproducts";

const Home: NextPage = () => {
  return (
      <div className="container mx-auto px-4">
        <NewArrivals />
        <BestSellers />
        <RecommendedProducts />

      </div>
    );
};

export default Home;
