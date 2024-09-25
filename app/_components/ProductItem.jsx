import Image from "next/image";
import React from "react";
import { List } from "lucide-react";
import Link from "next/link";

const ProductItem = ({ product }) => {
  console.log(product.category);

  return (
    <Link href={`/product-details/${product.documentId}`}>
      <div className="p-1 border-teal-400 hover:border hover:shadow-md hover:cursor-pointer">
        {product?.banner?.url ? (
          <Image
            src={`http://localhost:1337${product?.banner.url}`}
            alt="product-details-banner"
            width={450}
            height={350}
            className="rounded-lg h-[170px] object-fill"
          />
        ) : (
          <div className="w-[400px] h-[225px] bg-slate-200 rounded-lg animate-pulse"></div>
        )}
        <div className="flex items-center justify-between p-3 font-medium rounded-b-lg bg-gray-50">
          <div className="">
            <h2 className="text-[12px] font-bold line-clamp-1">
              {product.title}
            </h2>
            <h2 className="text-[10px] text-gray-400 flex  gap-1 items-center">
              <List className="w-4 h-4" /> {product?.category}
            </h2>
          </div>
          <h2>{product?.price}</h2>
        </div>
      </div>
    </Link>
  );
};

export default ProductItem;
