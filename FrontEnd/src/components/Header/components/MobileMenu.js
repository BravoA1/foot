import { Link } from "react-router-dom";
import styles from "./MobileMenu.module.scss";

export default function MobileMenu() {
  return (
    <div className={`card ${styles.menuContainer} `}>
      <div className="d-flex justify-content-start">
        <div>
          <Link to="/" className="decoNone">
            <button className="d-flex justify-content-center las la-home la-2x btn-primary"></button>
          </Link>
        </div>
        <div>
          <Link to="/search" className="decoNone">
            <button className="d-flex justify-content-center align-items-center las la-search la-2x btn-primary"></button>
          </Link>
        </div>
        <div>
          <Link to="/" className="decoNone">
            <button className="d-flex justify-content-center align-items-center las la-sign-in-alt la-2x btn-primary"></button>
          </Link>
        </div>
        <div>
          <Link to="/" className="decoNone">
            <button className="las la-shopping-cart la-2x d-flex justify-content-center align-items-center btn-primary"></button>
          </Link>
        </div>
      </div>
    </div>
  );
}
