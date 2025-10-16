import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/';

// Crear instancia de Axios
const api = axios.create({
    baseURL: BASE_URL,
});

// Interceptor para agregar token automáticamente si existe
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('access'); // Guarda token al iniciar sesión
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Interceptor global de respuestas: redirige en caso de token inválido
api.interceptors.response.use(
    response => response,
    error => {
        if (error.response && error.response.status === 401) {
            // Limpiar localStorage y redirigir al Landing Page
            localStorage.removeItem('access');
            localStorage.removeItem('refresh');
            localStorage.removeItem('tipo');
            localStorage.removeItem('nombre');
            localStorage.removeItem('usuario_id');

            window.location.href = '/'; // 🔁 Redirección
        }

        return Promise.reject(error);
    }
);

// --- Endpoints de autenticación y usuarios ---

export const registrarUsuario = (data) => api.post('users/create/', data);

export const login = (data) => api.post('users/login/', data);

export const logout = () => api.post('logout/');

export const obtenerPerfilCliente = () => api.get('mi-perfil/');

export const actualizarPerfilCliente = (data) => api.put('mi-perfil/', data);

export const cambiarContrasena = (data) =>
    api.put('usuarios/cambiar-contrasena/', data);

// --- Endpoints para cuentas ---

export const crearCuenta = (data) => api.post('cuentas/crear/', data);

export const obtenerMisCuentas = () => api.get('cuentas/mis-cuentas/');

export const buscarCuenta = (numero) =>
    api.get(`cuentas/buscar/?numero=${numero}`);

// --- Endpoints para transacciones ---

export const crearTransaccion = (data) => api.post('transacciones/crear/', data);

export const transferir = (data) => api.post('transacciones/transferir/', data);

export const listarTransacciones = () => api.get('transacciones/');

export const cancelarTransaccion = (id) =>
    api.put(`transacciones/cancelar/${id}/`);

export const reporteTransacciones = (params = {}) =>
    api.get('transacciones/reporte/', { params });

// --- Endpoints para operadores ---

export const buscarCliente = (query) =>
    api.get(`clientes/buscar/?q=${query}`);

export const obtenerLogs = () => api.get('logs/');

export default api;
