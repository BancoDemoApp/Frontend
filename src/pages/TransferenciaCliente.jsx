import { useEffect, useState } from 'react';
import {
    FaChevronDown,
    FaUniversity,
    FaExclamationCircle,
    FaExchangeAlt
} from 'react-icons/fa';
import { obtenerMisCuentas, transferir } from '../api/api';
import NavbarCliente from '../components/NavbarCliente';

export default function TransferenciaCliente() {
    const [cuentas, setCuentas] = useState([]);
    const [cuentaSeleccionada, setCuentaSeleccionada] = useState(null);
    const [cuentaDestino, setCuentaDestino] = useState('');
    const [monto, setMonto] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        async function fetchCuentas() {
            try {
                const res = await obtenerMisCuentas();
                const cuentasActivas = res.data.filter(c => c.estado === 'Activa');
                setCuentas(cuentasActivas);

                if (cuentasActivas.length > 0) {
                    setCuentaSeleccionada(cuentasActivas[0]);
                } else {
                    setError('No tienes cuentas activas para realizar transferencias.');
                }
            } catch (error) {
                console.error('Error al cargar cuentas:', error);
                setError('Error al cargar tus cuentas.');
            }
        }
        fetchCuentas();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const cantidad = parseFloat(monto);
        setError('');

        if (!cuentaSeleccionada || !cuentaDestino || !monto) {
            setError('Por favor, completa todos los campos.');
            return;
        }

        if (isNaN(cantidad) || cantidad <= 0) {
            setError('El monto debe ser mayor a cero.');
            return;
        }

        if (cantidad > parseFloat(cuentaSeleccionada.saldo)) {
            setError('El monto excede el saldo disponible en la cuenta.');
            return;
        }

        const payload = {
            tipo: 'Transferencia',
            cantidad: cantidad,
            id_cuenta_id: cuentaSeleccionada.id_cuenta,
            numero_cuenta_destino: cuentaDestino
        };

        try {
            await transferir(payload);
            setCuentaDestino('');
            setMonto('');
            setError('');
            alert('✅ Transferencia realizada con éxito.');
        } catch (error) {
            console.error('❌ Error al realizar transferencia:', error);
            setError('Ocurrió un error al intentar transferir fondos.');
        }
    };

    return (
        <>
            <NavbarCliente />
            <main className="transferencia-main">
                <section className="transferencia-container">
                    <div className="left-form">
                        <h2>Realizar Transferencia</h2>
                        <p>Transfiere dinero a otras cuentas de forma segura</p>

                        <form className="form-card" onSubmit={handleSubmit}>
                            <label htmlFor="origen">Cuenta de Origen</label>
                            <div className="custom-select-wrapper">
                                <select
                                    id="origen"
                                    value={cuentaSeleccionada?.id_cuenta || ''}
                                    onChange={(e) => {
                                        const cuenta = cuentas.find(c => c.id_cuenta === parseInt(e.target.value));
                                        setCuentaSeleccionada(cuenta);
                                    }}
                                    className="custom-select"
                                    disabled={cuentas.length === 0}
                                >
                                    {cuentas
                                        .filter(c => c.estado === 'Activa')
                                        .map((cuenta) => (
                                            <option key={cuenta.id_cuenta} value={cuenta.id_cuenta}>
                                                {cuenta.numero_cuenta} - {cuenta.tipo}
                                            </option>
                                        ))}
                                </select>
                                <FaChevronDown className="dropdown-icon" />
                            </div>

                            <label htmlFor="destino">Cuenta de Destino</label>
                            <input
                                type="text"
                                id="destino"
                                placeholder="Número de cuenta destino"
                                value={cuentaDestino}
                                onChange={(e) => setCuentaDestino(e.target.value)}
                                required
                            />

                            <label htmlFor="monto">Monto a Transferir</label>
                            <input
                                type="number"
                                id="monto"
                                placeholder="0.00"
                                value={monto}
                                onChange={(e) => setMonto(e.target.value)}
                                min="1"
                                required
                            />

                            {/* Popup de error */}
                            {error && (
                                <div className="error-popup">
                                    <FaExclamationCircle className="error-icon" />
                                    <span>{error}</span>
                                </div>
                            )}

                            <button type="submit" disabled={cuentas.length === 0}>
                                <FaExchangeAlt style={{ marginRight: '6px' }} />
                                Realizar Transferencia
                            </button>
                        </form>
                    </div>

                    {cuentaSeleccionada && (
                        <div className="summary-card">
                            <h4>
                                <FaUniversity style={{ marginRight: '5px' }} />
                                Resumen de Cuenta
                            </h4>
                            <p><strong>Número de Cuenta</strong><br />{cuentaSeleccionada.numero_cuenta}</p>
                            <p><strong>Tipo de Cuenta</strong><br /><span className="tipo">{cuentaSeleccionada.tipo}</span></p>
                            <p><strong>Saldo Actual</strong><br /><span className="saldo">
                                {parseFloat(cuentaSeleccionada.saldo).toLocaleString('es-CO', {
                                    style: 'currency',
                                    currency: 'COP'
                                })}
                            </span></p>
                        </div>
                    )}
                </section>
            </main>
        </>
    );
}
