const API_AUTH = "/api/auth";

export async function signin(credentials) {
  try {
    const response = await fetch(API_AUTH, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });
    if (response.ok) {
      return response.json();
    } else {
      //window.alert(`Frontend error in signin: ${response.statusText}`);
      return null;
    }
  } catch (error) {
    window.alert(`Frontend error catched in signin: ${error}`);
    return null;
  }
}

export async function fetchCurrentUser() {
  try {
    const response = await fetch(`${API_AUTH}/fetchCurrentUser`);
    if (response.ok) {
      return response.json();
    } else {
      window.alert(
        `Frontend error in fetchCurrentUser: ${response.statusText}`
      );
      return null;
    }
  } catch (error) {
    window.alert(`Frontend error catched in fetchCurrentUser: ${error}`);
    return null;
  }
}

export async function signout() {
  try {
    await fetch(API_AUTH, {
      method: "DELETE",
    });
  } catch (error) {
    window.alert(`Frontend error catched in signout: ${error}`);
    return null;
  }
}
