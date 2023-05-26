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

export async function insertPool(pool) {
  const response = await fetch(`${API_POOLS}/insertPool`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(pool),
  });
  const backResponse = await response.json();
  if (response.ok) return backResponse;
  throw backResponse ? backResponse : new Error("Error insertPool");
}

export async function updatePool(pool) {
  const response = await fetch(`${API_POOLS}/updatePool`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(pool),
  });
  const backResponse = await response.json();
  if (response.ok) return backResponse;
  throw backResponse ? backResponse : new Error("Error updatePool");
}
