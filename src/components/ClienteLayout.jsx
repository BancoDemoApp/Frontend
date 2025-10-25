import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

export default function ClienteLayout() {
    useEffect(() => {
        const base = import.meta.env.MODE === 'production' ? '/bancodemo' : '';
        
        // Crear enlace a estilos del cliente
        const customerLink = document.createElement('link');
        customerLink.rel = 'stylesheet';
        customerLink.href = `${base}/assets/styles/customerstyles.css`;
        customerLink.setAttribute('data-role-style', 'cliente');
        document.head.appendChild(customerLink);

        // Remover estilos de otros roles
        document.querySelector('[data-role-style="publico"]')?.remove();
        document.querySelector('[data-role-style="operador"]')?.remove();
    }, []);

    return <Outlet />;
}
