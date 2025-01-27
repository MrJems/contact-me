import axiousInstance from "./axiousInstance";

export const fetchUserData = async () => {
  console.log("fetching users");
  const response = await axiousInstance.get("/users");
  return response.data;
};

export const fetchUserDataByUsername = async (username) => {
  console.log("fetching users");
  const response = await axiousInstance.get(`/users/${username}`);
  return response.data;
};
