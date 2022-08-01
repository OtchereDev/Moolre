import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import AuthInput from "../components/auth/AuthInput";
import EmailIcon from "../components/icons/emailIcon";
import PasswordIcon from "../components/icons/passwordIcon";
import TriangleIcon from "../components/icons/triangleIcon";
import AuthLayout from "../components/layouts/AuthLayout";
import Spinner from "../components/shared/spinner";
import { AuthContext } from "../context/AuthContext";
import { validateEmail } from "../helpers/vaildateEmail";

const Login = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showError, setShowError] = useState(false);
  const [loading, setLoading] = useState(false);

  const { login } = useContext(AuthContext);

  const handleLogin = async () => {
    setShowError(() => false);

    if (!email.length) {
      return toast.error("Please provide an email");
    }

    if (!validateEmail(email)) {
      return toast.error("Please provide a valid email");
    }

    if (!password.length) {
      return toast.error("Please provide a password");
    }

    const data = {
      email,
      password,
    };

    setLoading(() => true);
    // call api here
    try {
      await login(data);
    } catch (error) {
      setShowError(() => true);
      setLoading(() => false);
      return;
    }
    setLoading(() => false);
    toast.success("Login successful");
    router.push("/");
  };

  return (
    <AuthLayout title="Login | Moolre">
      <div className="lg:text-center">
        <h1 className="text-3xl lg:text-2xl font-medium  mb-3 2xl:text-2xl">
          Log In
        </h1>
      </div>

      <div className="mt-10 lg:mt-8 lg:border lg:w-4/12 lg:rounded-md lg:px-10 lg:py-6  2xl:w-3/12">
        <div>
          <AuthInput
            inputName="email"
            label="Email Address"
            value={email}
            inputPlaceholder={"eg someone@mail.com"}
            onChangeHandler={(e) => setEmail(e.target.value)}
            svgIcon={<EmailIcon />}
            inputType="text"
          />
        </div>

        <div className="mt-7 lg:mt-3">
          <AuthInput
            inputName="password"
            label="Password"
            value={password}
            inputPlaceholder={"Enter Password"}
            onChangeHandler={(e) => setPassword(e.target.value)}
            svgIcon={<PasswordIcon />}
            inputType="password"
            isPassword
          />
        </div>
        <div
          className={`text-blue-500 mt-3 flex ${
            showError ? " justify-between " : " justify-end"
          }`}
        >
          {showError && (
            <span className="inline-flex text-red-500 items-center text-sm">
              <TriangleIcon />
              <span>Incorrect credentials provided</span>
            </span>
          )}
          <span className="text-right cursor-pointer lg:text-sm inline-block">
            Forgot Password
          </span>
        </div>

        <div className="mt-24 lg:mt-7">
          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full font-medium outline-none py-4 lg:py-3 text-lg bg-baseBlue text-gray-100 rounded-sm lg:font-normal flex justify-center text-center px-5 items-center"
          >
            {!loading && <span>Log in</span>}
            {loading && <Spinner />}{" "}
          </button>
        </div>

        <div className="mt-5">
          <p
            onClick={() => router.push("/signup")}
            className="text-center text-sm cursor-pointer font-medium lg:font-normal text-blue-500"
          >
            I don&apos;t have an account
          </p>
        </div>

        <div className="absolute bottom-0 left-0 w-full  px-4">
          <div className="border-t w-full flex py-4">
            <div className="w-5/12">
              <p className="text-sm">&copy;OtchereDev</p>
            </div>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
};

export default Login;

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  return {
    props: {},
  };
};
