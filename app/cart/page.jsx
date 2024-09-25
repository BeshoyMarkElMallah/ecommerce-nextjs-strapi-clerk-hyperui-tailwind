"use client";
import React, { useContext } from "react";
import { CartContext } from "../_context/CartContext";
import Image from "next/image";
import CartApis from "../_utils/CartApis";
import { useRouter } from "next/navigation";

const CartPage = () => {
    const router = useRouter()
  const { cart, setCart } = useContext(CartContext);
  const getTotal = () => {
    let total = 0;
    cart.forEach((item) => {
      total += item.product.price;
    });
    return total.toFixed(2);
  };

  const deleteCartItemFromList = (id) => {
    console.log("id", id);
    CartApis.deleteCartItem(id)
      .then((res) => {
        if (res) {
          const newCart = cart.filter((item) => item.id !== id);
          setCart(newCart);
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
  };
  return (
    <section>
      <div className="max-w-screen-xl px-4 py-8 mx-auto sm:px-6 sm:py-12 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <header className="text-center">
            <h1 className="text-xl font-bold text-gray-900 sm:text-3xl">
              Your Cart
            </h1>
          </header>

          <div className="mt-8">
            <ul className="space-y-4">
              {cart.map((item) => (
                <li className="flex items-center gap-4">
                  <Image
                    src={`http://localhost:1337${item.product.banner.url}`}
                    height={350}
                    width={350}
                    alt=""
                    className="object-cover rounded size-16"
                  />
                  <div>
                    <h3 className="text-sm text-gray-900">
                      {item.product.title}
                    </h3>

                    <dl className="mt-0.5 space-y-px text-[10px] text-gray-600">
                      <div>
                        <dt className="inline">Category: </dt>
                        <dd className="inline">{item.product.category}</dd>
                      </div>

                      <div>
                        <dt className="inline">Price:</dt>
                        <dd className="inline"> ${item.product.price}</dd>
                      </div>
                    </dl>
                  </div>

                  <div className="flex items-center justify-end flex-1 gap-2 font-bold">
                    ${item.product.price}
                    <button
                      onClick={() => deleteCartItemFromList(item.id)}
                      className="text-gray-600 transition hover:text-red-600"
                    >
                      <span className="sr-only">Remove item</span>

                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="size-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                        />
                      </svg>
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            <div className="flex justify-end pt-8 mt-8 border-t border-gray-100">
              <div className="w-screen max-w-lg space-y-4">
                <dl className="space-y-0.5 text-sm text-gray-700">
                  <div className="flex justify-between !text-base font-bold">
                    <dt>Total</dt>
                    <dd>${getTotal()}</dd>
                  </div>
                </dl>

                <div className="flex justify-end">
                  <button
                    onClick={()=>router.push(`/checkout?amount=${getTotal()}`)}
                    className="block px-5 py-3 text-sm text-gray-100 transition bg-gray-700 rounded hover:bg-gray-600"
                  >
                    Checkout
                  </button>
                </div>
              </div>
            </div>
            <h2 className="text-gray-500 text-[12px]">Note: All items Will be Sent via Email</h2>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CartPage;
