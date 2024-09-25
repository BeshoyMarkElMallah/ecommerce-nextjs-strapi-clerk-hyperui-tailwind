"use client";
import React, { useEffect, useState } from "react";
import ProductApis from "../../_utils/ProductApis";
import BreadCrumb from "../../_components/BreadCrumb";
import ProductBanner from "./_components/ProductBanner";
import ProductInfo from "./_components/ProductInfo";
import ProductList from "../../_components/ProductList";
import { usePathname } from "next/navigation";

const ProductDetails = ({ params }) => {
  const path = usePathname();
  console.log("path", path);
  const [productDetails, setProductDetails] = useState({});
  const [productCategoryList, setProductCategoryList] = useState([]);
  useEffect(() => {
    console.log("Holaaaa");

    getProductById_();
  }, [params?.productId]);

  const getProductById_ = () => {
    ProductApis.getProductById(params?.productId).then((res) => {
      console.log("product item ", res.data.data);

      setProductDetails(res.data.data);
      getProductByCategory_(res.data.data);
    });
  };

  const getProductByCategory_ = (product) => {
    ProductApis.getProductByCategory(product?.category).then((res) => {
      console.log("product Category ", res.data.data);
      setProductCategoryList(res.data.data);
    });
  };
  console.log("Your Data Is Here");
  console.log(productDetails.id);
  return (
    <div className="px-10 py-8 md:px-28">
      <BreadCrumb path={path} />
      <div className="grid justify-around grid-cols-1 gap-5 mt-10 sm:gap-0 sm:grid-cols-2 ">
        <ProductBanner product={productDetails} />
        <ProductInfo product={productDetails} />
      </div>
      <div>
        <h2 className="mt-24 mb-4 text-xl font-bold">Similar Products</h2>
        <ProductList productList={productCategoryList} />
      </div>
    </div>
  );
};

export default ProductDetails;
