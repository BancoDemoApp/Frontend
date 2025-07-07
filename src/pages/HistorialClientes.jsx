import { useEffect, useState } from 'react';
import { listarTransacciones } from '../api/api';
import NavbarCliente from '../components/NavbarCliente';

export default function HistorialTransacciones() {
    const [transacciones, setTransacciones] = useState([]);
    const [busqueda, setBusqueda] = useState('');

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await listarTransacciones();
                setTransacciones(response.data.results || [] );
            } catch (error) {
                console.error('Error al obtener transacciones:', error);
            }
        }

        fetchData();
    }, []);

    const filtrarTransacciones = () => {
        return transacciones.filter(tx => {
            const match = (texto) => texto?.toString().toLowerCase().includes(busqueda.toLowerCase());
            return (
                match(tx.tipo) ||
                match(tx.estado) ||
                match(tx.id_transaccion) ||
                match(tx.id_cuenta?.numero_cuenta) ||
                match(tx.id_cuenta_destino?.numero_cuenta) ||
                match(tx.cantidad)
            );
        });
    };

    const formatearFecha = (fechaISO) => {
        const fecha = new Date(fechaISO);
        return fecha.toLocaleString('es-CO', { dateStyle: 'medium', timeStyle: 'short' });
    };

    const formatearMonto = (monto) => {
        return new Intl.NumberFormat('es-CO', {
            style: 'currency',
            currency: 'COP',
        }).format(monto);
    };

    return (
        <>
            <NavbarCliente />
            <main className="contenido">
                <h2>Historial de Transacciones</h2>
                <p className="subtitulo">Visualiza tu historial completo de movimientos</p>

                <section className="tabla-contenedor">
                    <div className="buscador">
                        <input
                            type="text"
                            placeholder="🔍 Buscar transacciones..."
                            value={busqueda}
                            onChange={(e) => setBusqueda(e.target.value)}
                        />
                    </div>

                    <table>
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Tipo</th>
                            <th>Fecha</th>
                            <th>Monto</th>
                            <th>Estado</th>
                            <th>Origen</th>
                            <th>Destino</th>
                        </tr>
                        </thead>
                        <tbody>
                        {filtrarTransacciones().map((tx) => (
                            <tr key={tx.id_transaccion}>
                                <td>#{tx.id_transaccion}</td>
                                <td>{tx.tipo}</td>
                                <td>{formatearFecha(tx.fecha)}</td>
                                <td className={`monto ${
                                    tx.tipo === 'Deposito' ? 'verde' :
                                        tx.tipo === 'Retiro' ? 'rojo' : 'azul'
                                }`}>
                                    {formatearMonto(tx.cantidad)}
                                </td>
                                <td>
                                        <span className={`estado ${tx.estado.toLowerCase()}`}>
                                            {tx.estado}
                                        </span>
                                </td>
                                <td>{tx.id_cuenta?.numero_cuenta || '---'}</td>
                                <td>{tx.tipo === 'Transferencia' ? (tx.id_cuenta_destino?.numero_cuenta || '---') : '---'}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </section>
            </main>
        </>
    );
}
