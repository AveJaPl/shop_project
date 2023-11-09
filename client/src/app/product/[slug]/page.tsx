"use client"

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { getProductById } from "@/services/ProductService";
import React, { Suspense, lazy } from "react";
import { Product } from "@/types/product";

const FullProductPage = lazy(() => import("@/components/layout/fullproductpage"));

const getIdFromSlug = (slug: string) => {
  const parts = slug.split("-");
  return parseInt(parts.pop() ?? "", 10) || null;
};

const createSlug = (name: string, id: number) => {
  return `${name.toLowerCase().split(" ").join("-")}-${id}`;
};

function ProductPage() {
  const pathname = usePathname();
  const [product, setProduct] = useState<Product | null>(null);
  const slug = pathname.split("/").pop() || "";
  const [loadingState, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProduct = async () => {
      const id = getIdFromSlug(slug);
      if (id === null || id < 0 ) {
        setLoading(false);
        return;
      }

      try {
        const response = await getProductById(id);

        if (!response) {
          throw new Error("Product not found");
        }
        const responseSlug: string = createSlug(response.name, response.id);

        if (responseSlug !== slug) {
          throw new Error("Product not found");
        }
        setProduct(response as Product);
      } catch (error) {
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    setLoading(true);
    fetchProduct();

  }, [slug]);

  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        {loadingState ? (
          <div>Loading...</div>
        ) : product ? (
          <FullProductPage product={product} />
        ) : (
          <div>Product not found</div>
        )}
      </Suspense>
    </div>
  );
}

export default ProductPage;
