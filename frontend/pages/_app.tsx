import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { store } from "../store";
import AuthContext from "../context/AuthContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NextNProgress from "nextjs-progressbar";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <AuthContext>
        <NextNProgress color="#02a95c" />
        <ToastContainer />
        <Component {...pageProps} />
      </AuthContext>
    </Provider>
  );
}

export default MyApp;
