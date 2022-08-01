import React, { useState } from "react";
import { IProduct } from "../../pages";
import { ICartBody } from "../../pages/api/update-cart";
import { toast } from "react-toastify";
import Image from "next/image";

interface IProductCard {
  product: IProduct;
}

const ProductCard: React.FC<IProductCard> = ({ product }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleAddToCart = async () => {
    setIsLoading(() => true);
    const body: ICartBody = {
      productId: product.id,
      quantity: 1,
    };

    const request = await fetch("/api/update-cart", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const response = await request.json();
    console.log("response", response);

    if (request.ok) {
      toast.success(response.message);
    } else {
      toast.error(response.message);
    }

    setIsLoading(() => false);
  };
  return (
    <div>
      <div className="relative">
        <div className="relative w-full h-72 rounded-lg overflow-hidden">
          <Image
            src={product.imageUrl}
            alt={"product image"}
            layout="fill"
            className="w-full h-full object-center object-cover"
          />
        </div>
        <div className="relative mt-4">
          <h3 className="text-sm font-medium text-gray-900">
            {product.productName}
          </h3>
        </div>
        <div className="absolute top-0 inset-x-0 h-72 rounded-lg p-4 flex items-end justify-end overflow-hidden">
          <div
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black opacity-50"
          />
          <p className="relative text-lg font-semibold text-white">
            ${product.price}
          </p>
        </div>
      </div>
      <div className="mt-6">
        <button
          onClick={() => handleAddToCart()}
          disabled={isLoading}
          className="relative w-full flex bg-gray-100 border border-transparent rounded-md py-2 px-8 items-center justify-center text-sm font-medium text-gray-900 hover:bg-gray-200"
        >
          Add to cart
          <span className="sr-only">, {product.productName}</span>
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
