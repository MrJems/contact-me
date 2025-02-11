import axiousInstance from "./axiousInstance";

export const fetchUserData = async () => {
  const response = await axiousInstance.get("/users");
  return response.data;
};

export const fetchUserDataByUsername = async (username) => {
  const response = await axiousInstance.get(`/users/${username}`);
  return response.data;
};
