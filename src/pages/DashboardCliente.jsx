import { useEffect, useState } from 'react';
import { obtenerMisCuentas, listarTransacciones } from '../api/api';
import NavbarCliente from '../components/NavbarCliente';
import TransaccionCard from '../components/TransaccionCard';
import CuentaCard from '../components/CuentaCard';

export default function DashboardCliente() {
    const [cuentas, setCuentas] = useState([]);
    const [transacciones, setTransacciones] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const resCuentas = await obtenerMisCuentas();
                setCuentas(resCuentas.data); // Todas las cuentas
                const resTransacciones = await listarTransacciones();
                setTransacciones(resTransacciones.data.results.slice(0, 3) || []); // Últimas 3
            } catch (error) {
                console.error('Error al obtener datos del dashboard:', error);
            }
        }

        fetchData();
    }, []);

    return (
        <>
            <NavbarCliente />
            <main>
                <section className="welcome">
                    <h2>Dashboard del cliente</h2>
                    <p>Bienvenido, {localStorage.getItem('nombre')}</p>
                </section>

                <section className="account-info">
                    {cuentas.length > 0 ? (
                        cuentas.map((cuenta) => (
                            <CuentaCard key={cuenta.id_cuenta} cuenta={cuenta} />
                        ))
                    ) : (
                        <p>No tienes cuentas registradas.</p>
                    )}
                </section>

                <section className="transactions">
                    <div className="section-header">
                        <h3>Transacciones Recientes</h3>
                        <a href="/historial">Ver todas</a>
                    </div>

                    {transacciones.map((tx) => (
                        <TransaccionCard key={tx.id_transaccion} transaccion={tx} />
                    ))}
                </section>
            </main>
        </>
    );
}
