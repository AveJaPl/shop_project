"use client";

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

function ProductPage() {
  const pathname = usePathname();
  const [product, setProduct] = useState<Product | null>(null);
  const slug = pathname.split("/").pop();

  useEffect(() => {
    if (typeof slug !== "string") return;

    const id = getIdFromSlug(slug);
    if (id === null) return;

    (async () => {
      const response = await getProductById(id);
      setProduct(response as Product);
    })();
  }, [slug]);

  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        {product ? (
          <FullProductPage {...product} />
        ) : (
          <div>Loading...</div>
        )}
      </Suspense>

    </div>
  );
}

export default ProductPage;
