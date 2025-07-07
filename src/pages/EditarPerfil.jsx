// src/pages/EditarPerfil.jsx
import { useEffect, useState } from 'react';
import NavbarWrapper from '../components/NavbarWrapper';
import { obtenerPerfilCliente, actualizarPerfilCliente } from '../api/api';
import { FaUser, FaEnvelope, FaPhone, FaSave } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

export default function EditarPerfil() {
    const [form, setForm] = useState({ nombre: '', correo_electronico: '', telefono: '' });
    const [mensaje, setMensaje] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchPerfil() {
            try {
                const res = await obtenerPerfilCliente();
                setForm({
                    nombre: res.data.nombre,
                    correo_electronico: res.data.correo_electronico,
                    telefono: res.data.telefono || ''
                });
            } catch (error) {
                console.error('Error al cargar perfil:', error);
            }
        }
        fetchPerfil();
    }, []);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await actualizarPerfilCliente(form);
            setMensaje('✅ Datos actualizados correctamente.');
            setTimeout(() => navigate('/perfil'), 1500);
        } catch (error) {
            console.error('Error al actualizar perfil:', error);
            setMensaje('❌ No se pudo actualizar el perfil.');
        }
    };

    return (
        <>
            <NavbarWrapper />
            <main className="perfil-main">
                <section className="perfil-container">
                    <h2>Editar Perfil</h2>
                    <p className="subtitulo">Modifica tu información personal</p>
                    {mensaje && <div className="perfil-mensaje">{mensaje}</div>}
                    <form className="perfil-form" onSubmit={handleSubmit}>
                        <div className="form-grupo">
                            <label><FaUser /> Nombre completo</label>
                            <input type="text" name="nombre" value={form.nombre} onChange={handleChange} required />
                        </div>

                        <div className="form-grupo">
                            <label><FaEnvelope /> Correo electrónico</label>
                            <input type="email" name="correo_electronico" value={form.correo_electronico} onChange={handleChange} required />
                        </div>

                        <div className="form-grupo">
                            <label><FaPhone /> Teléfono</label>
                            <input type="tel" name="telefono" value={form.telefono} onChange={handleChange} placeholder="Opcional" />
                        </div>

                        <div className="perfil-acciones">
                            <button type="submit" className="btn guardar">
                                <FaSave /> Guardar Cambios
                            </button>
                        </div>
                    </form>
                </section>
            </main>
        </>
    );
}
