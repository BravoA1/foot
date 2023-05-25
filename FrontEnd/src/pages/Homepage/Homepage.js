import style from "./Homepage.module.scss";
import PoolCard from "./components/PoolCard";
import { useState, useEffect, useContext } from "react";
import { fetchPoolsList } from "../../apis/pools";
import { AuthContext } from "../../context/AuthContext";
import PlusCard from "./components/PlusCard";
import edit_icon from "../../assets/images/icon-edit.svg";
import close_icon from "../../assets/images/icon-close.svg";

function Homepage() {
  const { user } = useContext(AuthContext);
  const superuser = user ? !!user.superuser : false;
  const [poolsList, setPoolsList] = useState(null);
  const [edit, setEdit] = useState(false);
  function handleEditClick() {
    setEdit(!edit);
  }
  useEffect(() => {
    const fetchAndSetPoolsList = async () => {
      const data = await fetchPoolsList();
      console.log(data);
      if (data.length > 0) {
        setPoolsList(data);
      }
    };
    fetchAndSetPoolsList();
  }, []);
  return (
    <>
      {superuser && (
        <div className={`${style.floating}`} onClick={handleEditClick}>
          {edit ? (
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
          poolsList.map((e) => <PoolCard pool={e} key={e.id} edit={edit} />)}
        {superuser && edit && <PlusCard edit={edit} />}
      </div>
    </>
  );
}

export default Homepage;
