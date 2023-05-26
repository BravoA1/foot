import style from "./Homepage.module.scss";
import PoolCard from "./components/PoolCard";
import { useState, useEffect, useContext } from "react";
import { fetchPoolsList } from "../../apis/pools";
import { AuthContext } from "../../context/AuthContext";
import edit_icon from "../../assets/images/icon-edit.svg";
import close_icon from "../../assets/images/icon-close.svg";

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

function Homepage() {
  const { user } = useContext(AuthContext);
  const superuser = user ? !!user.superuser : false;
  const [poolsList, setPoolsList] = useState(null);
  //const [edit, setEdit] = useState(false);
  const [mainEditBtnToggled, setMainEditBtnToggled] = useState(false);
  //const [state, setState] = useState(0);
  function handleEditClick() {
    setMainEditBtnToggled(!mainEditBtnToggled);
  }
  useEffect(() => {
    fetchPoolsList().then((response) => {
      if (response.length > 0) {
        setPoolsList(response);
      }
      //console.log(response);
    });
  }, []);
  return (
    <>
      {superuser && (
        <div className={`${style.floating}`} onClick={handleEditClick}>
          {mainEditBtnToggled ? (
            <img src={close_icon} alt="Close" />
          ) : (
            <img src={edit_icon} alt="Edit" />
          )}
        </div>
      )}
      <div
        className={`${style.container} d-flex flex-fill flex-wrap align-items-center justify-content-center`}
      >
        {poolsList &&
          poolsList.map((e) => (
            <PoolCard
              pool={e}
              key={e.id}
              mainEditBtnToggled={mainEditBtnToggled}
            />
          ))}
        {superuser && mainEditBtnToggled && (
          <PoolCard newPool={true} mainEditBtnToggled={mainEditBtnToggled} />
        )}
      </div>
    </>
  );
}

export default Homepage;
