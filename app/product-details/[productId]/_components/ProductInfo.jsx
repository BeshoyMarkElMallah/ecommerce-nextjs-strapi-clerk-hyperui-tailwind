"use client";
import { AlertOctagon, BadgeCheck, ShoppingCart } from "lucide-react";
import React, { useContext } from "react";
import SkeletonProductInfo from "./SkeletonProductInfo";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import CartApis from "../../../_utils/CartApis";
import { CartContext } from "../../../_context/CartContext";
const ProductInfo = ({ product }) => {
  const { user } = useUser();
  const router = useRouter();
  const {cart,setCart} = useContext(CartContext)
  const handleAddToCart = () => {
    if (!user) {
      router.push("/sign-in");
    } else {
      const data = {
        data: {
          username: user.fullName,
          email: user.primaryEmailAddress.emailAddress,
          products: [product?.id],
        },
      };
      CartApis.addToCart(data)
        .then((res) => {
          console.log("cart created success",res.data.data);
          // console.log();
          setCart(oldCart=>[
            ...oldCart,{
              id:res?.data?.data?.id,
              product
            }
          ])
        })
        .catch((error) => {
          console.log("error", error);
        });
    }
  };
  return (
    <div>
      {product?.id ? (
        <div>
          <h2 className="text-[20px] font-bold">{product.title}</h2>
          <h2 className="text-[15px] text-gray-400">{product.category}</h2>
          {product?.description ? (
            <h2 className="text-[15px] font-bold">
              {product.description[0].children[0].text}
            </h2>
          ) : (
            <div>Loading ...</div>
          )}
          <h2 className="flex gap-2 items-center mt-2 text-[11px] text-gray-500">
            {product.instantDelivery ? (
              <BadgeCheck className="w-5 h-5 text-green-500" />
            ) : (
              <AlertOctagon className="w-5 h-5 text-red-500" />
            )}{" "}
            Eligible for Instant Delivery
          </h2>
          <h2 className="text-[32px] text-primary mt-3">$ {product?.price}</h2>
          <button
            onClick={() => handleAddToCart()}
            className="flex gap-2 p-3 text-white rounded-lg bg-primary hover:bg-teal-600"
          >
            <ShoppingCart /> Add To Cart
          </button>
        </div>
      ) : (
        <SkeletonProductInfo />
      )}
    </div>
  );
};

export default ProductInfo;
