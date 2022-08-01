import React, { Dispatch, SetStateAction, useState } from "react";
import { ICartItem } from "../../pages/cart";
import { toast } from "react-toastify";
import Image from "next/image";

interface ICartProduct {
  product: ICartItem;
  productIdx: number;
  setCartTotal: Dispatch<SetStateAction<number>>;
  setAllProducts: Dispatch<React.SetStateAction<ICartItem[]>>;
}

const CartItem: React.FC<ICartProduct> = ({
  product,
  productIdx,
  setCartTotal,
  setAllProducts,
}) => {
  const [quantity, setQuantity] = useState(product.quantity);

  const handleUpdate = async (value: number) => {
    const request = await fetch("/api/update-cart", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        productId: product.id,
        quantity: value,
      }),
    });
    const data = await request.json();
    if (request.ok) {
      setCartTotal(() => data.cartTotal);
      setQuantity(() => value);
      toast.success(data.message);

      if (!value) {
        setAllProducts((products) =>
          products.filter((item) => item.id != product.id)
        );
      }
    }
    console.log("ddd:", data, value);
  };
  return (
    <li key={product.id} className="flex py-6 sm:py-10">
      <div className="flex-shrink-0">
        <div className="w-24 h-24 relative overflow-hidden rounded-lg object-center object-cover sm:w-32 sm:h-32">
          <Image
            src={product.imageUrl}
            alt={"product image"}
            className=""
            layout="fill"
          />
        </div>
      </div>

      <div className="relative ml-4 flex-1 flex flex-col justify-between sm:ml-6">
        <div>
          <div className="flex justify-between sm:grid sm:grid-cols-2">
            <div className="pr-6">
              <h3 className="text-sm">
                <a
                  // href={product.href}
                  className="font-medium text-gray-700 hover:text-gray-800"
                >
                  {product.productName}
                </a>
              </h3>
            </div>

            <p className="text-sm font-medium text-gray-900 text-right">
              ${product.price * quantity}
            </p>
          </div>

          <div className="mt-4 flex items-center sm:block sm:absolute sm:top-0 sm:left-1/2 sm:mt-0">
            <label htmlFor={`quantity-${productIdx}`} className="sr-only">
              Quantity, {product.productName}
            </label>
            <select
              id={`quantity-${productIdx}`}
              name={`quantity-${productIdx}`}
              className="block max-w-full rounded-md border border-gray-300 py-1.5 text-base leading-5 font-medium text-gray-700 text-left shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={quantity}
              onChange={(e) => handleUpdate(parseInt(e.target.value))}
            >
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
              <option value={6}>6</option>
              <option value={7}>7</option>
              <option value={8}>8</option>
            </select>

            <button
              type="button"
              className="ml-4 text-sm font-medium text-indigo-600 hover:text-indigo-500 sm:ml-0 sm:mt-3"
              onClick={() => handleUpdate(0)}
            >
              <span>Remove</span>
            </button>
          </div>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
