import { useState } from 'react';
import { Link } from 'react-router-dom';
import { logout } from '../api/api';

export default function NavbarOperador() {
    const [showMenu, setShowMenu] = useState(false);
    const nombre = localStorage.getItem('nombre') || 'Operador';

    const handleLogout = async () => {
        try {
            await logout();
        } catch (error) {
            console.error('Error cerrando sesión:', error);
        } finally {
            localStorage.clear();
            // 🔹 Redirigir correctamente según entorno
            if (import.meta.env.MODE === 'production') {
                window.location.href = '/bancodemo/';
            } else {
                window.location.href = '/';
            }
        }
    };

    return (
        <header className="navbar">
            <div className="logo">
                {/* 🔹 Sin concatenar base, Vite ya maneja /bancodemo en prod */}
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
                    <button className="user-name">{nombre}</button>
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
