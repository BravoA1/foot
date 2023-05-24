import style from "./Homepage.module.scss";
import PoolCard from "./components/PoolCard";
import { useState, useEffect } from "react";
import { getPoolsList } from "../../apis/pools";

function Homepage() {
  const [poolsList, setPoolsList] = useState(null);
  useEffect(() => {
    getPoolsList().then(async (pl) => setPoolsList(pl));
  });
  return (
    <>
      <div className="flex-fill d-flex align-items-center justify-content-center">
        <div className={`${style.container}`}>
          {/* {poolsList.map(e=>)} */}
          <PoolCard />
          <PoolCard />
        </div>
      </div>
    </>
  );
}

export default Homepage;
