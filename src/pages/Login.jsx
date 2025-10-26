import { useState } from 'react';
import { login } from '../api/api';
import { useNavigate, Link } from 'react-router-dom';
import { FaUser, FaUsers, FaEye, FaEyeSlash } from 'react-icons/fa';
import Navbar from '../components/Navbar';

export default function Login() {
    const [role, setRole] = useState('Cliente');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [mostrarContrasena, setMostrarContrasena] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await login({
                correo_electronico: email.trim().toLowerCase(),
                password,
                rol: role,
            });

            localStorage.setItem('access', response.data.access);
            localStorage.setItem('refresh', response.data.refresh);
            localStorage.setItem('tipo', response.data.tipo);
            localStorage.setItem('nombre', response.data.nombre);
            localStorage.setItem('usuario_id', response.data.usuario_id);

            if (role === 'Cliente') {
                navigate('/dashboard');
            } else {
                navigate('/operador');
            }
        } catch (error) {
            setErrorMsg('Credenciales incorrectas');
        }
    };

    return (
        <>
            <Navbar />
            <section className="login">
                <h1>Iniciar Sesión</h1>
                <p>Seleccione su rol e ingrese sus credenciales para acceder</p>

                <div className="login-container">
                    <p className="role">Seleccione su rol</p>
                    <div className="role-selection">
                        <button
                            id="cliente-btn"
                            className={`toggle-button ${role === 'Cliente' ? 'active' : ''}`}
                            onClick={() => {
                                setRole('Cliente');
                                setErrorMsg('');
                            }}
                            type="button"
                        >
                            <FaUser />
                            Cliente
                        </button>
                        <button
                            id="operador-btn"
                            className={`toggle-button ${role === 'Operador' ? 'active' : ''}`}
                            onClick={() => {
                                setRole('Operador');
                                setErrorMsg('');
                            }}
                            type="button"
                        >
                            <FaUsers />
                            Operador
                        </button>
                    </div>

                    <form className="input-group" onSubmit={handleLogin}>
                        <label htmlFor="email">Correo Electrónico</label>
                        <input
                            type="email"
                            id="email"
                            placeholder="correo@ejemplo.com"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <label htmlFor="password">Contraseña</label>
                        <div className="password-wrapper">
                            <input
                                type={mostrarContrasena ? 'text' : 'password'}
                                id="password"
                                placeholder="*******"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <span
                                className="toggle-password"
                                onClick={() => setMostrarContrasena(!mostrarContrasena)}
                            >
                                {mostrarContrasena ? <FaEyeSlash /> : <FaEye />}
                            </span>
                        </div>

                        {errorMsg && (
                            <p id="error-message" className="error-message">
                                {errorMsg}
                            </p>
                        )}

                        <button type="submit" id="login-btn">
                            Iniciar como {role}
                        </button>
                    </form>

                    <p>
                        ¿No tienes una cuenta? <Link to="/signup">Regístrate aquí</Link>
                    </p>
                </div>
            </section>
        </>
    );
}
