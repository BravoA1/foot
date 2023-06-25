import { Tooltip } from "react-tooltip";
import lock_icon from "../../assets/images/lock.svg";

function TournamentSelector({
  tournamentId,
  setTournamentId,
  tournamentLocked,
  tournamentsList,
}) {
  function handleSelectChange(event) {
    setTournamentId(event.target.value);
  }

  return (
    <>
      <label className="mr10">Tournament:</label>
      <select
        value={tournamentId}
        onChange={handleSelectChange}
        className="mr10"
        data-tooltip-id="selectTournament"
        data-tooltip-content="Change current tournament"
      >
        {tournamentsList &&
          tournamentsList.map((tournament) => (
            <option key={tournament.id} value={tournament.id}>
              {tournament.dateYear}
            </option>
          ))}
      </select>
      <Tooltip id="selectTournament" />
      {!!tournamentLocked && (
        <>
          <img
            src={lock_icon}
            alt="lock"
            className="icon"
            data-tooltip-id="locked"
            data-tooltip-content="Betting is disabled"
          />
          <Tooltip id="locked" />
        </>
      )}
    </>
  );
}
export default TournamentSelector;
