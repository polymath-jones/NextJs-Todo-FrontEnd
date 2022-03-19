import styles from "../styles/Home.module.css";
import { useRef, useState, useContext } from "react";
import Link from "next/link";
import Router from "next/router";
import { AuthContext, AuthDispatchContext } from "../components/auth";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const setAuthDetails = useContext(AuthDispatchContext);

  function handleSignIn() {
    var myHeaders = new Headers();
    // myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imt5QGdoLmNvbSIsImlhdCI6MTY0NzU5Mzk5MCwiZXhwIjoxNjQ4MTk4NzkwfQ.ay6DcvgQGu4i3fGJ1WxmQx2OxEcbz1SSLob2O5EjtWY");
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    var urlencoded = new URLSearchParams();
    urlencoded.append("email", email);
    urlencoded.append("password", password);

    fetch("http://localhost:3100/auth/login", {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow",
    })
      .then((response) => response.text())
      .then((result) => {
        const res = JSON.parse(result);

        setAuthDetails({
          user: res["user"]!["email"],
          token: res["token"],
          loggedIn: true,
        });

        Router.push("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  }

  return (
    <div className={`${styles.card} m-auto`}>
      <form>
        <h3>Sign In</h3>
        <div className="form-group">
          <label>Email address</label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            className="form-control"
            placeholder="Enter email"
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            className="form-control"
            placeholder="Enter password"
          />
        </div>
        <button
          onClick={(e) => {
            e.preventDefault();
            handleSignIn();
          }}
          type="submit"
          className="mt-10 btn btn-primary btn-block"
        >
          Sign In
        </button>
        <p className="forgot-password text-sm text-right">
          Not Registered? <Link href="/signup">Sign up</Link>
        </p>
      </form>
    </div>
  );
};

export default Signin;
