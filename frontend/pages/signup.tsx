import router, { useRouter } from "next/router";
import React, { useContext, useState } from "react";
import AuthInput from "../components/auth/AuthInput";
import EmailIcon from "../components/icons/emailIcon";
import PasswordIcon from "../components/icons/passwordIcon";
import AuthLayout from "../components/layouts/AuthLayout";
import Spinner from "../components/shared/spinner";
import { AuthContext } from "../context/AuthContext";
import { validateEmail } from "../helpers/vaildateEmail";
import { toast } from "react-toastify";
import UserIcon from "../components/icons/userIcon";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");

  const router = useRouter();

  const { signup } = useContext(AuthContext);

  const [loading, setLoading] = useState(false);

  const handleContinue = async () => {
    if (!email.length) {
      return toast.error("Email is required");
    }

    if (!validateEmail(email)) {
      return toast.error("Please provide a valid email");
    }

    if (password.length < 8) {
      return toast.error("Password must not be less than 8 characters");
    }

    setLoading(() => true);
    try {
      await signup({ email, password, fullName });
      toast.success("Successfully created");
      router.push("/login");
    } catch (error) {}

    setLoading(() => false);
  };
  return (
    <AuthLayout title="Sign Up | Moolre">
      <>
        <div className="lg:text-center">
          <h1 className="text-3xl lg:text-2xl 2xl:text-2xl 2xl:font-medium font-medium mb-3 ">
            Create an account
          </h1>
        </div>

        <div className="mt-10 lg:mt-8 lg:border lg:w-4/12 lg:rounded-md lg:px-10 2xl:px-12 lg:py-6 2xl:w-3/12">
          <div className="">
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
              inputName="fullName"
              label="Full Name"
              value={fullName}
              inputPlaceholder={"Enter Your Full Name"}
              onChangeHandler={(e) => setFullName(e.target.value)}
              svgIcon={<UserIcon />}
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

          <div className="mt-24 lg:mt-7">
            <button
              onClick={handleContinue}
              disabled={loading}
              className="w-full font-medium outline-none py-4 lg:py-3 text-base bg-baseBlue text-gray-100 rounded-sm lg:font-normal flex justify-center text-center px-5 items-center"
            >
              {!loading && <span>Continue</span>}
              {loading && <Spinner />}{" "}
            </button>
          </div>

          <div className="mt-5">
            <p
              onClick={() => router.push("/login")}
              className="text-center text-blue-500 text-sm cursor-pointer font-medium lg:font-normal"
            >
              I have an account already
            </p>
          </div>

          <div className=" absolute bottom-0 left-0 w-full  px-4">
            <div className="border-t w-full flex py-4">
              <div className="w-5/12">
                <p className="text-sm">&copy;OtchereDev</p>
              </div>

              <div className="flex  text-sm w-7/12"></div>
            </div>
          </div>
        </div>
      </>
    </AuthLayout>
  );
};

export default Signup;
