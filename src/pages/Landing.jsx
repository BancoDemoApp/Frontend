import React from 'react';
import { Link } from 'react-router-dom';
import debitCardImg from '../assets/images/debitcard.png';
import { FaCreditCard, FaShieldAlt, FaUser } from 'react-icons/fa';
import Navbar from '../components/Navbar';

const Landing = () => {
    return (
        <div>
            <Navbar />

            <section id="info">
                <div>
                    <h1>Gestiona tus finanzas con estilo y seguridad</h1>
                    <p>Una plataforma moderna para gestionar cuentas, realizar transacciones y validar operaciones bancarias</p>
                    <ul>
                        <li><Link to="/login">Comenzar ahora →</Link></li>
                        <li><Link to="/signup">Crear cuenta</Link></li>
                    </ul>
                </div>
                <figure>
                    <img src={debitCardImg} alt="Tarjeta débito" />
                </figure>
            </section>

            <section id="caracteristicas">
                <h2>Características Principales</h2>
                <p>Nuestra plataforma bancaria proporciona todas las herramientas que necesitas para gestionar tus finanzas</p>
                <div className="card-container">
                    <div className="card">
                        <figure><FaCreditCard /></figure>
                        <div className="card-text">
                            <h3>Transacciones seguras</h3>
                            <p>Realiza depósitos, retiros y transferencias con total seguridad y facilidad.</p>
                        </div>
                    </div>
                    <div className="card">
                        <figure><FaShieldAlt /></figure>
                        <div className="card-text">
                            <h3>Validación de Operaciones</h3>
                            <p>Todos los movimientos son validados por nuestro sistema para mayor seguridad.</p>
                        </div>
                    </div>
                    <div className="card">
                        <figure><FaUser /></figure>
                        <div className="card-text">
                            <h3>Cuentas Personalizadas</h3>
                            <p>Administra tus cuentas bancarias de forma eficiente desde cualquier dispositivo.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section id="action">
                <h2>¿Listo para empezar?</h2>
                <p>Únete a nuestra plataforma hoy y experimenta la forma más moderna de manejar tus finanzas.</p>
                <ul>
                    <li><Link to="/login">Iniciar Sesión</Link></li>
                    <li><Link to="/signup">Crear Cuenta</Link></li>
                </ul>
            </section>

            <footer>
                <div className="links-container">
                    <div className="link-info">
                        <h2 id="logo">BancoDemoApp</h2>
                        <p>Aplicación de demostración para gestión bancaria con funcionalidades para clientes y operadores.</p>
                    </div>
                    <div className="quick-links">
                        <h2>ENLACES RÁPIDOS</h2>
                        <ul>
                            <li><Link to="/">Inicio</Link></li>
                            <li><Link to="/login">Iniciar Sesión</Link></li>
                            <li><Link to="/signup">Registrarse</Link></li>
                        </ul>
                    </div>
                    <div className="legal">
                        <h2>LEGAL</h2>
                        <ul>
                            <li><a href="#">Términos de Servicio</a></li>
                            <li><a href="#">Política de Privacidad</a></li>
                        </ul>
                    </div>
                </div>
                <div className="copyright">
                    <p>© 2025 BancoDemoApp. Todos los derechos reservados</p>
                </div>
            </footer>
        </div>
    );
};

export default Landing;
