import style from "./Homepage.module.scss";
import PoolCard from "./components/PoolCard";
import { useState, useEffect, useContext } from "react";
import { fetchPoolsList } from "../../apis/pools";
import { AuthContext } from "../../context/AuthContext";
import PlusCard from "./components/PlusCard";

function Homepage() {
  const { user } = useContext(AuthContext);
  //const superuser = user ? !!user.superuser : false;
  const superuser = true;
  const [poolsList, setPoolsList] = useState(null);
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
      <div className="flex-fill d-flex align-items-center justify-content-center">
        <div className={`${style.container}`}>
          {poolsList && poolsList.map((e) => <PoolCard pool={e} />)}
          {superuser && <PlusCard />}
        </div>
      </div>
    </>
  );
}

export default Homepage;
