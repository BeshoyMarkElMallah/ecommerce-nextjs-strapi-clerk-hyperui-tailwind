"use client";
import Image from "next/image";
import React from "react";

const ProductBanner = ({ product }) => {
  console.log(product);
  return (
    <div>
      {product?.banner?.url ? (
        <Image
          src={`http://localhost:1337${product?.banner.url}`}
          alt="product-details-banner"
          width={400}
          height={500}
          className="rounded-lg h-[250px] object-fill"
          
        />
      ) : (
        <div className="w-[400px] h-[225px] bg-slate-200 rounded-lg animate-pulse"></div>
      )}
    </div>
  );
};

export default ProductBanner;
