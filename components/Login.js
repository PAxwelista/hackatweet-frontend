import Image from "next/image";
import styles from "../styles/Login.module.css";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

export default function Login() {
  const router = useRouter();
  const user = useSelector((state) => state.user.value);
  user.token && router.push("/home");

  const [openSignIn, setOpenSignIn] = useState(false);
  const [openSignUp, setOpenSignUp] = useState(false);
  return (
    <div className={styles.main}>
      <div className={styles.leftSide}>
        <Image
          src={"/ReverseLogoTwitter.png"}
          height={500}
          width={500}
          alt="reverse twitter logo"
        />
      </div>
      <div className={styles.centerSide}>
        <Image
          src={"/ReverseLogoTwitter.png"}
          height={100}
          width={100}
          alt="reverse twitter logo"
        />
        <h1>See what's happening</h1>
        <h2>Join Hackatweet today.</h2>
        <div className={styles.buttonsContainer}>
          <button
            onClick={() => setOpenSignUp(true)}
            className={[styles.button, styles.signUpButton].join(" ")}
          >
            Sign up
          </button>
          <span>Already have an accound?</span>
          <button
            onClick={() => setOpenSignIn(true)}
            className={[styles.button, styles.signInButton].join(" ")}
          >
            Sign in
          </button>
        </div>
      </div>
      <SignIn open={openSignIn} onCancel={() => setOpenSignIn(false)} />
      <SignUp open={openSignUp} onCancel={() => setOpenSignUp(false)} />
    </div>
  );
}
