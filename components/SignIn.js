import { useState } from "react";
import Image from "next/image";
import styles from "../styles/SignUp.module.css";
import { Modal } from "antd";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { login } from "../reducers/user";
import { routeBE } from "../route";

export default function SignUp(props) {
  const dispatch = useDispatch();
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errMessage, setErrMessage] = useState("");

  const handleClick = () => {
    fetch(`${routeBE}/users/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          fetch(`${routeBE}/users/firstname/${data.token}`)
            .then((response) => response.json())
            .then((dataUsername) => {
              dispatch(
                login({
                  firstname: dataUsername.firstname,
                  username,
                  token: data.token,
                })
              );
              router.push("/home");
            });
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
      styles={{
        content: { backgroundColor: "rgb(23,31,42)", color: "white" },
        "close-icon": { color: "red" },
      }}
    >
      <div className={styles.main}>
        <Image
          src="/ReverseLogoTwitter.png"
          alt="reverse tweeter logo"
          width={80}
          height={80}
        />
        <h3>Connect to Hackatweet</h3>
        {errMessage && <span className={styles.errMessage}>{errMessage}</span>}
        <div className={styles.containerInputs}>
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
            Sing in
          </button>
        </div>
      </div>
    </Modal>
  );
}
