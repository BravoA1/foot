import { useContext } from "react";
import styles from "./Profile.module.scss";
//import { AuthContext } from "../../context";
import { AuthContext } from "../../context/AuthContext";
export default function Profile() {
  const { user } = useContext(AuthContext);
  return (
    <div
      className={`flex-fill d-flex justify-content-center align-items-center`}
    >
      <div className={`${styles.profileContainer} card p20`}>
        <ul>
          <li>Username: {user.username}</li>
          <li>Email: {user.email}</li>
        </ul>
      </div>
    </div>
  );
}
