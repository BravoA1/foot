import { useState, useEffect } from "react";
import { fetchTournamentsList } from "../../apis/tournaments";
//import lock_icon from "../../assets/images/lock.svg";
import TournamentSelector from "../../components/TournamentSelector/TournamentSelector";
import { fetchResultsList } from "../../apis/results";
import style from "./ResultPage.module.scss";

function ResultPage() {
  const [tournamentsList, setTournamentsList] = useState([]);
  const [resultsList, setResultsList] = useState([]);
  const [currentTournamentId, setCurrentTournamentId] = useState(undefined);
  const [currentTournamentLocked, setCurrentTournamentLocked] = useState(false);
  useEffect(() => {
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
  }, []);

  useEffect(() => {
    fetchResultsList(currentTournamentId)
      .then((fetchedResultsList) => {
        //console.log("fetchedResultsList:", fetchedResultsList);
        if (fetchedResultsList) {
          //
          console.log("fetchedResultsList:", fetchedResultsList);
          //setTournamentsList(fetchedResultsList);
          setResultsList(fetchedResultsList);
        }
      })
      .catch((error) => window.alert(`Error fetching results list: ${error}`));
  }, [currentTournamentId]);

  return (
    <>
      <div className={`d-flex align-items-center justify-content-center mt10`}>
        <TournamentSelector
          tournamentId={currentTournamentId}
          tournamentLocked={currentTournamentLocked}
          setTournamentId={setCurrentTournamentId}
          setTournamentLocked={setCurrentTournamentLocked}
          tournamentsList={tournamentsList}
        />
      </div>
      {resultsList && (
        <table className={`${style.resultTable}`}>
          <thead>
            <tr>
              <th>Username</th>
              <th>Result</th>
            </tr>
          </thead>
          <tbody>
            {resultsList.map((result) => {
              return (
                <tr key={result.username}>
                  <td>{result.username}</td>
                  <td>{result.resultTournament}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </>
  );
}
export default ResultPage;
