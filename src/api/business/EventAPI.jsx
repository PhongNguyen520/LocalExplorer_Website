import { requestsPrivate } from "../../utils/requests";

// Tạo event mới cho business
export const createEventApi = (data) => {
  // data: { name, description, startDate, endDate, image (File), businessId }
  const formData = new FormData();
  formData.append('Name', data.name);
  formData.append('Description', data.description);
  formData.append('StartDate', data.startDate);
  formData.append('EndDate', data.endDate);
  formData.append('BusinessId', data.businessId);
  if (data.image) formData.append('Image', data.image);
  return requestsPrivate.post('event/create', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
};

// Cập nhật event
export const updateEventApi = (data) => {
  // data: { id, name, description, startDate, endDate, status, image (File) }
  
  const formData = new FormData();
  formData.append('Id', data.id);
  formData.append('Name', data.name);
  formData.append('Description', data.description);
  formData.append('StartDate', data.startDate);
  formData.append('EndDate', data.endDate);
  formData.append('Status', data.status);
  if (data.image) formData.append('Image', data.image);
  return requestsPrivate.put('event/update', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
};

// Xóa event
export const deleteEventApi = (id) => {
  return requestsPrivate.delete(`event/${id}`);
}; 