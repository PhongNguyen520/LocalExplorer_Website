import { requestsPrivate } from "../../utils/requests";

export const payOSApi = (pricingPlanId, businessId) => {
  // Gọi API với pricingPlanId và businessId truyền vào
  return requestsPrivate.post(`PayOS/create-link/${pricingPlanId}?businessId=${businessId}`);
}