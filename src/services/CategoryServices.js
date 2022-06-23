import requests from './httpService';

const CategoryServices = {
  getAllCategory() {
    return requests.get('/category');
  },

  getCategoryById(id) {
    return requests.get(`/category/${id}`);
  },

  addCategory(body) {
    return requests.post('/category/add', body);
  },

  updateCategory(id, body) {
    return requests.put(`/category/${id}`, body);
  },

  updateStatus(id, body) {
    return requests.put(`/category/status/${id}`, body);
  },

  deleteCategory(id, body) {
    return requests.patch(`/category/${id}`, body);
  },

  getAllUnits() {
    return [{ _id: 1, value: "kg" }, { _id: 2, value: "pc" }, { _id: 3, value: "lb" }, { _id: 4, value: "ml" }, { _id: 5, value: "g" }]
  }
};

export default CategoryServices;
