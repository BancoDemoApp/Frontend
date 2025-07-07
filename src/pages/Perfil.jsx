// src/pages/Perfil.jsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavbarWrapper from '../components/NavbarWrapper';
import { obtenerPerfilCliente } from '../api/api';
import { FaUser, FaEnvelope, FaPhone, FaEdit, FaLock } from 'react-icons/fa';

export default function Perfil() {
    const [perfil, setPerfil] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchPerfil() {
            try {
                const res = await obtenerPerfilCliente();
                setPerfil(res.data);
            } catch (error) {
                console.error('Error al cargar perfil:', error);
            }
        }
        fetchPerfil();
    }, []);

    if (!perfil) return <p className="loading">Cargando perfil...</p>;

    return (
        <>
            <NavbarWrapper />
            <main className="perfil-main">
                <section className="perfil-container">
                    <h2>Mi Perfil</h2>
                    <p className="subtitulo">Consulta tu información personal</p>

                    <div className="form-grupo">
                        <label><FaUser /> Nombre completo</label>
                        <p>{perfil.nombre}</p>
                    </div>

                    <div className="form-grupo">
                        <label><FaEnvelope /> Correo electrónico</label>
                        <p>{perfil.correo_electronico}</p>
                    </div>

                    <div className="form-grupo">
                        <label><FaPhone /> Teléfono</label>
                        <p>{perfil.telefono || 'No registrado'}</p>
                    </div>

                    <div className="perfil-acciones">
                        <button className="btn editar" onClick={() => navigate('/perfil/editar')}>
                            <FaEdit /> Editar Información
                        </button>
                        <button className="btn cambiar-pass" onClick={() => navigate('/perfil/cambiar-contrasena')}>
                            <FaLock /> Cambiar Contraseña
                        </button>
                    </div>
                </section>
            </main>
        </>
    );
}
