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
        <div className={`${styles.button}d-flex justify-content-star`}>
          <Link to="/">
            <img src={logo} alt="Logo" />
          </Link>
        </div>
      </div>
      <div className={`${styles.desktopHeader} d-flex `}>
        <ul className="flex-fill d-flex justify-content-end">
          {user ? (
            <>
              <Link to="/profile">
                <div className={`${styles.button}`}>
                  <span>Profil</span>
                </div>
              </Link>
              <Link to="/" onClick={() => signout()}>
                <div className={`${styles.button}`}>
                  <span>Déconnexion</span>
                </div>
              </Link>
            </>
          ) : (
            <Link to="/login">
              <div className={`${styles.button}`}>
                <span>Connexion</span>
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
