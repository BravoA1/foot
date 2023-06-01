import style from "./Homepage.module.scss";
import PoolCard from "./components/PoolCard";
import PoolCardEdition from "./components/PoolCardEdition";
import PoolCardBetting from "./components/PoolCardBetting";
import { useState, useEffect, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import edit_icon from "../../assets/images/edit.svg";
import close_icon from "../../assets/images/cancel.svg";
import add_icon from "../../assets/images/add.svg";
import lock_icon from "../../assets/images/lock.svg";
import unlock_icon from "../../assets/images/unlock.svg";
import {
  fetchPoolsList,
  insertPool,
  updatePool,
  deletePool,
} from "../../apis/pools";
import { fetchBetsList, insertBet, updateBet } from "../../apis/bets";
import {
  fetchTournamentsList,
  tournamentIsLocked,
  updateTournamentLocked,
  updateTournament,
  insertTournament,
} from "../../apis/tournaments";

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
  const [currentTournamentLocked, setCurrentTournamentLocked] =
    useState(undefined);
  const [mainEditBtnToggled, setMainEditBtnToggled] = useState(false);
  const [editTournament, setEditTournament] = useState(false);
  const selectTournamentRef = useRef();
  const inputTournamentRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    (() => {
      fetchTournamentsList()
        .then((fetchedTournamentsList) => {
          console.log("fetchedTournamentsList:", fetchedTournamentsList);
          if (fetchedTournamentsList) {
            setTournamentsList(fetchedTournamentsList);
            const last =
              fetchedTournamentsList[fetchedTournamentsList.length - 1];
            setCurrentTournamentId(last.id);
            setCurrentTournamentLocked(last.locked);
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
    //console.log(bet);
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

  function handleAddUpdateTournament() {
    switch (editTournament) {
      case 1:
        insertTournament({
          dateYear: inputTournamentRef.current.value,
        })
          .then((insertedData) => {
            if (insertedData)
              setTournamentsList([...tournamentsList, insertedData]);
            setMainEditBtnToggled(false);
          })
          .catch((error) => window.alert(`error: ${error}`));
        break;
      case 2:
        updateTournament({
          id: currentTournamentId,
          dateYear: inputTournamentRef.current.value,
        })
          .then((updatedTournament) => {
            if (updatedTournament) {
              setTournamentsList((previousTournamentsList) =>
                previousTournamentsList.map((previousTournament) =>
                  previousTournament.id === updatedTournament.id
                    ? updatedTournament
                    : previousTournament
                )
              );
            }
            setMainEditBtnToggled(false);
          })
          .catch((error) => window.alert(`error: ${error}`));
        break;
      default:
        break;
    }
  }

  function handleEdit(pool) {
    if (!user) {
      navigate("/login");
      return;
    }
    if (currentTournamentLocked && pool.onEdit === 2) {
      return;
    }
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
    tournamentIsLocked(event.target.value).then((response) =>
      setCurrentTournamentLocked(response.locked)
    );
    // setCurrentTournamentLock(event.target.value.lock);
    // setCurrentTournamentId(event.target.value.id);
    //fetchPoolAndBetData(currentTournamentId);
  }

  function handleTournamentEditBtnToggle() {
    if (
      updateTournamentLocked(
        currentTournamentId,
        currentTournamentLocked ? 0 : 1
      )
    ) {
      setCurrentTournamentLocked(!currentTournamentLocked);
      setMainEditBtnToggled(false);
    }
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
        <label className="mr10">Tournament:</label>
        <select
          value={currentTournamentId}
          onChange={handleSelectChange}
          className="mr10"
          ref={selectTournamentRef}
        >
          {tournamentsList &&
            tournamentsList.map((tournament) => (
              <option key={tournament.id} value={tournament.id}>
                {tournament.dateYear}
              </option>
            ))}
        </select>
        {!!currentTournamentLocked && !mainEditBtnToggled && (
          <img src={lock_icon} alt="lock" className="icon" />
        )}
        {superuser &&
          mainEditBtnToggled &&
          (editTournament ? (
            <>
              <input
                className="mr10"
                ref={inputTournamentRef}
                type="number"
                min={1900}
                defaultValue={
                  editTournament === 2 &&
                  selectTournamentRef.current.options[
                    selectTournamentRef.current.selectedIndex
                  ].text
                }
              ></input>
              <button className="btnRound" onClick={handleAddUpdateTournament}>
                {editTournament === 1 && <img src={add_icon} alt="Add" />}
                {editTournament === 2 && <img src={edit_icon} alt="Edit" />}
              </button>
              <button className="btnRound" onClick={() => setEditTournament(0)}>
                <img src={close_icon} alt="Cancel" />
              </button>
            </>
          ) : (
            <>
              <button
                className="btnRound"
                onClick={handleTournamentEditBtnToggle}
              >
                {!!currentTournamentLocked ? (
                  <img src={unlock_icon} alt="unlock" />
                ) : (
                  <img src={lock_icon} alt="lock" />
                )}
              </button>
              <button className="btnRound" onClick={() => setEditTournament(2)}>
                <img src={edit_icon} alt="Edit" />
              </button>
              <button className="btnRound" onClick={() => setEditTournament(1)}>
                <img src={add_icon} alt="Add" />
              </button>
            </>
          ))}
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
