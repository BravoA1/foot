const API_TOURNAMENTS = "/api/tournaments";

export async function fetchTournamentsList() {
  try {
    const response = await fetch(`${API_TOURNAMENTS}/fetchTournamentsList`);
    return response.ok ? response.json() : null;
  } catch (error) {
    window.alert(`Frontend error catched in fetchTournamentsList: ${error}`);
    return null;
  }
}

export async function tournamentIsLocked(tournamentId) {
  try {
    const response = await fetch(
      `${API_TOURNAMENTS}/tournamentLocked/${tournamentId}`
    );
    return response.ok ? response.json() : null;
  } catch (error) {
    window.alert(`Frontend error catched in fetchTournamentsList: ${error}`);
    return null;
  }
}

export async function updateTournamentLocked(tournamentId, tournamentLocked) {
  try {
    const isClosed = await fetch(
      `${API_TOURNAMENTS}/tournamentClosed/${tournamentId}`
    );
    const isClosedAwait = await isClosed.json();
    console.log("isClosedAwait:", isClosedAwait);
    console.log("isClosedAwait.closed:", isClosedAwait.closed);
    if (!isClosed.ok || isClosedAwait.closed) return null;
    const response = await fetch(
      `${API_TOURNAMENTS}/updateTournamentLocked/${tournamentId}-${tournamentLocked}`,
      {
        method: "PUT",
      }
    );
    return response.ok ? response.json() : null;
  } catch (error) {
    window.alert(`Frontend error catched in fetchTournamentsList: ${error}`);
    return null;
  }
}

export async function insertTournament(tournament) {
  try {
    const response = await fetch(`${API_TOURNAMENTS}/insertTournament`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(tournament),
    });
    return response.ok ? response.json() : null;
  } catch (error) {
    window.alert(`Frontend error catched in insertTournament: ${error}`);
    return null;
  }
}

export async function updateTournament(tournament) {
  try {
    const response = await fetch(`${API_TOURNAMENTS}/updateTournament`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(tournament),
    });
    return response.ok ? response.json() : null;
  } catch (error) {
    window.alert(`Frontend error catched in updateTournament: ${error}`);
    return null;
  }
}

export async function tournamentIsClosed(tournamentId) {
  try {
    const response = await fetch(
      `${API_TOURNAMENTS}/tournamentClosed/${tournamentId}`
    );
    return response.ok ? response.json() : null;
  } catch (error) {
    window.alert(`Frontend error catched in tournamentIsClosed: ${error}`);
    return null;
  }
}

export async function setTournamentClosed(tournamentId) {
  try {
    const response = await fetch(
      `${API_TOURNAMENTS}/setTournamentClosed/${tournamentId}`,
      {
        method: "PUT",
      }
    );
    return response.ok;
  } catch (error) {
    window.alert(`Frontend error catched in setTournamentClosed: ${error}`);
    return null;
  }
}
