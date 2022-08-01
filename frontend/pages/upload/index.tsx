import React, { useState } from "react";
import Layout from "../../components/layouts/Layout";
import Image from "next/image";
import { toast } from "react-toastify";
import { APIURL } from "../../config/config";
import { useRouter } from "next/router";

const Index = () => {
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [image, setImage] = useState<string>();
  const [imageFile, setImageFile] = useState<any>();
  const [isLoading, setIsLoading] = useState(false);

  const handleImage = async (e: any) => {
    if (e.target.files?.length) {
      const file = e.target.files[0];

      const reader = new FileReader();
      reader.onloadend = function () {
        setImage(() => reader.result as string);
        setImageFile(() => file);
      };

      reader.readAsDataURL(file);
    }
  };

  const handleClear = (e: any) => {
    setImage(() => undefined);
    setImageFile(() => undefined);
    e.preventDefault();
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
  };

  const router = useRouter();

  const handleSubmit = async () => {
    if (productName.trim().length <= 0)
      return toast.error("Product name cannot be empty");
    if (!price || price <= 0)
      return toast.error("Price cannot empty or cannot be 0 or less ");
    if (!imageFile) return toast.error("Product Image cannot be empty");

    setIsLoading(() => true);
    const formData = new FormData();
    formData.append("file", imageFile);

    const imageRequest = await fetch(`${APIURL}/uploader/upload`, {
      method: "POST",
      body: formData,
    });

    const imageResponse = await imageRequest.json();

    if (imageRequest.ok) {
      const body = {
        productName,
        price,
        imageUrl: imageResponse.imageUrl,
      };

      const request = await fetch(`/api/upload`, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "content-type": "application/json",
        },
      });

      const response = await request.json();
      if (request.ok) {
        toast.success(response.message);
        router.push("/");
      } else {
        toast.error("There was an unexpected error");
      }
    } else {
      toast.error("There was an unexpected error");
    }
    setIsLoading(() => false);
  };

  return (
    <Layout title="Upload A Product" headerText="Upload A Product">
      <div className="bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:py-6 sm:px-6 lg:px-8">
          <div className="col-span-6 sm:col-span-3">
            <label
              htmlFor="first-name"
              className="block text-sm font-medium text-gray-700"
            >
              Product Name
            </label>
            <input
              type="text"
              name="first-name"
              id="first-name"
              autoComplete="given-name"
              onChange={(e) => setProductName(() => e.target.value)}
              value={productName}
              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm border border-gray-300  rounded-md py-2 px-2"
            />
          </div>

          <div className="col-span-6 sm:col-span-3 mt-6">
            <label
              htmlFor="first-name"
              className="block text-sm font-medium text-gray-700"
            >
              Price
            </label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(() => e.target.valueAsNumber)}
              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block shadow-sm border border-gray-300 md:w-1/2 w-full   rounded-md py-2 px-2"
              min={1}
            />
          </div>
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700">
              Cover photo
            </label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
              <div className="space-y-1 text-center">
                {(image as string)?.length > 0 ? (
                  <>
                    <div className="w-full h-36 relative">
                      <Image src={image as string} alt="" layout="fill" />
                    </div>
                    <p
                      onClick={handleClear}
                      className="font-light inline-block cursor-pointer text-sm text-red-300"
                    >
                      Clear logo
                    </p>
                  </>
                ) : (
                  <>
                    <svg
                      className="mx-auto h-12 w-12 text-gray-400"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 48 48"
                      aria-hidden="true"
                    >
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <div className="flex text-center text-sm text-gray-600">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                      >
                        <p className="text-center">Upload a file</p>
                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          className="sr-only"
                          accept={"image/*"}
                          onChange={handleImage}
                        />
                      </label>
                    </div>
                    <p className="text-xs text-gray-500">
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="mt-10">
            <button
              type="submit"
              className="w-full bg-indigo-600 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500"
              onClick={() => handleSubmit()}
              disabled={isLoading}
            >
              Save product
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
