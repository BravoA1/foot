import style from "./Card.module.scss";
import { Link } from "react-router-dom";
import plus from "../../../assets/images/icon-plus.svg";

function PlusCard() {
  return (
    <Link to={`/login`}>
      <div className={`${style.card}`}>
        <img src={plus} alt="Logo" />
      </div>
    </Link>
  );
}
export default PlusCard;
