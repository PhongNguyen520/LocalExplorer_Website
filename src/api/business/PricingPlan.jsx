import { requestsPrivate } from "../../utils/requests";

export const getPricingPlanApi = () => {
  return requestsPrivate.get('pricing-plan/get-list-by-role');
}