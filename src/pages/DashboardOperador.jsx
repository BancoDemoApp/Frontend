import { useEffect, useState } from 'react';
import NavbarOperador from '../components/NavbarOperador';
import { listarTransacciones } from '../api/api';

export default function DashboardOperador() {
    const [trans, setTrans] = useState([]);
    const [resumen, setResumen] = useState({ total:0, depositos:0, retiros:0 });
    const nombre = localStorage.getItem('nombre');

    // Base dinámico según entorno
    const base = import.meta.env.MODE === 'production' ? '/bancodemo' : '';

    useEffect(() => {
        async function fetch() {
            try {
                const res = await listarTransacciones();
                const data = res.data.results;
                setTrans(data.slice(0,5)); // mostrar 5 recientes
                const total = data.length;
                const depositos = data.filter(t => t.tipo === 'Deposito').length;
                const retiros = data.filter(t => t.tipo === 'Retiro').length;
                setResumen({ total, depositos, retiros });
            } catch (err) { console.error(err); }
        }
        fetch();
    }, []);

    const formatMoney = (value) =>
        parseFloat(value).toLocaleString('es-CO',{ style:'currency', currency:'COP' });

    const icono = tipo => tipo === 'Deposito' ? '✅' : tipo === 'Retiro' ? '⬆️' : '📤';

    return (
        <>
            <NavbarOperador />
            <main className="dashboard">
                <section className="bienvenida">
                    <h1>Dashboard del Operador</h1>
                    <p>Bienvenido, {nombre}</p>
                </section>

                <section className="resumen">
                    <div className="card resumen-item">
                        <div className="icon">📄</div>
                        <div><h3>Total Transacciones</h3><p>{resumen.total}</p></div>
                    </div>
                    <div className="card resumen-item">
                        <div className="icon">⬇️</div>
                        <div><h3>Depósitos Realizados</h3><p>{resumen.depositos}</p></div>
                    </div>
                    <div className="card resumen-item">
                        <div className="icon">⬆️</div>
                        <div><h3>Retiros Realizados</h3><p>{resumen.retiros}</p></div>
                    </div>
                </section>

                <section className="transacciones">
                    <div className="trans-header">
                        <h2>Transacciones Recientes</h2>
                        {/* Ajuste dinámico del enlace */}
                        <a href={`${base}/operador/logs`}>Ver todas</a>
                    </div>
                    <ul className="lista-transacciones">
                        {trans.map(t => (
                            <li key={t.id_transaccion} className="trans-item">
                                <div className="tipo">{icono(t.tipo)} {t.tipo}</div>
                                <div className="fecha">
                                    {new Date(t.fecha).toLocaleString('es-CO',{
                                        dateStyle: 'medium', timeStyle: 'short'})}
                                </div>
                                <div className={`monto ${t.tipo==='Deposito'?'verde':'rojo'}`}>
                                    {t.tipo==='Deposito' ? '+' : '-'} {formatMoney(t.cantidad)}
                                </div>
                            </li>
                        ))}
                    </ul>
                </section>

                <footer>…</footer>
            </main>
        </>
    );
}
