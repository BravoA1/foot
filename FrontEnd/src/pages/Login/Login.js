import React, { useContext, useState } from "react";
import styles from "./Login.module.scss";
import Signup from "./Signup";
import Signin from "./Signin";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export default function Login() {
  const [loginActive, setLoginActive] = useState(false);
  const { user } = useContext(AuthContext);
  function handleClick() {
    setLoginActive(!loginActive);
  }
  return (
    <>
      {user ? (
        <Navigate to="/" />
      ) : (
        <div
          className={`d-flex align-items-center justify-content-center flex-fill ${styles.mainContain}`}
        >
          <div className={`${styles.main}`}>
            <Signup handleClick={handleClick} loginActive={loginActive} />
            <Signin handleClick={handleClick} loginActive={loginActive} />
          </div>
        </div>
      )}
    </>
  );
}
