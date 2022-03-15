import {getAuth, createUserWithEmailAndPassword} from "firebase/auth"
import { getAnalytics } from "firebase/analytics";
import styles from "../styles/Home.module.css";
import { useRef,useState } from "react";
import Link from "next/link";
import Router from "next/router";


const Signup = () => {
  
  const auth = getAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleSignIn() {
    
    createUserWithEmailAndPassword(auth,email,password).then((uc)=>{
        Router.push('/')
        
    }).catch(err=>{
        console.log(err); 
        
    })
  }

  return (
    <div className={`${styles.card} m-auto`}>
      <form>
        <h3>Sign Up</h3>
        <div className="form-group">
          <label>Email address</label>
          <input
          onChange={(e)=> setEmail(e.target.value)}
            type="email"
            className="form-control"
            placeholder="Enter email"
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
          onChange={(e)=> setPassword(e.target.value)}
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
          className="mt-10 btn btn-primary btn-block"
        >
          Sign Up
        </button>
        <p className="forgot-password text-sm text-right">
          Already registered? <Link href="/signin">Sign In</Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
