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
import betclose_icon from "../../assets/images/bet-closed.svg";
import {
  fetchPoolsList,
  insertPool,
  updatePool,
  deletePool,
} from "../../apis/pools";
import { fetchBetsList, insertBet, updateBet } from "../../apis/bets";
import {
  fetchTournamentsList,
  updateTournamentLocked,
  updateTournament,
  insertTournament,
} from "../../apis/tournaments";
import TournamentSelector from "../../components/TournamentSelector/TournamentSelector";
import { endTournament } from "../../helper/helper";

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
  const [currentTournamentClosed, setCurrentTournamentClosed] =
    useState(undefined);
  const [currentTournamentDateYear, setCurrentTournamentDateYear] =
    useState(undefined);
  const [mainEditBtnToggled, setMainEditBtnToggled] = useState(false);
  const [editTournament, setEditTournament] = useState(false);
  // const selectTournamentRef = useRef();
  const inputTournamentRef = useRef();
  const navigate = useNavigate();

  // fetch tournaments' list
  useEffect(() => {
    fetchTournamentsList()
      .then((fetchedTournamentsList) => {
        console.log("fetchedTournamentsList:", fetchedTournamentsList);
        if (fetchedTournamentsList) {
          setTournamentsList(fetchedTournamentsList);
          const last =
            fetchedTournamentsList[fetchedTournamentsList.length - 1];
          setCurrentTournamentId(last.id);
          setCurrentTournamentLocked(last.locked);
          setCurrentTournamentClosed(last.closed);
          setCurrentTournamentDateYear(last.dateYear);
        }
      })
      .catch((error) =>
        window.alert(`Error fetching tournaments list: ${error}`)
      );
  }, []);

  // set current tournaments' properties
  useEffect(() => {
    const currentTournament = tournamentsList.find(
      (tournament) => parseInt(tournament.id) === parseInt(currentTournamentId)
    );
    if (!currentTournament) return;
    setCurrentTournamentLocked(currentTournament.locked);
    setCurrentTournamentClosed(currentTournament.closed);
    setCurrentTournamentDateYear(currentTournament.dateYear);
  }, [currentTournamentId, tournamentsList]);

  // fetch pools' list depends on user and currentTournamentId
  useEffect(() => {
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
  }, [currentTournamentId, user]);

  // Add pool function
  async function handleInsertPool(pool) {
    pool.tournament_id = currentTournamentId;
    const insertedData = await insertPool(pool);
    //console.log("insertedData:", insertedData);
    if (insertedData) {
      setPoolsList([...poolsList, insertedData]);
      setMainEditBtnToggled(false);
    }
  }

  // Delete pool function
  async function handleDeletePool(pool) {
    pool.tournament_id = currentTournamentId;
    if (deletePool(pool)) {
      setPoolsList((previousPoolsList) =>
        previousPoolsList.filter((poolItem) => poolItem.id !== pool.id)
      );
    }
  }

  // Update pool function
  async function handleUpdatePool(pool) {
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

  // Add bet function
  async function handleInsertBet(bet) {
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

  // Update bet function
  async function handleUpdateBet(bet) {
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

  // Add & Update tournament function
  function handleInsertUpdateTournament() {
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

  /* Edit pool:
   * pool.onEdit=
   *             0: no edit
   *             1: super user edit
   *             2: normal user edit (bet)
   */
  function handleEditPool(pool) {
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

  // Enter/Exit super user edit mode funcion
  function handleHomepageEditBtn() {
    setMainEditBtnToggled(!mainEditBtnToggled);
    setEditTournament(false);
    setPoolsList((previousPoolsList) =>
      previousPoolsList.map((poolItem) => {
        poolItem.onEdit = 0;
        return poolItem;
      })
    );
  }

  // Toggle on/off locked tournament
  function handleHomepageLockBtn() {
    updateTournamentLocked(
      currentTournamentId,
      currentTournamentLocked ? 0 : 1
    ).then((response) => {
      // console.log("response:", response);
      if (response) {
        setCurrentTournamentLocked(!currentTournamentLocked);
      } else {
        window.alert("Tournament cannot be unlocked because it is closed");
      }
      setMainEditBtnToggled(false);
    });
  }

  return (
    <>
      {superuser && (
        <>
          <div
            //className={`${style.floating} ${style.btnRound}`}
            className={`${style.floatingTop} btnRound`}
            onClick={handleHomepageEditBtn}
          >
            {mainEditBtnToggled ? (
              <img src={close_icon} alt="Close" />
            ) : (
              <img src={edit_icon} alt="Edit" />
            )}
          </div>
          {!currentTournamentClosed && (
            <div
              className={`${style.floatingBottom} btnRound`}
              //onClick={() => window.alert("This button does nothing yet")}
              onClick={() => {
                endTournament(currentTournamentId);
                setCurrentTournamentClosed(1);
                setCurrentTournamentLocked(1);
              }}
            >
              <img src={betclose_icon} alt="Bet Closed" />
            </div>
          )}
        </>
      )}
      <div className={`d-flex align-items-center justify-content-center m10`}>
        <TournamentSelector
          tournamentId={currentTournamentId}
          setTournamentId={setCurrentTournamentId}
          tournamentLocked={currentTournamentLocked}
          tournamentsList={tournamentsList}
        />
        {superuser &&
          mainEditBtnToggled &&
          (editTournament ? (
            <>
              <input
                className="mr10"
                ref={inputTournamentRef}
                type="number"
                min={1900}
                defaultValue={editTournament === 2 && currentTournamentDateYear}
              ></input>
              <button
                className="btnRound"
                onClick={handleInsertUpdateTournament}
              >
                {editTournament === 1 && <img src={add_icon} alt="Add" />}
                {editTournament === 2 && <img src={edit_icon} alt="Edit" />}
              </button>
              <button className="btnRound" onClick={() => setEditTournament(0)}>
                <img src={close_icon} alt="Cancel" />
              </button>
            </>
          ) : (
            <>
              <button className="btnRound" onClick={handleHomepageLockBtn}>
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
                    handleDeletePool={handleDeletePool}
                    handleEditPool={handleEditPool}
                  />
                );
              case 1:
                return (
                  <PoolCardEdition
                    pool={e}
                    key={e.id}
                    mainEditBtnToggled={mainEditBtnToggled}
                    handleInsertPool={handleInsertPool}
                    handleUpdatePool={handleUpdatePool}
                    handleDeletePool={handleDeletePool}
                    handleEditPool={handleEditPool}
                  />
                );
              case 2:
                return (
                  <PoolCardBetting
                    pool={e}
                    key={e.id}
                    handleEditPool={handleEditPool}
                    handleInsertBet={handleInsertBet}
                    handleUpdateBet={handleUpdateBet}
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
            handleInsertPool={handleInsertPool}
            handleUpdatePool={handleUpdatePool}
            handleDeletePool={handleDeletePool}
          />
        )}
      </div>
    </>
  );
}

export default Homepage;
