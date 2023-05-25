const API_POOLS = "/api/teams";

export async function fetchTeamsList() {
  try {
    const response = await fetch(`${API_POOLS}/fetchTeamsList`);
    const backResponse = await response.json();
    return backResponse;
  } catch (error) {
    throw error;
  }
}
