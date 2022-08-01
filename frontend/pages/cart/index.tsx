import React, { useEffect, useState } from "react";
import Layout from "../../components/layouts/Layout";
import { CheckIcon, ClockIcon } from "@heroicons/react/solid";
import { GetServerSideProps, NextPage } from "next";
import { FRONTEND_API } from "../../config/config";
import cookie from "cookie";
import { IProduct } from "..";
import { toast } from "react-toastify";
import CartItem from "../../components/auth/CartItem";
import PaymentModal from "./PaymentModal";
import Link from "next/link";

export interface ICartItem {
  id: string;
  productName: string;
  price: number;
  imageUrl: string;
  quantity: number;
}

interface IIndex {
  products: ICartItem[];
  cartTotal: number;
  message: string;
  status: string;
}

const Index: NextPage<IIndex> = ({ products, cartTotal, message, status }) => {
  // useEffect(() => {
  //   if (status == "success") toast.success(message);
  //   if (status == "error") toast.error(message);
  // }, []);

  console.log(message, status);

  const [allProduct, setAllProducts] = useState(products);
  const [isPaymentLoading, setIsPaymentLoading] = useState(false);

  const [total, setTotal] = useState(cartTotal);
  const [isPaymentOpenModal, setIsPaymentOpenModal] = useState(false);

  const handlePayment = async () => {
    setIsPaymentLoading(() => true);
    const request = await fetch("/api/checkout", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
    });
    const data = await request.json();
    setIsPaymentLoading(() => false);
    if (request.ok) {
      toast.success(data.message);
      setIsPaymentOpenModal(() => true);
      setAllProducts(() => []);
    }
  };

  return (
    <Layout title="Your Cart" headerText="Shopping Cart">
      <div className="bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:py-6 sm:px-6 lg:px-8">
          <div className="mt-12">
            <div>
              <h2 className="sr-only">Items in your shopping cart</h2>

              <ul
                role="list"
                className="border-t border-b border-gray-200 divide-y divide-gray-200"
              >
                {allProduct?.length > 0 &&
                  allProduct?.map((product, productIdx) => (
                    <CartItem
                      key={productIdx}
                      product={product}
                      productIdx={productIdx}
                      setCartTotal={setTotal}
                      setAllProducts={setAllProducts}
                    />
                  ))}

                {status == "error" && <p>{message}</p>}

                {allProduct?.length <= 0 && status == "success" && (
                  <p>You have no item in your cart</p>
                )}
              </ul>
            </div>

            {/* Order summary */}
            <section aria-labelledby="summary-heading" className="mt-10">
              <h2 id="summary-heading" className="sr-only">
                Order summary
              </h2>

              <div>
                <dl className="space-y-4">
                  <div className="flex items-center justify-between">
                    <dt className="text-base font-medium text-gray-900">
                      Subtotal
                    </dt>
                    <dd className="ml-4 text-base font-medium text-gray-900">
                      ${total}
                    </dd>
                  </div>
                </dl>
              </div>

              <div className="mt-10">
                <button
                  type="submit"
                  className="w-full bg-indigo-600 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500"
                  onClick={() => handlePayment()}
                  disabled={isPaymentLoading || allProduct?.length <= 0}
                >
                  Checkout
                </button>
              </div>

              <div className="mt-6 text-sm text-center">
                <p>
                  or{" "}
                  <Link href="/">
                    <a className="text-indigo-600 font-medium hover:text-indigo-500">
                      Continue Shopping<span aria-hidden="true"> &rarr;</span>
                    </a>
                  </Link>
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
      <PaymentModal
        isOpen={isPaymentOpenModal}
        setOpen={setIsPaymentOpenModal}
        amount={total}
      />
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const failedProps = {
    message: "Please sign in to get access to your cart",
    status: "error",
  };
  if (!req.headers.cookie) {
    return {
      props: failedProps,
    };
  }

  let { access_token } = cookie.parse(req.headers.cookie);

  if (!access_token) {
    return {
      props: failedProps,
    };
  }
  const request = await fetch(`${FRONTEND_API}/get-cart`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ access_token }),
  });

  const data = await request.json();

  console.log(
    "xxxxL:",
    {
      message: data.message,
      status: "error",
    },
    request.ok
  );
  if (!request.ok)
    return {
      props: {
        message: data.message,
        status: "error",
      },
    };

  return {
    props: {
      message: data.message,
      status: "success",
      products: data.cart.cartItems?.map((item: any) => ({
        ...item.product,
        quantity: item.quantity,
      })),
      cartTotal: data.cartTotal,
    },
  };
};

export default Index;
