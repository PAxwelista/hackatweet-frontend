import { useState } from "react";
import Image from "next/image";
import styles from "../styles/SignUp.module.css";
import { Modal } from "antd";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { login } from "../reducers/user";

export default function SignUp(props) {
  const dispatch = useDispatch();
  const router = useRouter();
  const [firstname, setFirstname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errMessage, setErrMessage] = useState("");

  const handleClick = () => {
    fetch("http://localhost:3000/users/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ firstname, username, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          dispatch(login({ firstname, username, token: data.token }));
          router.push("/home");
        } else {
          setErrMessage(data.error);
        }
      });
  };

  return (
    <Modal
      className={styles.modal}
      open={props.open}
      footer={null}
      onCancel={() => props.onCancel()}
      styles={{content:{backgroundColor:"rgb(23,31,42)" , color:"white"}}}
    >
        
      <div className={styles.main}>
        <Image
          src="/ReverseLogoTwitter.png"
          alt="reverse tweeter logo"
          width={80}
          height={80}
        />
        <h3>Create yout Hackatweet account</h3>
        {errMessage && <span className={styles.errMessage}>{errMessage}</span>}
        <div className={styles.containerInputs}>
          <input
            className={styles.input}
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
            placeholder="Firstname"
          />
          <input
            className={styles.input}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
          />
          <input
            type="password"
            className={styles.input}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <button onClick={() => handleClick()} className={styles.button}>
            Sing up
          </button>
        </div>
      </div>
    </Modal>
  );
}
