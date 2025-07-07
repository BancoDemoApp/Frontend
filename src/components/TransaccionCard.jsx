export default function TransaccionCard({ transaccion }) {
    const { tipo, cantidad, fecha, estado } = transaccion;

    const formatoFecha = new Date(fecha).toLocaleString('es-CO', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });

    let clase = '';
    let simbolo = '';
    if (tipo === 'Depósito') {
        clase = 'success';
        simbolo = '+';
    } else if (tipo === 'Retiro') {
        clase = 'danger';
        simbolo = '-';
    } else {
        clase = 'neutral';
        simbolo = '';
    }

    return (
        <div className="transaction-card">
            <div className={`icon ${clase}`} aria-hidden="true">{clase === 'success' ? '✔' : clase === 'danger' ? '➖' : '🔁'}</div>
            <div className="info">
                <strong>{tipo}</strong>
                <p>{formatoFecha}</p>
            </div>
            <div className={`amount ${clase}`}>{simbolo} ${Number(cantidad).toLocaleString('es-CO')}</div>
            <span className="status-label">{estado}</span>
        </div>
    );
}
