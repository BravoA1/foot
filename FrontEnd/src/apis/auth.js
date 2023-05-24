const API_AUTH = "/api/auth";

export async function signin(credentials) {
  const response = await fetch(API_AUTH, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  const backResponse = await response.json();
  if (response.ok) {
    return backResponse;
  } else {
    if (backResponse) {
      throw backResponse;
    } else {
      throw new Error("Error signin");
    }
  }
}

export async function getCurrentUser() {
  const response = await fetch(`${API_AUTH}/getCurrentUser`);
  console.log(response);
  return response.ok ? response.json() : false;
}

export async function signout() {
  await fetch(API_AUTH, {
    method: "DELETE",
  });
}
