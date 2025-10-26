import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../api/api';

export default function NavbarCliente() {
    const navigate = useNavigate();
    const [showMenu, setShowMenu] = useState(false);
    const nombre = localStorage.getItem('nombre') || 'Cliente';

    const handleLogout = async () => {
        try {
            await logout();
        } catch (error) {
            console.error('Error cerrando sesión:', error);
        } finally {
            localStorage.clear();

            // 🔹 En producción te lleva a /bancodemo/
            // 🔹 En local, a la raíz "/"
            if (import.meta.env.MODE === 'production') {
                window.location.href = '/bancodemo/';
            } else {
                navigate('/');
            }
        }
    };

    return (
        <header>
            <h1 className="logo">
                {/* 🔹 Ya no usamos base, porque Vite maneja el prefijo */}
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
