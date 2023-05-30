import style from "./Homepage.module.scss";
import PoolCard from "./components/PoolCard";
import PoolCardEdition from "./components/PoolCardEdition";
import { useState, useEffect, useContext } from "react";
import { fetchPoolsList } from "../../apis/pools";
import { AuthContext } from "../../context/AuthContext";
import edit_icon from "../../assets/images/icon-edit.svg";
import close_icon from "../../assets/images/icon-close.svg";
import { insertPool, updatePool, deletePool } from "../../apis/pools";

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
  const [poolsList, setPoolsList] = useState([]);
  //const [edit, setEdit] = useState(false);
  const [mainEditBtnToggled, setMainEditBtnToggled] = useState(false);
  //const [state, setState] = useState(0);
  useEffect(() => {
    //fetchPoolsList() .then((response) => { if (response.length > 0) { setPoolsList(response); } }) .catch((error) => window.alert("Error fetching pool list:", error));
    const fetchPoolsListApp = async () => {
      try {
        const fetchedPoolsList = await fetchPoolsList();
        setPoolsList(fetchedPoolsList);
      } catch (error) {
        window.alert(`Error fetching pool list: ${error}`);
      }
    };
    fetchPoolsListApp();
  }, []);
  async function handleAdd(pool) {
    const insertedData = await insertPool(pool);
    //console.log("insertedData:", insertedData);
    if (insertedData) {
      setPoolsList([...poolsList, insertedData]);
      setMainEditBtnToggled(false);
    }
  }
  async function handleDelete(pool) {
    if (deletePool(pool)) {
      setPoolsList((previousPoolsList) =>
        previousPoolsList.filter((poolItem) => poolItem.id !== pool.id)
      );
      //setMainEditBtnToggled(false);
    }
  }
  async function handleUpdate(pool) {
    const updatedData = await updatePool(pool);
    //console.log("updatedData:", updatedData);
    if (updatedData) {
      setPoolsList((previousPoolsList) =>
        previousPoolsList.map((poolItem) =>
          poolItem.id === updatedData.id ? updatedData : poolItem
        )
      );
      setMainEditBtnToggled(false);
    }
  }
  function handleEdit(pool) {
    setPoolsList((previousPoolsList) =>
      previousPoolsList.map((poolItem) =>
        poolItem.id === pool.id ? pool : poolItem
      )
    );
  }
  function handleMainEditBtnToggle() {
    setMainEditBtnToggled(!mainEditBtnToggled);
  }

  return (
    <>
      {superuser && (
        <div
          //className={`${style.floating} ${style.btnRound}`}
          className={`${style.floating} btnRound`}
          onClick={handleMainEditBtnToggle}
        >
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
          poolsList.map((e) => {
            switch (e.onEdit) {
              case undefined:
              case 0:
                return (
                  <PoolCard
                    pool={e}
                    key={e.id}
                    mainEditBtnToggled={mainEditBtnToggled}
                    handleDelete={handleDelete}
                    handleEdit={handleEdit}
                  />
                );
              case 1:
                return (
                  <PoolCardEdition
                    pool={e}
                    key={e.id}
                    mainEditBtnToggled={mainEditBtnToggled}
                    handleAdd={handleAdd}
                    handleUpdate={handleUpdate}
                    handleDelete={handleDelete}
                    handleEdit={handleEdit}
                  />
                );
              case 2:
                return <p> beting </p>;
              default:
                return null;
            }
          })}
        {superuser && mainEditBtnToggled && (
          <PoolCardEdition
            newPool={true}
            mainEditBtnToggled={mainEditBtnToggled}
            handleAdd={handleAdd}
            handleUpdate={handleUpdate}
            handleDelete={handleDelete}
          />
        )}
      </div>
    </>
  );
}

export default Homepage;
