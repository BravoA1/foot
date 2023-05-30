import style from "./Card.module.scss";
import { Link } from "react-router-dom";
import edit_icon from "../../../assets/images/icon-edit.svg";
import delete_icon from "../../../assets/images/icon-delete.svg";
import { useState, useEffect } from "react";

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

  function getTeamPositions(pool) {
    const scores = [pool.score1, pool.score2, pool.score3, pool.score4];

    // Sort the scores in descending order
    const sortedScores = scores.slice().sort((a, b) => b - a);

    // Map the positions based on the sorted scores
    const positions = scores.map((score) => sortedScores.indexOf(score) + 1);

    return positions;
  }

  useEffect(() => {
    setPositionsList(pool ? getTeamPositions(pool) : []);
  }, [pool]);

  function handleLocaleEditBtnToggle() {
    //setLocaleEditBtnToggled(!localeEditBtnToggled);
    pool.onEdit = true;
    handleEdit(pool);
  }
  function handleLocaleDeleteBtnToggle() {
    handleDelete(pool);
  }
  return (
    <div className="d-flex flex-column align-items-center">
      <Link to={`/login`}>
        <div className={`${style.card}`}>
          <table className={`${style.scoreTable}`}>
            <thead>
              <tr>
                <th>Teams</th>
                <th>Scores</th>
                <th>Position</th>
                <th>Bet</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{pool.name1}</td>
                <td>{pool.score1}</td>
                <td>{positionsList[0]}</td>
              </tr>
              <tr>
                <td>{pool.name2}</td>
                <td>{pool.score2}</td>
                <td>{positionsList[1]}</td>
              </tr>
              <tr>
                <td>{pool.name3}</td>
                <td>{pool.score3}</td>
                <td>{positionsList[2]}</td>
              </tr>
              <tr>
                <td>{pool.name4}</td>
                <td>{pool.score4}</td>
                <td>{positionsList[3]}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Link>
      {mainEditBtnToggled && (
        <div className="d-flex flex-row align-items-center">
          <button
            onClick={handleLocaleEditBtnToggle}
            className={`${style.icon}`}
          >
            <img src={edit_icon} alt="add" />
          </button>
          <button
            onClick={handleLocaleDeleteBtnToggle}
            className={`${style.icon}`}
          >
            <img src={delete_icon} alt="delete" />
          </button>
        </div>
      )}
    </div>
  );
}
export default PoolCard;
