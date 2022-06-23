import requests from './httpService';

const DiscountServices = {
  addDiscount(body) {
    return requests.post('/discount/create', body);
  },

  getAllDiscounts() {
    return requests.get('/discount');
  },
  getDiscountById(id) {
    return requests.get(`/discount/${id}`);
  },
  updateDiscount(id, body) {
    return requests.put(`/discount/${id}`, body);
  },
  deleteDiscount(id) {
    return requests.delete(`/discount/${id}`);
  },
};

export default DiscountServices;
