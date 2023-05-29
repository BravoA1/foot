const API_USERS = "/api/users";

export async function createUser(newUser) {
  try {
    const response = await fetch(API_USERS, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    });
    if (response.ok) {
      return response.json();
    } else {
      window.alert(`Frontend error in createUser: ${response.statusText}`);
      return null;
    }
  } catch (error) {
    window.alert(`Frontend error catched in createUser: ${error}`);
    return null;
  }
}
