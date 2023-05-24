const API_POOLS = "/api/pools";

export async function fetchPoolsList() {
  try {
    const response = await fetch(`${API_POOLS}/fetchPoolsList`);
    const backResponse = await response.json();
    return backResponse;
  } catch (error) {
    throw error;
  }
}
