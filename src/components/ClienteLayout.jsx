// ClienteLayout.jsx
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

export default function ClienteLayout() {
    useEffect(() => {
        // Crear enlace a estilos del cliente
        const customerLink = document.createElement('link');
        customerLink.rel = 'stylesheet';
        customerLink.href = '/assets/styles/customerstyles.css';
        customerLink.setAttribute('data-role-style', 'cliente');
        document.head.appendChild(customerLink);

        // Buscar y remover general.css y operatorstyles.css
        document.querySelector('[data-role-style="public"]')?.remove();
        document.querySelector('[data-role-style="operador"]')?.remove();
    }, []);

    return <Outlet />;
}
