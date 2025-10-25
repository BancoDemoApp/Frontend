import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../api/api';

export default function NavbarOperador() {
    const navigate = useNavigate();
    const [showMenu, setShowMenu] = useState(false);
    const nombre = localStorage.getItem('nombre') || 'Operador';

    // Base para rutas según entorno
    const base = import.meta.env.MODE === 'production' ? '/bancodemo' : '';

    const cerrarSesion = async () => {
        try {
            await logout();
        } catch (error) {
            console.error('Error cerrando sesión:', error);
        } finally {
            localStorage.clear();
            navigate(`${base}/login`);
        }
    };

    return (
        <header className="navbar">
            <div className="logo">
                <Link to={`${base}/operador`}>BancoDemoApp</Link>
            </div>
            <nav>
                <Link to={`${base}/operador`} className="element">Dashboard</Link>
                <Link to={`${base}/operador/depositar`} className="element">Depositar</Link>
                <Link to={`${base}/operador/retirar`} className="element">Retirar</Link>
                <Link to={`${base}/operador/logs`} className="element">Logs</Link>

                <div
                    className="user-menu element"
                    onMouseEnter={() => setShowMenu(true)}
                    onMouseLeave={() => setShowMenu(false)}
                >
                    <button className="user-name">{nombre}</button>
                    {showMenu && (
                        <div className="dropdown-menu">
                            <Link to={`${base}/perfil`}>Perfil</Link>
                            <button onClick={cerrarSesion}>Cerrar Sesión</button>
                        </div>
                    )}
                </div>
            </nav>
        </header>
    );
}
