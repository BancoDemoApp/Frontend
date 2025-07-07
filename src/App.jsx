import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Signup from './pages/Signup';
import TransferenciaCliente from './pages/TransferenciaCliente';
import HistorialClientes from './pages/HistorialClientes';
import Perfil from './pages/Perfil';
import EditarPerfil from './pages/EditarPerfil';
import CambiarContrasena from './pages/CambiarContrasena';
import DashboardOperador from './pages/DashboardOperador';
import PrivateRoute from './components/PrivateRoute';
import DashboardCliente from './pages/DashboardCliente';
import ClienteLayout from './components/ClienteLayout';
import PublicLayout from './components/PublicLayout';
import OperadorLayout from './components/OperadorLayout';
import Depositar from "./pages/Depositar";
import Retirar from "./pages/Retirar";
import LogOperador from './pages/LogOperador';

function App() {
    return (
        <Router>
            <Routes>
                {/* Rutas públicas */}
                <Route element={<PublicLayout />}>
                    <Route path="/" element={<Landing />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                </Route>

                {/* Cliente */}
                <Route element={<ClienteLayout />}>
                    <Route
                        path="/dashboard"
                        element={
                            <PrivateRoute tipoPermitido="Cliente">
                                <DashboardCliente />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/transferencia"
                        element={
                            <PrivateRoute tipoPermitido="Cliente">
                                <TransferenciaCliente />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/historial"
                        element={
                            <PrivateRoute tipoPermitido="Cliente">
                                <HistorialClientes />
                            </PrivateRoute>
                        }
                    />
                </Route>

                {/* Operador */}
                <Route path="/operador" element={<OperadorLayout />}>
                    <Route
                        index
                        element={
                            <PrivateRoute tipoPermitido="Operador">
                                <DashboardOperador />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="depositar"
                        element={
                        <PrivateRoute tipoPermitido="Operador">
                            <Depositar />
                        </PrivateRoute>
                        }
                    />
                    <Route
                        path="retirar"
                        element={
                            <PrivateRoute tipoPermitido="Operador">
                                <Retirar />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="logs"
                        element={
                            <PrivateRoute tipoPermitido="Operador">
                                <LogOperador />
                            </PrivateRoute>
                        }
                    />
                </Route>

                {/* Rutas compartidas (Cliente + Operador) */}
                <Route
                    path="/perfil"
                    element={
                        <PrivateRoute tipoPermitido={['Cliente', 'Operador']}>
                            <Perfil />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/perfil/editar"
                    element={
                        <PrivateRoute tipoPermitido={['Cliente', 'Operador']}>
                            <EditarPerfil />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/perfil/cambiar-contrasena"
                    element={
                        <PrivateRoute tipoPermitido={['Cliente', 'Operador']}>
                            <CambiarContrasena />
                        </PrivateRoute>
                    }
                />
            </Routes>
        </Router>
    );
}

export default App;
