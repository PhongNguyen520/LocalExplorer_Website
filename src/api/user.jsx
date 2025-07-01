import { requestsPrivate } from '../utils/requests';

export const getProfileApi = () => {
  return requestsPrivate.get('user/profile');
};

export const updateProfileApi = (formData) => {
  return requestsPrivate.put('user/update', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const changePasswordApi = (data) => {
  return requestsPrivate.post('authen/change-password', data);
}; 