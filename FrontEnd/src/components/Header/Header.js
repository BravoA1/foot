import { Link } from "react-router-dom";
import logo from "../../assets/images/foot.jpg";
import styles from "./Header.module.scss";
import { useContext, useState } from "react";
import MobileMenu from "./components/MobileMenu";
import { AuthContext } from "../../context/AuthContext";

export default function Header() {
  const { user, signout } = useContext(AuthContext);
  const [showMenu, setShowMenu] = useState(false);
  const [count, setCount] = useState(0);

  function addCount() {
    setCount(count + 1);
  }

  function handleClick() {
    if (count === 0) {
      setShowMenu(true);
      addCount();
    } else {
      setShowMenu(false);
      setCount(0);
    }
  }

  return (
    <header className={`d-flex align-items-center ${styles.header}`}>
      <div className={``}>
        <div className={`${styles.button}`}>
          <Link to="/">
            <img src={logo} alt="Logo" />
          </Link>
        </div>
      </div>
      <div className={`${styles.desktopHeader} d-flex `}>
        <ul className="flex-fill d-flex justify-content-end">
          <Link to="/rules">
            <div className={`${styles.button}`}>
              <span>Rules</span>
            </div>
          </Link>
          <Link to="/results">
            <div className={`${styles.button}`}>
              <span>Results</span>
            </div>
          </Link>
          <Link to="/">
            <div className={`${styles.button}`}>
              <span>Home</span>
            </div>
          </Link>
          {user ? (
            <>
              <Link to="/profile">
                <div className={`${styles.button}`}>
                  <span>Profile</span>
                </div>
              </Link>
              <Link to="/" onClick={() => signout()}>
                <div className={`${styles.button}`}>
                  <span>Sign out</span>
                </div>
              </Link>
            </>
          ) : (
            <Link to="/login">
              <div className={`${styles.button}`}>
                <span>Sign in</span>
              </div>
            </Link>
          )}
        </ul>
      </div>

      <i onClick={handleClick} className={`fas fa-bars mr10`}></i>
      {showMenu && (
        <>
          <MobileMenu />
        </>
      )}
    </header>
  );
}
