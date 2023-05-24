const API_POOLS = "/api/pools";

export async function getPoolsList() {
  const response = await fetch(API_POOLS);
  const backResponse = await response.json();
  if (response.ok) {
    return backResponse;
  } else {
    if (backResponse) {
      throw backResponse;
    } else {
      throw new Error("Error getPoolsList");
    }
  }
}
