import { useState, useEffect, useRef } from "react";
import { fetchTournamentsList } from "../../apis/tournaments";
import lock_icon from "../../assets/images/lock.svg";

function ResultPage() {
  const [tournamentsList, setTournamentsList] = useState([]);
  const [currentTournamentLocked, setCurrentTournamentLocked] = useState(false);
  const [currentTournamentId, setCurrentTournamentId] = useState(undefined);
  const selectTournamentRef = useRef();

  useEffect(() => {
    (() => {
      fetchTournamentsList()
        .then((fetchedTournamentsList) => {
          //console.log("fetchedTournamentsList:", fetchedTournamentsList);
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

  function handleSelectChange() {
    return;
  }

  return (
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
      {!!currentTournamentLocked && (
        <img src={lock_icon} alt="lock" className="icon" />
      )}
    </div>
  );
}
export default ResultPage;
