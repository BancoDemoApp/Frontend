import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../api/api'; // Asegúrate de tener esto en api.js

export default function NavbarOperador() {
    const navigate = useNavigate();
    const [showMenu, setShowMenu] = useState(false);
    const nombre = localStorage.getItem('nombre') || 'Operador';

    const cerrarSesion = async () => {
        try {
            await logout(); // Registra log en backend
        } catch (error) {
            console.error('Error cerrando sesión:', error);
        } finally {
            localStorage.clear();
            navigate('/login');
        }
    };

    return (
        <header className="navbar">
            <div className="logo">
                <Link to="/operador">BancoDemoApp</Link>
            </div>
            <nav>
                <Link to="/operador" className="element">Dashboard</Link>
                <Link to="/operador/depositar" className="element">Depositar</Link>
                <Link to="/operador/retirar" className="element">Retirar</Link>
                <Link to="/operador/logs" className="element">Logs</Link>

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
                            <button onClick={cerrarSesion}>Cerrar Sesión</button>
                        </div>
                    )}
                </div>
            </nav>
        </header>
    );
}
