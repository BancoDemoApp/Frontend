// PublicLayout.jsx
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

export default function PublicLayout() {
    useEffect(() => {
        // Cargar estilos públicos dinámicamente
        const generalLink = document.createElement('link');
        generalLink.rel = 'stylesheet';
        generalLink.href = '/assets/styles/general.css';
        generalLink.setAttribute('data-role-style', 'publico');
        document.head.appendChild(generalLink);

        // Eliminar estilos del cliente y operador
        const cliente = document.querySelector('link[href*="customerstyles.css"]');
        const operador = document.querySelector('link[href*="operatorstyles.css"]');

        if (cliente) cliente.remove();
        if (operador) operador.remove();

        return () => {
            generalLink.remove();
        };
    }, []);

    return <Outlet />;
}
