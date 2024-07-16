import instance from "../http-client";

export const getScans = async (year: string, providers:any[]) => {
  try {
    const params = {
      year,
      providers
    };
    const response = await instance.get(`/api/scans`, { params });
    return response?.data;
  } catch (error) {
    console.error("Error fetching team data", error);
    throw error;
  }
};

export const getProviders = async () => {
    try {
      const response = await instance.get(`/api/providers`);
      return response?.data;
    } catch (error) {
      console.error("Error fetching team data", error);
      throw error;
    }
  };
