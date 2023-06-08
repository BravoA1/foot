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
      >
        {tournamentsList &&
          tournamentsList.map((tournament) => (
            <option key={tournament.id} value={tournament.id}>
              {tournament.dateYear}
            </option>
          ))}
      </select>
      {!!tournamentLocked && (
        <img src={lock_icon} alt="lock" className="icon" />
      )}
    </>
  );
}
export default TournamentSelector;
