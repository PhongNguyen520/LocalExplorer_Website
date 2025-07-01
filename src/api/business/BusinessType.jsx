import { requestsPrivate } from "../../utils/requests";

export const getBusinessType = () => {
    return requestsPrivate.get('service-type/get-all');
};