import { requestsPrivate } from "../../utils/requests";

export const getAdminEventsApi = (params) => {
  return requestsPrivate.get('dashboard/event-manage', { params });
};