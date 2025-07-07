// ClienteLayout.jsx
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

export default function OperadorLayout() {
    useEffect(() => {
        // Crear enlace a estilos del cliente
        const operadorLink = document.createElement('link');
        operadorLink.rel = 'stylesheet';
        operadorLink.href = '/assets/styles/operadorstyles.css';
        operadorLink.setAttribute('data-role-style', 'operador');
        document.head.appendChild(operadorLink);

        // Buscar y remover general.css y operatorstyles.css
        document.querySelector('[data-role-style="public"]')?.remove();
        document.querySelector('[data-role-style="cliente"]')?.remove();
    }, []);

    return <Outlet />;
}
