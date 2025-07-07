# 💻 BancoDemoApp - Frontend

Este repositorio contiene el **frontend** de una aplicación bancaria educativa desarrollada con **ReactJS**. Su propósito es simular operaciones bancarias básicas para usuarios tipo **cliente** y **operador**, facilitando el aprendizaje de conceptos como autenticación, transacciones, gestión de usuarios y roles, así como el consumo de APIs RESTful.

## 🧠 Finalidad educativa

El proyecto está diseñado como una herramienta de enseñanza para estudiantes de desarrollo de software o sistemas, permitiendo explorar y practicar:

- Arquitectura cliente-servidor
- Manejo de rutas protegidas por tipo de usuario
- Consumo de APIs con JWT
- Manejo de sesiones y tokens
- Operaciones CRUD simuladas en una app bancaria

---

## 🚀 Tecnologías utilizadas

- ReactJS
- React Router DOM
- Axios
- Context API + LocalStorage para autenticación
- CSS personalizado (sin frameworks de UI externos)

---

## 📁 Estructura del proyecto

```bash
📦 src
 ┣ 📂api                # Endpoints y configuración de Axios
 ┣ 📂components         # Componentes reutilizables (Navbar, Layouts, etc.)
 ┣ 📂pages              # Vistas principales según el rol del usuario
 ┣ 📜 App.jsx           # Configuración principal de rutas
 ┣ 📜 main.jsx          # Punto de entrada
 ┗ 📜 index.css         # Estilos generales
```

## 🧭 Vistas disponibles
### 🧑 Cliente

* `/dashboard` → Panel principal del cliente
* `/transferencia` → Transferencia de fondos a otra cuenta
* `/historial` → Historial de transacciones realizadas

### 👨‍💼 Operador

* ``/operador`` → Dashboard de operador
* ``/operador/depositar`` → Procesar depósitos
* ``/operador/retirar`` → Procesar retiros
* ``/operador/logs`` → Ver historial de acciones realizadas

### 👥 Compartidas (Cliente y Operador)

* ``/perfil`` → Ver perfil del usuario
* `/perfil/editar` → Editar datos del perfil
* `/perfil/cambiar-contrasena` → Modificar contraseña

### 🌐 Rutas públicas

* ``/`` → Landing page
* ``/login`` → Iniciar sesión
* ``/signup`` → Registro de cliente

## 🔐 Gestión de autenticación

El sistema gestiona sesiones con **JWT (JSON Web Token)**. Los tokens se almacenan en ``localStorage`` y se incluyen automáticamente en las solicitudes protegidas mediante un interceptor de Axios.

Se implementa control de acceso con rutas privadas (``PrivateRoute``) que redirigen a usuarios no autorizados.

## 📦 Instalación y uso

1. Clonar el repositorio
````bash
git clone https://github.com/tu-usuario/bancodemo-frontend.git
cd bancodemo-frontend
````

2. Instalar dependencias
````bash
npm install
````

3. Iniciar servidor de desarrollo
````bash
npm run dev
````

Asegúrate de que el [backend para este proyecto (Django)](https://github.com/oscar-dev91/BancoDemoREST) esté corriendo en http://127.0.0.1:8000.

## 🧪 Funcionalidades principales

* Inicio y cierre de sesión con tokens JWT
* Registro de nuevos clientes
* Transferencias entre cuentas
* Depósitos y retiros por parte de operadores
* Filtrado de transacciones por cuenta
* Visualización de logs de actividad del operador
* Gestión del perfil y contraseña del usuario

## 📚 Licencia

Este proyecto es de uso **educativo** y no está destinado para producción. Puedes modificarlo y reutilizarlo libremente con fines de aprendizaje.

***Desarrollado con ❤️ para propósitos pedagógicos.***