import { requestsPrivate } from '../../utils/requests';

export const updateBusinessProfileApi = (businessId, data) => {
  return requestsPrivate.put(`business/${businessId}/profile`, data);
};

export const updateBusinessLogoApi = (businessId, file) => {
  const formData = new FormData();
  formData.append('logo', file);
  return requestsPrivate.put(`business/${businessId}/logo`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

export const updateBusinessBackgroundApi = (businessId, file) => {
  const formData = new FormData();
  formData.append('background', file);
  return requestsPrivate.put(`business/${businessId}/background`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

export const addBusinessImagesApi = (businessId, files) => {
  const formData = new FormData();
  for (let i = 0; i < files.length; i++) {
    formData.append('imgList', files[i]);
  }
  return requestsPrivate.post(`business/${businessId}/images`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

export const deleteBusinessImagesApi = (businessId, imageIds) => {
  return requestsPrivate.delete(`business/${businessId}/images`, { data: imageIds });
};

export const uploadBusinessImagesApi = (businessId, files) => {
  const formData = new FormData();
  formData.append('BusinessId', businessId);
  if (files && files.length > 0) {
    for (let i = 0; i < files.length; i++) {
      formData.append('BusinessImages', files[i]);
    }
  }
  // Logo and Background are left null (not appended)
  return requestsPrivate.post('business/upload-images', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
}; 