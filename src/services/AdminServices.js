import requests from './httpService';

const AdminServices = {
  loginAdmin(body) {
    return requests.post(`/admin/login`, body);
  },
  addStaff(body) {
    return requests.post('/admin/add', body);
  },
  addToCartSettings(body) {
    return requests.post('/admin/addToCart', body);
  },
  getAddToCartSettings() {
    return requests.get('/admin/getAddToCartSettings');
  },
  getAllStaff(body) {
    return requests.post('/admin', body);
  },
  getStaffById(id, body) {
    return requests.post(`/admin/${id}`, body);
  },

  updateStaff(id, body) {
    return requests.put(`/admin/${id}`, body);
  },
  deleteStaff(id) {
    return requests.delete(`/admin/${id}`);
  },
};

export default AdminServices;
