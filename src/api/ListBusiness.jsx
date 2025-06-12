import { requestsPrivate } from "../utils/requests";


export const getListBusinessApi = (data) => {
  return requestsPrivate.get('business/business-get-list-profile', data);
};
export const getBusinessDetailApi = (data) => {
  return requestsPrivate.get('business/' + data);
};

export const createBusinessApi = (data) => {
  return requestsPrivate.post('business/create-business', data);
}