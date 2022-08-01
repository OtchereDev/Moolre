import Head from "next/head";
import React from "react";
import Layout from "./Layout";

interface IProps {
  title: string;
  children: React.ReactNode;
}

const AuthLayout: React.FC<IProps> = ({ title, children }) => {
  return (
    <Layout title={title} addPadding={false}>
      {/* <Head>
        <title>{title}</title>
      </Head> */}
      <div className=" w-100 min-h-full h-screen pt-20 lg:pt-20 2xl:pt-28 px-5 relative lg:flex lg:flex-col lg:items-center">
        {children}
      </div>
    </Layout>
  );
};

export default AuthLayout;
