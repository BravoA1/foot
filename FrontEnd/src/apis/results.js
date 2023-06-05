const API_RESULTS = "/api/results";

export async function fetchResultsList() {
  try {
    const response = await fetch(`${API_RESULTS}/fetchResultsList`);
    return response.ok ? response.json() : null;
  } catch (error) {
    window.alert(`Frontend error catched in fetchResultsList: ${error}`);
    return null;
  }
}

export async function insertResults(result) {
  try {
    const response = await fetch(`${API_RESULTS}/insertResult`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(result),
    });
    return response.ok ? response.json() : null;
  } catch (error) {
    window.alert(`Frontend error catched in insertResult: ${error}`);
    return null;
  }
}
