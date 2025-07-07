// src/components/NavbarWrapper.jsx
import NavbarCliente from './NavbarCliente';
import NavbarOperador from './NavbarOperador';

export default function NavbarWrapper() {
    const tipo = localStorage.getItem('tipo');

    if (tipo === 'Cliente') {
        return <NavbarCliente />;
    } else if (tipo === 'Operador') {
        return <NavbarOperador />;
    } else {
        return null; // O podrías redirigir al login si no hay tipo definido
    }
}
