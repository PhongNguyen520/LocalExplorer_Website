import { requestsPrivate } from "../../utils/requests";

export const createBusinessServiceApi = (data) => {
  
  // data: { name, description, price, discount, availability, duration, inclusions, exclustions, condition, businessId }
  return requestsPrivate.post('business-service/create', data);
};

export const updateBusinessServiceApi = (data) => {
  
  // data: { id, name, description, price, discount, availability, duration, inclusions, exclustions, condition, status }
  return requestsPrivate.put('business-service/update', data);
};

export const deleteBusinessServiceApi = (id) => {
  return requestsPrivate.delete(`business-service/${id}`);
}; 