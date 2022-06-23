import requests from "./httpService";

const UserServices = {
  getAllUsers(body) {
    return requests.get(`/user`, body);
  },
  getUserById(id) {
    return requests.get(`/user/${id}`);
  },
  deleteUser(id) {
    return requests.delete(`/user/${id}`);
  },
  updateUser(id, body) {
    return requests.put(`/user/${id}`, body);
  },
  registerUser(body) {
    return requests.post("/register", body);
  },
};

export default UserServices;
