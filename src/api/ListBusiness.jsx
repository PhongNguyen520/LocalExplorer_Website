import { requestsPrivate } from "../utils/requests";

export const getListBusinessApi = async (index = 1, pageSize = 10) => {
  try {
    const response = await requestsPrivate.get(`/business/business-get-list-profile?index=${index}&pageSize=${pageSize}`);
    return response;
  } catch (error) {
    console.error("Error fetching business list:", error);
    throw error;
  }

};
export const getBusinessDetailApi = (data) => {
  return requestsPrivate.get('business/' + data);
};

export const createBusinessApi = (data) => {
  return requestsPrivate.post('business/create-business', data);
}