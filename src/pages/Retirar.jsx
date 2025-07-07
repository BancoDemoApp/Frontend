import { useState } from 'react';
import NavbarOperador from '../components/NavbarOperador';
import { buscarCuenta, crearTransaccion } from '../api/api';

export default function Retirar() {
    const [numeroCuenta, setNumeroCuenta] = useState('');
    const [cuenta, setCuenta] = useState(null);
    const [monto, setMonto] = useState('');
    const [mensaje, setMensaje] = useState('');
    const [error, setError] = useState('');

    const handleBuscar = async () => {
        setMensaje('');
        setError('');
        try {
            const res = await buscarCuenta(numeroCuenta);
            if (res.data.length === 0) {
                setCuenta(null);
                setError('❌ Cuenta no encontrada.');
            } else {
                setCuenta(res.data[0]);
                setError('');
            }
        } catch {
            setCuenta(null);
            setError('❌ Error al buscar la cuenta.');
        }
    };

    const handleRetirar = async () => {
        if (!cuenta || cuenta.estado !== 'Activa') return;
        if (!monto || parseFloat(monto) <= 0) {
            setError('❌ El monto debe ser mayor a cero.');
            return;
        }

        try {
            await crearTransaccion({
                tipo: 'Retiro',
                cantidad: parseFloat(monto),
                id_cuenta_id: cuenta.id_cuenta,
                correo_cliente: cuenta.id_usuario?.correo_electronico || ''
            });
            setMensaje('✅ Retiro realizado exitosamente.');
            setMonto('');
        } catch {
            setError('❌ No se pudo completar el retiro.');
        }
    };

    const cambiarCuenta = () => {
        setCuenta(null);
        setNumeroCuenta('');
        setMonto('');
        setMensaje('');
        setError('');
    };

    return (
        <>
            <NavbarOperador />
            <main className="container">
                <section className="withdraw-section">
                    <h1>Realizar Retiro</h1>
                    <p className="subtitle">Retiro de cuenta de cliente</p>
                    <div className="withdraw-form">
                        <div className="account-details">
                            <div className="form-group">
                                <label htmlFor="accountNumber">Cuenta de Origen</label>
                                <div className="input-with-icon">
                                    <input
                                        type="text"
                                        id="accountNumber"
                                        placeholder="Ej: 1234567890"
                                        value={numeroCuenta}
                                        onChange={(e) => setNumeroCuenta(e.target.value)}
                                    />
                                    <button className="search-button" onClick={handleBuscar}>🔍︎</button>
                                </div>
                                {error && <p className="error">{error}</p>}
                            </div>

                            <div className="grid-info">
                                <div className="info-item">
                                    <label>Titular</label>
                                    <span>{cuenta ? cuenta.id_usuario?.nombre || 'No disponible' : '-'}</span>
                                </div>
                                <div className="info-item">
                                    <label>Tipo de Cuenta</label>
                                    <span>{cuenta ? cuenta.tipo : '-'}</span>
                                </div>
                                <div className="info-item">
                                    <label>Saldo Actual</label>
                                    <span>$ {cuenta ? parseFloat(cuenta.saldo).toLocaleString() : '-'}</span>
                                </div>
                                <div className="info-item">
                                    <label>Estatus</label>
                                    <span className={`status ${cuenta?.estado === 'Activa' ? 'active' : 'inactive'}`}>
                                        {cuenta ? cuenta.estado : '-'}
                                    </span>
                                </div>
                            </div>

                            <button className="change-account-button" onClick={cambiarCuenta}>Cambiar cuenta</button>
                        </div>

                        <div className="withdraw-amount">
                            <div className="form-group">
                                <label htmlFor="withdrawAmount">Monto a Retirar</label>
                                <div className="input-prefix">
                                    <span className="prefix">$</span>
                                    <input
                                        type="number"
                                        id="withdrawAmount"
                                        value={monto}
                                        onChange={(e) => setMonto(e.target.value)}
                                        disabled={!cuenta}
                                    />
                                </div>
                            </div>
                            <button
                                className="withdraw-button primary"
                                onClick={handleRetirar}
                                disabled={!cuenta || cuenta.estado !== 'Activa'}
                            >
                                Realizar Retiro
                            </button>
                            {mensaje && <p className="success">{mensaje}</p>}
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}
