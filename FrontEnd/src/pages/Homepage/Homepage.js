import style from "./Homepage.module.scss";
import PoolCard from "./components/PoolCard";
import PoolCardEdition from "./components/PoolCardEdition";
import PoolCardBetting from "./components/PoolCardBetting";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import edit_icon from "../../assets/images/icon-edit.svg";
import close_icon from "../../assets/images/icon-close.svg";
import {
  fetchPoolsList,
  insertPool,
  updatePool,
  deletePool,
} from "../../apis/pools";
import { fetchBetsList, insertBet, updateBet } from "../../apis/bets";
import { fetchTournamentsList } from "../../apis/tournaments";

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
  const [tournamentsList, setTournamentsList] = useState([]);
  const [currentTournamentId, setCurrentTournamentId] = useState(undefined);
  const [mainEditBtnToggled, setMainEditBtnToggled] = useState(false);

  useEffect(() => {
    (() => {
      fetchTournamentsList()
        .then((response) => {
          if (response) {
            setTournamentsList(response);
            const lastId = response[response.length - 1].id;
            setCurrentTournamentId(lastId);
          }
        })
        .catch((error) =>
          window.alert(`Error fetching tournaments list: ${error}`)
        );
    })();
  }, []);

  useEffect(() => {
    (() => {
      if (!currentTournamentId) {
        return;
      }
      fetchPoolsList(currentTournamentId)
        .then((fetchedPoolsList) => {
          //setPoolsList(fetchedPoolsList);
          console.log("fetchedPoolsList:", fetchedPoolsList);
          if (fetchedPoolsList.length && user) {
            fetchBetsList(user.id)
              .then((fetchedBetsList) => {
                console.log("fetchedBetsList:", fetchedBetsList);
                if (fetchedBetsList.length) {
                  for (let j = 0; j < fetchedBetsList.length; j++) {
                    const poolId = fetchedBetsList[j].pool_id;
                    for (let i = 0; i < fetchedPoolsList.length; i++) {
                      if (fetchedPoolsList[i].id === poolId) {
                        fetchedPoolsList[i].bet1 = fetchedBetsList[j].position1;
                        fetchedPoolsList[i].bet2 = fetchedBetsList[j].position2;
                        fetchedPoolsList[i].bet3 = fetchedBetsList[j].position3;
                        fetchedPoolsList[i].bet4 = fetchedBetsList[j].position4;
                        break;
                      }
                    }
                  }
                }
                setPoolsList(fetchedPoolsList);
              })
              .catch((error) =>
                window.alert(`Error fetching bets list: ${error}`)
              );
          } else {
            setPoolsList(fetchedPoolsList);
          }
        })
        //.then((fetchedPoolsList) => setPoolsList(fetchedPoolsList))
        .catch((error) => window.alert(`Error fetching pools list: ${error}`));
    })();
  }, [currentTournamentId, user]);

  async function handleAdd(pool) {
    pool.tournament_id = currentTournamentId;
    const insertedData = await insertPool(pool);
    //console.log("insertedData:", insertedData);
    if (insertedData) {
      setPoolsList([...poolsList, insertedData]);
      setMainEditBtnToggled(false);
    }
  }

  async function handleDelete(pool) {
    pool.tournament_id = currentTournamentId;
    if (deletePool(pool)) {
      setPoolsList((previousPoolsList) =>
        previousPoolsList.filter((poolItem) => poolItem.id !== pool.id)
      );
    }
  }

  async function handleUpdate(pool) {
    pool.tournament_id = currentTournamentId;
    const updatedData = await updatePool(pool);
    if (updatedData) {
      setPoolsList((previousPoolsList) =>
        previousPoolsList.map((poolItem) =>
          poolItem.id === updatedData.id ? updatedData : poolItem
        )
      );
      setMainEditBtnToggled(false);
    }
  }

  async function handleBetAdd(bet) {
    console.log(bet);
    bet.user_id = user.id;
    const insertedBet = await insertBet(bet);
    if (insertedBet) {
      setPoolsList((previousPoolsList) =>
        previousPoolsList.map((poolItem) => {
          if (insertedBet.pool_id === poolItem.id) {
            poolItem.bet1 = insertedBet.position1;
            poolItem.bet2 = insertedBet.position2;
            poolItem.bet3 = insertedBet.position3;
            poolItem.bet4 = insertedBet.position4;
            poolItem.onEdit = 0;
          }
          return poolItem;
        })
      );
    }
  }

  async function handleBetUpdate(bet) {
    bet.user_id = user.id;
    const updatedBet = await updateBet(bet);
    if (updatedBet) {
      setPoolsList((previousPoolsList) =>
        previousPoolsList.map((poolItem) => {
          if (updatedBet.pool_id === poolItem.id) {
            poolItem.bet1 = updatedBet.position1;
            poolItem.bet2 = updatedBet.position2;
            poolItem.bet3 = updatedBet.position3;
            poolItem.bet4 = updatedBet.position4;
            poolItem.onEdit = 0;
          }
          return poolItem;
        })
      );
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

  function handleSelectChange(event) {
    setCurrentTournamentId(event.target.value);
    //fetchPoolAndBetData(currentTournamentId);
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
        className={`d-flex flex-fill align-items-center justify-content-center`}
      >
        <label>Tournament:</label>
        <select value={currentTournamentId} onChange={handleSelectChange}>
          {tournamentsList &&
            tournamentsList.map((tournament) => (
              <option key={tournament.id} value={tournament.id}>
                {tournament.dateYear}
              </option>
            ))}
        </select>
      </div>
      <div
        className={`d-flex flex-fill flex-wrap align-items-center justify-content-center`}
        // className={`${style.container} d-flex flex-fill flex-wrap align-items-center justify-content-center`}
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
                return (
                  <PoolCardBetting
                    pool={e}
                    key={e.id}
                    handleEdit={handleEdit}
                    handleBetAdd={handleBetAdd}
                    handleBetUpdate={handleBetUpdate}
                  />
                );
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
