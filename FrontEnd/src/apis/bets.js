const API_BETS = "/api/bets";

export async function fetchBetsList(userId) {
  try {
    const response = await fetch(`${API_BETS}/fetchBetsList/${userId}`, {
      method: "GET",
      // headers: { "Content-Type": "application/json", },
      // body: JSON.stringify(user),
    });
    return response.ok ? response.json() : null;
  } catch (error) {
    window.alert(`Frontend error catched in fetchTeamsList: ${error}`);
    return null;
  }
}

export async function insertBet(bet) {
  try {
    const response = await fetch(`${API_BETS}/insertBet`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bet),
    });

    return response.ok ? response.json() : null;
  } catch (error) {
    window.alert(`Frontend error catched in insertBet: ${error}`);
    return null;
  }
}

export async function updateBet(bet) {
  try {
    const response = await fetch(`${API_BETS}/updateBet`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bet),
    });
    return response.ok ? response.json() : null;
  } catch (error) {
    window.alert(`Frontend error catched in updateBet: ${error}`);
    return null;
  }
}
