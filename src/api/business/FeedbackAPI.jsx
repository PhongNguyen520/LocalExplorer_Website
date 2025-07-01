import { requestsPrivate } from "../../utils/requests";

export const FeedbackAPI = {
  // Get feedback list by business ID
  getFeedbackListByBusinessId: async (businessId) => {
    try {
      const response = await requestsPrivate.get(`/feedback/get-list?id=${businessId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching feedback list:", error);
      throw error;
    }
  },
}; 