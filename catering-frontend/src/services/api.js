import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api',
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const login = (credentials) =>
  api.post('/auth/login', credentials).then((response) => {
    localStorage.setItem('token', response.data.token);
    return response;
  });

export const adminLogin = (credentials) => api.post('/api/auth/admin/login', credentials).then(res => res.data); 
export const register = (user) => api.post('/auth/register', user);
export const getCurrentUser = () => api.get('/auth/me');
export const getMenus = () => api.get('/menus');
export const placeOrder = (orderItems) => api.post('/orders', orderItems);
export const getOrders = () => api.get('/orders');
export const createMenuItem = (menuItem) => api.post('/menu', menuItem);