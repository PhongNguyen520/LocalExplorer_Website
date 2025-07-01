import { requestsPrivate } from "../../utils/requests";

export const getAdminNotificationsApi = (params) => {
  return requestsPrivate.get('notification/get-list', { params });
}; 