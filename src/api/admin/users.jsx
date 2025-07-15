import { requestsPrivate } from "../../utils/requests";

export const getAdminUsersApi = (data) => {
  return requestsPrivate.get('dashboard/user-manage', { params: data });
};

export const banUserApi = (userId) => {
  return requestsPrivate.patch(`user/${userId}/ban`);
};