import style from "./PoolCard.module.scss";
import { Link } from "react-router-dom";

function PoolCard({ pool }) {
  return (
    <Link to={`/login`}>
      <div
        className={`${style.card} d-flex align-item-center justify-content-center`}
      >
        <ul>
          <li>équipe 1</li>
          <li>équipe 2</li>
          <li>équipe 3</li>
          <li>équipe 4</li>
        </ul>
      </div>
    </Link>
  );
}
export default PoolCard;
