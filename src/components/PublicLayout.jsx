import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

export default function PublicLayout() {
    useEffect(() => {
        const base = import.meta.env.MODE === 'production' ? '/bancodemo' : '';
        
        // Cargar estilos públicos dinámicamente
        const generalLink = document.createElement('link');
        generalLink.rel = 'stylesheet';
        generalLink.href = `${base}/assets/styles/general.css`;
        generalLink.setAttribute('data-role-style', 'publico');
        document.head.appendChild(generalLink);

        // Eliminar estilos de otros roles
        const cliente = document.querySelector('link[href*="customerstyles.css"]');
        const operador = document.querySelector('link[href*="operadorstyles.css"]');

        if (cliente) cliente.remove();
        if (operador) operador.remove();

        return () => {
            generalLink.remove();
        };
    }, []);

    return <Outlet />;
}
