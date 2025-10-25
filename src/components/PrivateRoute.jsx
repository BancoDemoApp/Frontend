import { Navigate } from 'react-router-dom';

export default function PrivateRoute({ children, tipoPermitido }) {
    const access = localStorage.getItem('access');
    const tipo = localStorage.getItem('tipo');

    // Base dinámico según entorno
    const base = import.meta.env.MODE === 'production' ? '/bancodemo' : '';

    if (!access) {
        return <Navigate to={`${base}/login`} replace />;
    }

    // Soporta un string o un array como tipoPermitido
    const esPermitido = Array.isArray(tipoPermitido)
        ? tipoPermitido.includes(tipo)
        : tipo === tipoPermitido;

    if (!esPermitido) {
        return <Navigate to={`${base}/login`} replace />;
    }

    return children;
}
