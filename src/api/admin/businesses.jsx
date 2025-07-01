import { requestsPrivate } from "../../utils/requests";

export const getAdminBusinessesApi = (data) => {
  return requestsPrivate.get('dashboard/business-manage', { params: data });
};