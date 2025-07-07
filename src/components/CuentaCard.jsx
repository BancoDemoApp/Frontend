// components/CuentaCard.jsx
import PropTypes from 'prop-types';

export default function CuentaCard({ cuenta }) {
    return (
        <div className="card">
            <p>Tu Cuenta {cuenta.tipo}</p>
            <h3>{cuenta.numero_cuenta}</h3>
            <span className={`status ${cuenta.estado.toLowerCase()}`}>{cuenta.estado}</span>
            <p className="saldo-label">Saldo Disponible</p>
            <h2 className="saldo">${parseFloat(cuenta.saldo).toFixed(2)}</h2>
        </div>
    );
}

CuentaCard.propTypes = {
    cuenta: PropTypes.shape({
        tipo: PropTypes.string.isRequired,
        numero_cuenta: PropTypes.string.isRequired,
        estado: PropTypes.string.isRequired,
        saldo: PropTypes.string.isRequired,
    }).isRequired,
};
