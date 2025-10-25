export default function Navbar() {
    const base = import.meta.env.MODE === 'production' ? '/bancodemo' : '';

    return (
        <nav>
            <div id="logo">
                <a href={`${base}/`}>BancoDemoApp</a>
            </div>
            <ul>
                <li>
                    <a href={`${base}/login`}>Ingresar</a>
                </li>
                <li>
                    <a href={`${base}/signup`}>Registrarse</a>
                </li>
            </ul>
        </nav>
    );
}
