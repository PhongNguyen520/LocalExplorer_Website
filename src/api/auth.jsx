import requests, { requestsPrivate } from '../utils/requests';

export const loginApi = (data) => {
  return requests.post('authen/login', data);
};

export const registerApi = (data) => {
  return requests.post('authen/register', data);
}; 