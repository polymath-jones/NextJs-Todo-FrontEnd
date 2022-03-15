import styles from "../styles/Home.module.css";
import { useRef, useState } from "react";
import Link from "next/link";
import { getAuth,signInWithEmailAndPassword } from "firebase/auth";
import Router  from "next/router";

const Signin = () => {


  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const auth = getAuth();
  function handleSignIn() {

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        Router.push('/')
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode,errorMessage);
        
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
