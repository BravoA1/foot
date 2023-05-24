import style from "./Card.module.scss";
import { Link } from "react-router-dom";

function PoolCard({ pool }) {
  return (
    <Link to={`/login`}>
      <div className={`${style.card}`}>
        <div className={`${style.card_teams}`}>
          <p>{pool.name1}</p>
          <p>{pool.name2}</p>
          <p>{pool.name3}</p>
          <p>{pool.name4}</p>
        </div>
        <div className={`${style.card_scores}`}>
          <p>{pool.score1}</p>
          <p>{pool.score2}</p>
          <p>{pool.score3}</p>
          <p>{pool.score4}</p>
        </div>
      </div>
    </Link>
  );
}
export default PoolCard;
