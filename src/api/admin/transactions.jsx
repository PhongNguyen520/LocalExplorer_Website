import { requestsPrivate } from "../../utils/requests";

export const getAdminTransactionsApi = (params) => {
  return requestsPrivate.get('dashboard/transaction-manage', { params });
}; 