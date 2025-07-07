import { Navigate } from 'react-router-dom';

export default function PrivateRoute({ children, tipoPermitido }) {
    const access = localStorage.getItem('access');
    const tipo = localStorage.getItem('tipo');

    if (!access) {
        return <Navigate to="/login" replace />;
    }

    // Soporta un string o un array como tipoPermitido
    const esPermitido = Array.isArray(tipoPermitido)
        ? tipoPermitido.includes(tipo)
        : tipo === tipoPermitido;

    if (!esPermitido) {
        return <Navigate to="/login" replace />;
    }

    return children;
}
