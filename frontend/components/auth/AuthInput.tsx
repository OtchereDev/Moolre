import React, { useState } from "react";
import EyeClosed from "../icons/eyeClosed";
import EyeOpened from "../icons/eyeOpened";

interface IProps {
  label: string;
  inputType: string;
  inputName: string;
  inputId?: string;
  inputPlaceholder: string;
  value: string;
  onChangeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isPassword?: boolean;
  svgIcon: React.ReactNode;
}

const AuthInput: React.FC<IProps> = ({
  label,
  inputType,
  value,
  onChangeHandler,
  isPassword = false,
  svgIcon,
  inputName,
  inputPlaceholder,
  inputId,
}) => {
  const [type, setType] = useState(inputType);

  const showPasswordHandler = () => {
    if (type == "password") {
      setType(() => "text");
    } else {
      setType(() => "password");
    }
  };

  return (
    <>
      <label
        htmlFor="password"
        className="block lg:text-sm text-gray-500 font-medium 2xl:text-lg"
      >
        {label}
      </label>
      <div className="mt-1 relative rounded-md shadow-sm">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
          {svgIcon}
        </div>
        <input
          type={type}
          name={inputName}
          id={inputId}
          value={value}
          onChange={onChangeHandler}
          className="focus:ring-indigo-500 focus:border-indigo-500 block w-full p-10 py-3 sm:text-sm lg:placeholder:text-sm placeholder:text-gray-400 border-gray-300 border rounded-sm"
          placeholder={inputPlaceholder}
          autoComplete={"off"}
        />
        {isPassword && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-cursor cursor-pointer z-10 text-gray-400">
            {type == "password" ? (
              <EyeOpened onClick={showPasswordHandler} />
            ) : (
              <EyeClosed onClick={showPasswordHandler} />
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default AuthInput;
