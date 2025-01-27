import axiousInstance from "./axiousInstance";

// Register user
export const registerUserApi = async (userData) => {
  const response = await axiousInstance.post("/auth/register", userData);
  return response.data;
};

// Login user
export const loginUserApi = async (credentials) => {
  console.log("fetching login");
  const response = await axiousInstance.post("/auth/login", credentials);
  return response.data;
};
