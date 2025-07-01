import { requestsPrivate } from "../../utils/requests";

export const BusinessOverviewAPI = {
  getBusinessOverview: async () => {
    try {
      const response = await requestsPrivate.get("/dashboard/business-overview");
      return response.data;
    } catch (error) {
      console.error("Error fetching business overview:", error);
      throw error;
    }
  },
}; 