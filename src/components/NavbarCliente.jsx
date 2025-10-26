import { useState } from 'react';
import { Link } from 'react-router-dom';
import { logout } from '../api/api';

export default function NavbarCliente() {
    const [showMenu, setShowMenu] = useState(false);
    const nombre = localStorage.getItem('nombre') || 'Cliente';

    // Base para rutas según entorno
    const base = import.meta.env.MODE === 'production' ? '/bancodemo' : '';

    const handleLogout = async () => {
        try {
            await logout();
        } catch (error) {
            console.error('Error cerrando sesión:', error);
        } finally {
            localStorage.clear();
            window.location.href = import.meta.env.MODE === 'production'
            ? '/bancodemo/'
            : '/';
        }
    };

    return (
        <header>
            <h1 className="logo">
                <Link to={`${base}/dashboard`}>BancoDemoApp</Link>
            </h1>
            <nav>
                <Link to={`${base}/dashboard`} className="element">Dashboard</Link>
                <Link to={`${base}/transferencia`} className="element">Transferir</Link>
                <Link to={`${base}/historial`} className="element">Historial</Link>

                <div
                    className="user-menu element"
                    onMouseEnter={() => setShowMenu(true)}
                    onMouseLeave={() => setShowMenu(false)}
                >
                    <button className="user-name">{nombre}</button>
                    {showMenu && (
                        <div className="dropdown-menu">
                            <Link to={`${base}/perfil`}>Perfil</Link>
                            <button onClick={handleLogout}>Cerrar Sesión</button>
                        </div>
                    )}
                </div>
            </nav>
        </header>
    );
}
