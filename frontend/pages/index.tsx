import type { GetServerSideProps, NextPage } from "next";
import { useEffect } from "react";
import Layout from "../components/layouts/Layout";
import { FRONTEND_API } from "../config/config";
import { toast } from "react-toastify";
import ProductCard from "../components/products/productCard";

export interface IProduct {
  id: string;
  productName: string;
  price: number;
  imageUrl: string;
}
interface IHome {
  message: string;
  products: IProduct[];
  status: string;
}

const Home: NextPage<IHome> = ({ message, products, status }) => {
  // useEffect(() => {
  //   if (status == "success") toast.success(message);
  //   if (status == "error") toast.error(message);
  // }, []);
  return (
    <>
      <Layout title="Home Page" headerText="Shop">
        <div className="bg-white">
          <div className="max-w-2xl mx-auto py-5 px-4 sm:py-5 sm:px-6 lg:max-w-7xl lg:px-8">
            <div className="mt-8 grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
              {products?.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const request = await fetch(`${FRONTEND_API}/fetch-products`, {
    method: "GET",
    headers: {
      "content-type": "application/json",
    },
  });

  const data = await request.json();

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
      products: data.products,
    },
  };
};

export default Home;
