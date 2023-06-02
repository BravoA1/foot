import style from "./Card.module.scss";
import edit_icon from "../../../assets/images/edit.svg";
import delete_icon from "../../../assets/images/delete.svg";
import { useState, useEffect } from "react";
import { getTeamPositions } from "../../../helper/helper";

/*
 * A pool card has 3 states:
 *   - 0 normal: display names of the four teams and stuffs
 *   - 1 edit-idle:
 *                 - case new pool: icon add
 *                 - case edit pool: normal + icon edit at bottom
 *   - 2 edit:
 *                 - case new pool: edition is enabled + icon register + icon cancel
 *                 - case edit pool: edition is enabled + icon register + icon cancel
 */

function PoolCard({
  pool = null,
  mainEditBtnToggled,
  handleDelete,
  handleEdit,
}) {
  const [positionsList, setPositionsList] = useState([]);
  //const [localeEditBtnToggled, setLocaleEditBtnToggled] = useState(false);

  useEffect(() => {
    setPositionsList(pool ? getTeamPositions(pool) : []);
  }, [pool]);

  function handleLocaleEditBtnToggle() {
    //setLocaleEditBtnToggled(!localeEditBtnToggled);
    pool.onEdit = 1;
    handleEdit(pool);
  }
  function handleLocaleBetEditToggle() {
    pool.onEdit = 2;
    handleEdit(pool);
  }
  function handleLocaleDeleteBtnToggle() {
    handleDelete(pool);
  }
  return (
    <div className="d-flex flex-column align-items-center">
      <div
        className={`${style.card} c-pointer`}
        onClick={handleLocaleBetEditToggle}
      >
        <table className={`${style.scoreTable}`}>
          <thead>
            <tr>
              <th>Teams</th>
              <th>Scores</th>
              <th>Positions</th>
              <th>Bets</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{pool.name1}</td>
              <td>{pool.score1}</td>
              <td>{positionsList[0]}</td>
              <td>{pool.bet1}</td>
            </tr>
            <tr>
              <td>{pool.name2}</td>
              <td>{pool.score2}</td>
              <td>{positionsList[1]}</td>
              <td>{pool.bet2}</td>
            </tr>
            <tr>
              <td>{pool.name3}</td>
              <td>{pool.score3}</td>
              <td>{positionsList[2]}</td>
              <td>{pool.bet3}</td>
            </tr>
            <tr>
              <td>{pool.name4}</td>
              <td>{pool.score4}</td>
              <td>{positionsList[3]}</td>
              <td>{pool.bet4}</td>
            </tr>
          </tbody>
        </table>
      </div>
      {mainEditBtnToggled && (
        <div className="d-flex flex-row align-items-center">
          <button onClick={handleLocaleEditBtnToggle} className="btnRound">
            <img src={edit_icon} alt="add" />
          </button>
          <button onClick={handleLocaleDeleteBtnToggle} className="btnRound">
            <img src={delete_icon} alt="delete" />
          </button>
        </div>
      )}
    </div>
  );
}
export default PoolCard;
