import axiousInstance from "./axiousInstance";

export const fetchHomeData = async () => {
  const response = await axiousInstance.get("/");
  return response.data;
};
