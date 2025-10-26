// src/pages/CambiarContrasena.jsx
import { useState } from 'react';
import NavbarWrapper from '../components/NavbarWrapper';
import { cambiarContrasena } from '../api/api';
import { FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';

export default function CambiarContrasena() {
    const [form, setForm] = useState({
        contrasena_actual: '',
        nueva_contrasena: '',
        confirmar_contrasena: '',
    });

    const [mensaje, setMensaje] = useState('');
    const [errores, setErrores] = useState('');
    const [mostrarActual, setMostrarActual] = useState(false);
    const [mostrarNueva, setMostrarNueva] = useState(false);
    const [mostrarConfirmar, setMostrarConfirmar] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setErrores('');
        setMensaje('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { contrasena_actual, nueva_contrasena, confirmar_contrasena } = form;

        if (nueva_contrasena !== confirmar_contrasena) {
            setErrores('❌ Las nuevas contraseñas no coinciden.');
            return;
        }

        try {
            await cambiarContrasena(form);
            setMensaje('✅ Contraseña actualizada con éxito.');
            setForm({
                contrasena_actual: '',
                nueva_contrasena: '',
                confirmar_contrasena: '',
            });

            // 🔁 Redirección después de actualizar
            setTimeout(() => {
                if (import.meta.env.MODE === 'production') {
                    window.location.href = '/bancodemo/perfil';
                } else {
                    window.location.href = '/perfil';
                }
            }, 1500);

        } catch (error) {
            setErrores('❌ Error al cambiar la contraseña. Verifica tus datos.');
        }
    };

    return (
        <>
            <NavbarWrapper />
            <main className="perfil-main">
                <section className="perfil-container">
                    <h2>Cambiar Contraseña</h2>
                    <p className="subtitulo">Actualiza tu contraseña de forma segura</p>

                    {mensaje && <div className="perfil-mensaje success">{mensaje}</div>}
                    {errores && <div className="perfil-mensaje error">{errores}</div>}

                    <form className="perfil-form" onSubmit={handleSubmit}>
                        {['contrasena_actual', 'nueva_contrasena', 'confirmar_contrasena'].map((field, i) => (
                            <div className="form-grupo" key={i}>
                                <label><FaLock /> {field.replace('_', ' ').replace(/^\w/, c => c.toUpperCase())}</label>
                                <div className="password-wrapper">
                                    <input
                                        type={(field === 'contrasena_actual'
                                            ? mostrarActual
                                            : field === 'nueva_contrasena'
                                                ? mostrarNueva
                                                : mostrarConfirmar)
                                            ? 'text'
                                            : 'password'}
                                        name={field}
                                        value={form[field]}
                                        onChange={handleChange}
                                        required
                                    />
                                    <span
                                        className="toggle-password"
                                        onClick={() =>
                                            field === 'contrasena_actual'
                                                ? setMostrarActual(!mostrarActual)
                                                : field === 'nueva_contrasena'
                                                    ? setMostrarNueva(!mostrarNueva)
                                                    : setMostrarConfirmar(!mostrarConfirmar)
                                        }
                                    >
                                        {(field === 'contrasena_actual'
                                            ? mostrarActual
                                            : field === 'nueva_contrasena'
                                                ? mostrarNueva
                                                : mostrarConfirmar)
                                            ? <FaEyeSlash /> : <FaEye />}
                                    </span>
                                </div>
                            </div>
                        ))}

                        <div className="perfil-acciones">
                            <button type="submit" className="btn guardar">Guardar Nueva Contraseña</button>
                        </div>
                    </form>
                </section>
            </main>
        </>
    );
}
