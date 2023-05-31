const API_TOURNAMENTS = "/api/tournaments";

export async function fetchTournamentsList() {
  try {
    const response = await fetch(`${API_TOURNAMENTS}/fetchTournamentsList`);
    if (response.ok) {
      return response.json();
    } else {
      //window.alert(`Frontend error in fetchTournamentsList: ${response.statusText}`);
      return null;
    }
  } catch (error) {
    window.alert(`Frontend error catched in fetchTournamentsList: ${error}`);
    return null;
  }
}
