import "../styles/globals.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import type { AppProps } from "next/app";
import { createContext, useState, ReactNode } from "react";
import { AuthProvider } from "../components/auth";


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;
