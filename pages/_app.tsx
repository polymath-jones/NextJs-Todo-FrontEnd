import "../styles/globals.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import type { AppProps } from "next/app";

import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCXq0xMwOtqk9DsOlLFm1wwR1HCS-KxMS0",
  authDomain: "react-5565c.firebaseapp.com",
  projectId: "react-5565c",
  storageBucket: "react-5565c.appspot.com",
  messagingSenderId: "779619083466",
  appId: "1:779619083466:web:35b089bc73986c6a880033",
  measurementId: "G-PG4GVZRC4P",
};

function MyApp({ Component, pageProps }: AppProps) {
  const app = initializeApp(firebaseConfig);
  return <Component {...pageProps} />;
}

export default MyApp;
