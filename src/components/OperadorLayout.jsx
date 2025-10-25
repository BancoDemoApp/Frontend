import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

export default function OperadorLayout() {
    useEffect(() => {
        const base = import.meta.env.MODE === 'production' ? '/bancodemo' : '';
        
        // Crear enlace a estilos del operador
        const operadorLink = document.createElement('link');
        operadorLink.rel = 'stylesheet';
        operadorLink.href = `${base}/assets/styles/operadorstyles.css`;
        operadorLink.setAttribute('data-role-style', 'operador');
        document.head.appendChild(operadorLink);

        // Remover estilos de otros roles
        document.querySelector('[data-role-style="publico"]')?.remove();
        document.querySelector('[data-role-style="cliente"]')?.remove();
    }, []);

    return <Outlet />;
}
