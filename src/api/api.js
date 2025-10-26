import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/';

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.clear();
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

// Endpoints
export const registrarUsuario = (data) => api.post('users/create/', data);
export const login = (data) => api.post('users/login/', data);
export const logout = () => api.post('logout/');
export const obtenerPerfilCliente = () => api.get('mi-perfil/');
export const actualizarPerfilCliente = (data) => api.put('mi-perfil/', data);
export const cambiarContrasena = (data) => api.put('usuarios/cambiar-contrasena/', data);
export const crearCuenta = (data) => api.post('cuentas/crear/', data);
export const obtenerMisCuentas = () => api.get('cuentas/mis-cuentas/');
export const buscarCuenta = (numero) => api.get(`cuentas/buscar/?numero=${numero}`);
export const crearTransaccion = (data) => api.post('transacciones/crear/', data);
export const transferir = (data) => api.post('transacciones/transferir/', data);
export const listarTransacciones = () => api.get('transacciones/');
export const cancelarTransaccion = (id) => api.put(`transacciones/cancelar/${id}/`);
export const reporteTransacciones = (params = {}) => api.get('transacciones/reporte/', { params });
export const buscarCliente = (query) => api.get(`clientes/buscar/?q=${query}`);
export const obtenerLogs = () => api.get('logs/');

export default api;
