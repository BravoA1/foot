import { fetchCurrentUser } from "../apis/auth";

export async function userLoader() {
  return fetchCurrentUser();
}
