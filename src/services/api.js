import axios from 'axios';

const api = axios.create({
  baseURL: 'https://file-import-backend.onrender.com',
});

export default api;
