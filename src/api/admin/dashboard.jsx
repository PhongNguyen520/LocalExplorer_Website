import { requestsPrivate } from "../../utils/requests";

export const getAdminOverViewApi = () => {
  return requestsPrivate.get('dashboard/admin-overview');
};