import requests, { requestsPrivate } from '../utils/requests';

export const loginApi = (data) => {
  return requests.post('authen/login', data);
};

export const registerApi = (data) => {
  return requests.post('authen/register', data);
};

export const refreshTokenApi = (data) => {
  return requests.post('authen/refresh-token', data);
};

export const getGoogleLoginUrlApi = (returnUrl) => {
  return requests.get('authen/google-login-url', { params: { returnUrl } });
}; 