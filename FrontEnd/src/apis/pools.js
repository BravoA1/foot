const API_POOLS = "/api/pools";

export async function fetchPoolsList(tournamentId) {
  try {
    const response = await fetch(
      `${API_POOLS}/fetchPoolsList/${tournamentId}`,
      {
        method: "GET",
        //headers: { "Content-Type": "application/json" },
        //body: JSON.stringify(tournamentId),
        //body: tournamentId
      }
    );
    if (response.ok) {
      return response.json();
    } else {
      window.alert(`Frontend error in fetchPoolsList: ${response.statusText}`);
      return null;
    }
  } catch (error) {
    window.alert(`Frontend error catched in fetchPoolsList: ${error}`);
    return null;
  }
}

export async function insertPool(pool) {
  try {
    const response = await fetch(`${API_POOLS}/insertPool`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(pool),
    });
    if (response.ok) {
      return response.json();
    } else {
      window.alert(`Frontend error in insertPool: ${response.statusText}`);
      return null;
    }
  } catch (error) {
    window.alert(`Frontend error catched in insertPool: ${error}`);
    return null;
  }
}

export async function updatePool(pool) {
  try {
    const response = await fetch(`${API_POOLS}/updatePool`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(pool),
    });
    if (response.ok) {
      return response.json();
    } else {
      window.alert(`Frontend error in updatePool: ${response.statusText}`);
      return null;
    }
  } catch (error) {
    window.alert(`Frontend error catched in updatePool: ${error}`);
    return null;
  }
}

export async function deletePool(pool) {
  try {
    const response = await fetch(`${API_POOLS}/deletePool`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(pool),
    });
    return response.json();
  } catch (error) {
    window.alert(`Frontend error catched in deletePool: ${error}`);
    return null;
  }
}
