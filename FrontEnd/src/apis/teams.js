const API_POOLS = "/api/teams";

export async function fetchTeamsList() {
  try {
    const response = await fetch(`${API_POOLS}/fetchTeamsList`);
    if (response.ok) {
      return response.json();
    } else {
      window.alert(`Frontend error in fetchTeamsList: ${response.statusText}`);
      return null;
    }
  } catch (error) {
    window.alert(`Frontend error catched in fetchTeamsList: ${error}`);
    return null;
  }
}
