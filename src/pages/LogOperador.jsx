import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/api.js';
import NavbarOperador from '../Components/NavbarOperador';

const accionesOpciones = [
    'Todas las acciones',
    'Inicio de sesión',
    'Cierre de sesión',
    'Depósito procesado',
    'Retiro Procesado',
];

const iconoAccion = (accion) => {
    if (accion.includes('Inicio')) return '🔑';
    if (accion.includes('Cierre')) return '🚪';
    if (accion.includes('Depósito') || accion.includes('Deposito')) return '⬇️';
    if (accion.includes('Retiro')) return '⬆️';
    return '📄';
};

const formatoFecha = (fechaIso) => {
    const fecha = new Date(fechaIso);
    return {
        fecha: fecha.toLocaleDateString('es-CO', { day: 'numeric', month: 'long', year: 'numeric' }),
        hora: fecha.toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit', hour12: true }),
    };
};

export default function LogOperador() {
    const navigate = useNavigate();
    const [logs, setLogs] = useState([]);
    const [pagina, setPagina] = useState(1);
    const [totalPaginas, setTotalPaginas] = useState(1);
    const [busqueda, setBusqueda] = useState('');
    const [accion, setAccion] = useState('Todas las acciones');
    const [desde, setDesde] = useState('');
    const [hasta, setHasta] = useState('');
    const [recargando, setRecargando] = useState(false);
    const pageSize = 20;

    const fetchLogs = async () => {
        setRecargando(true);
        let url = `logs/listar/?page=${pagina}&page_size=${pageSize}`;

        if (accion !== 'Todas las acciones') url += `&accion=${encodeURIComponent(accion)}`;
        if (busqueda.trim() !== '') url += `&q=${encodeURIComponent(busqueda)}`;
        if (desde) url += `&desde=${desde}`;
        if (hasta) url += `&hasta=${hasta}`;

        try {
            const { data } = await api.get(url); // Usa Axios y su baseURL
            setLogs(data.results || []);
            setTotalPaginas(data.count ? Math.ceil(data.count / pageSize) : 1);
        } catch (err) {
            console.error("Error cargando logs:", err);
            setLogs([]);
        } finally {
            setRecargando(false);
        }
    };

    useEffect(() => {
        fetchLogs();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pagina, accion, busqueda, desde, hasta]);

    const limpiarFiltros = () => {
        setBusqueda('');
        setAccion('Todas las acciones');
        setDesde('');
        setHasta('');
        setPagina(1);
    };

    return (
        <>
            <NavbarOperador />
            <main className="container logs-page">
                <h1>Historial de Actividades</h1>

                <div className="filter-bar">
                    <div className="search-input">
                        <input
                            type="text"
                            placeholder="Buscar en logs..."
                            value={busqueda}
                            onChange={(e) => setBusqueda(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && setPagina(1)}
                        />
                    </div>

                    <div className="action-filter">
                        <select
                            value={accion}
                            onChange={(e) => {
                                setAccion(e.target.value);
                                setPagina(1);
                            }}
                        >
                            {accionesOpciones.map((op) => (
                                <option key={op} value={op}>
                                    {op}
                                </option>
                            ))}
                        </select>
                    </div>

                    <input
                        type="date"
                        value={desde}
                        onChange={(e) => {
                            setDesde(e.target.value);
                            setPagina(1);
                        }}
                        title="Desde"
                    />
                    <input
                        type="date"
                        value={hasta}
                        onChange={(e) => {
                            setHasta(e.target.value);
                            setPagina(1);
                        }}
                        title="Hasta"
                    />

                    <button className="clear-filters-button" onClick={limpiarFiltros}>
                        Limpiar Filtros
                    </button>
                </div>

                <ul className="log-list">
                    {logs.length === 0 && !recargando && <p>No hay resultados para mostrar.</p>}
                    {logs.map((log) => {
                        const { fecha, hora } = formatoFecha(log.fecha);
                        return (
                            <li className="log-item" key={log.id_log}>
                                <span className="log-icon">{iconoAccion(log.accion)}</span>
                                <div className="log-details">
                                    <span className="log-activity">{log.accion}</span>
                                    <span className="log-description">{log.descripcion}</span>
                                </div>
                                <div className="log-timestamp">
                                    <span className="log-date">{fecha}</span>
                                    <span className="log-time">{hora}</span>
                                </div>
                            </li>
                        );
                    })}
                </ul>

                {totalPaginas > 1 && (
                    <div className="pagination">
                        <button onClick={() => setPagina((p) => Math.max(p - 1, 1))} disabled={pagina === 1}>
                            Anterior
                        </button>
                        <span>
                            Página {pagina} de {totalPaginas}
                        </span>
                        <button onClick={() => setPagina((p) => Math.min(p + 1, totalPaginas))} disabled={pagina === totalPaginas}>
                            Siguiente
                        </button>
                    </div>
                )}
            </main>
        </>
    );
}
