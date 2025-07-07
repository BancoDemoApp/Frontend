import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../api/api'; // Asegúrate de tener esto en api.js

export default function NavbarCliente() {
    const navigate = useNavigate();
    const [showMenu, setShowMenu] = useState(false);
    const nombre = localStorage.getItem('nombre') || 'Cliente';

    const handleLogout = async () => {
        try {
            await logout(); // Registra log de cierre de sesión
        } catch (error) {
            console.error('Error cerrando sesión:', error);
        } finally {
            localStorage.clear();
            navigate('/login');
        }
    };

    return (
        <header>
            <h1 className="logo">
                <Link to="/dashboard">BancoDemoApp</Link>
            </h1>
            <nav>
                <Link to="/dashboard" className="element">Dashboard</Link>
                <Link to="/transferencia" className="element">Transferir</Link>
                <Link to="/historial" className="element">Historial</Link>

                <div
                    className="user-menu element"
                    onMouseEnter={() => setShowMenu(true)}
                    onMouseLeave={() => setShowMenu(false)}
                >
                    <button className="user-name">
                        {nombre}
                    </button>
                    {showMenu && (
                        <div className="dropdown-menu">
                            <Link to="/perfil">Perfil</Link>
                            <button onClick={handleLogout}>Cerrar Sesión</button>
                        </div>
                    )}
                </div>
            </nav>
        </header>
    );
}
