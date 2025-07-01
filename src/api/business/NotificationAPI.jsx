import { requestsPrivate } from "../../utils/requests";

export const getListNotificationApi = () => {
  return requestsPrivate.get('notification/get-list');
}