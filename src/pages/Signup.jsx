import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/api';
import Navbar from '../components/Navbar';

export default function Signup() {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        nombre: '',
        correo_electronico: '',
        telefono: '',
        password: '',
        confirmPassword: '',
        tipo: '',
    });

    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setError('');
    };

    const validarContrasena = (password) => {
        return {
            longitud: password.length >= 8,
            minuscula: /[a-z]/.test(password),
            mayuscula: /[A-Z]/.test(password),
            numero: /\d/.test(password),
            especial: /[\W_]/.test(password),
        };
    };

    const contrasenaCoincide = form.password && form.confirmPassword
        ? form.password === form.confirmPassword
        : null;

    const handleSubmit = async (e) => {
        e.preventDefault();

        const requisitos = validarContrasena(form.password);
        const cumpleTodos = Object.values(requisitos).every((val) => val);

        if (!contrasenaCoincide) {
            return setError('❌ Las contraseñas no coinciden');
        }

        if (!cumpleTodos) {
            return setError('❌ La contraseña no cumple con todos los requisitos de seguridad.');
        }

        if (!form.tipo) {
            return setError('❌ Debe seleccionar un tipo de usuario');
        }

        try {
            await api.post('users/create/', {
                nombre: form.nombre,
                correo_electronico: form.correo_electronico,
                telefono: form.telefono,
                password: form.password,
                tipo: form.tipo,
            });

            navigate('/login');
        } catch (err) {
            setError('❌ No se pudo registrar el usuario');
            console.error(err);
        }
    };

    const requisitos = validarContrasena(form.password);

    return (
        <>
            <Navbar />
            <section className="register">
                <h1>Crear Cuenta</h1>
                <p>Regístrate para acceder a los servicios bancarios</p>
                <div className="register-container">
                    <form className="register-form" onSubmit={handleSubmit}>
                        <label htmlFor="nombre">Nombre Completo</label>
                        <input
                            type="text"
                            id="nombre"
                            name="nombre"
                            placeholder="Juan Perez"
                            required
                            value={form.nombre}
                            onChange={handleChange}
                        />

                        <label htmlFor="correo_electronico">Correo Electrónico</label>
                        <input
                            type="email"
                            id="correo_electronico"
                            name="correo_electronico"
                            placeholder="correo@ejemplo.com"
                            required
                            value={form.correo_electronico}
                            onChange={handleChange}
                        />

                        <label htmlFor="telefono">Teléfono</label>
                        <input
                            type="text"
                            id="telefono"
                            name="telefono"
                            placeholder="3101234567"
                            required
                            value={form.telefono}
                            onChange={handleChange}
                        />

                        <label htmlFor="password">Contraseña</label>
                        <div className="password-wrapper">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                name="password"
                                placeholder="*******"
                                required
                                value={form.password}
                                onChange={handleChange}
                            />
                            <span
                                className="toggle-password"
                                onClick={() => setShowPassword(!showPassword)}
                                style={{ cursor: 'pointer' }}
                            >
                                {showPassword ? '🙈' : '👁️'}
                            </span>
                        </div>

                        {/* Panel de requisitos */}
                        {form.password && (
                            <ul className="password-requirements">
                                <li className={requisitos.longitud ? 'ok' : ''}>✅ Mínimo 8 caracteres</li>
                                <li className={requisitos.minuscula ? 'ok' : ''}>✅ Al menos una letra minúscula</li>
                                <li className={requisitos.mayuscula ? 'ok' : ''}>✅ Al menos una letra mayúscula</li>
                                <li className={requisitos.numero ? 'ok' : ''}>✅ Al menos un número</li>
                                <li className={requisitos.especial ? 'ok' : ''}>✅ Al menos un carácter especial</li>
                            </ul>
                        )}

                        <label htmlFor="confirmPassword">Confirmar Contraseña</label>
                        <div className="password-wrapper">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                id="confirmPassword"
                                name="confirmPassword"
                                placeholder="*******"
                                required
                                value={form.confirmPassword}
                                onChange={handleChange}
                            />
                            <span
                                className="toggle-password"
                                onClick={() => setShowPassword(!showPassword)}
                                style={{ cursor: 'pointer' }}
                            >
                                {showPassword ? '🙈' : '👁️'}
                            </span>
                        </div>

                        {form.confirmPassword && (
                            <p className={contrasenaCoincide ? 'match-ok' : 'match-error'}>
                                {contrasenaCoincide
                                    ? '✅ Las contraseñas coinciden'
                                    : '❌ Las contraseñas no coinciden'}
                            </p>
                        )}

                        <label>Tipo de Usuario</label>
                        <div className="user-type">
                            <label>
                                <input
                                    type="radio"
                                    name="tipo"
                                    value="Cliente"
                                    checked={form.tipo === 'Cliente'}
                                    onChange={handleChange}
                                />
                                Cliente
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="tipo"
                                    value="Operador"
                                    checked={form.tipo === 'Operador'}
                                    onChange={handleChange}
                                />
                                Operador
                            </label>
                        </div>

                        {error && <p className="error-message">{error}</p>}

                        <button type="submit">Regístrate</button>

                        <p className="login-link">
                            ¿Ya tienes cuenta? <Link to="/login">Inicia sesión aquí</Link>
                        </p>
                    </form>
                </div>
            </section>
        </>
    );
}
