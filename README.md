# 🚀 Sistema profesional de gestión de tickets de soporte (Help Desk) 

![Project Status](https://img.shields.io/badge/Status-Completed-success)
![Stack](https://img.shields.io/badge/Stack-FullStack-blue)
![DB](https://img.shields.io/badge/DB-SQL_Server_2025-red)

Sistema profesional de gestión de tickets de soporte (Help Desk) diseñado con arquitectura escalable. Integra una API RESTful, una interfaz moderna en React y un módulo de Business Intelligence en tiempo real.

<img width="725" height="441" alt="image" src="https://github.com/user-attachments/assets/94a13493-6dc0-4f7e-8e6c-9d55ab85668b" />


## 📋 Características Principales

* **Arquitectura Decoplada:** Frontend (React/Vite) y Backend (Flask) independientes.
* **Base de Datos Empresarial:** Persistencia en **Microsoft SQL Server** (Edición Developer).
* **Business Intelligence:** Tableros en tiempo real con **Power BI** vía *DirectQuery*.
* **ORM Robusto:** Uso de SQLAlchemy para manejo seguro de datos.
* **UI/UX Moderna:** Diseño con Tailwind CSS y componentes de React Bootstrap.
* **Feedback Visual:** Sistema de alertas y validaciones de estado en tiempo real.

## 🛠 Tech Stack

### Frontend
* **Framework:** React 18
* **Build Tool:** Vite (Carga ultra-rápida)
* **Estilos:** Tailwind CSS 3.0 + React Bootstrap
* **Http Client:** Fetch API nativa

### Backend
* **Lenguaje:** Python 3.10+
* **Framework:** Flask 3.0
* **ORM:** Flask-SQLAlchemy
* **Driver SQL:** PyODBC (ODBC Driver 17/18)

### Datos & Analytics
* **Motor BD:** SQL Server 2025 Developer Edition
* **Analytics:** Power BI Desktop

## ⚙️ Guía de Instalación y Despliegue Local

Sigue estos pasos para clonar y ejecutar el proyecto en tu máquina.

### 1. Configuración de Base de Datos (SQL Server)
1.  Abre **SQL Server Management Studio (SSMS)**.
2.  Crea una nueva base de datos llamada `helpdesk_db`.
3.  Asegúrate de tener habilitado el usuario `sa` y la "Autenticación Mixta" en tu servidor.
4.  *Nota:* No necesitas crear las tablas manualmente; el backend las generará automáticamente al iniciarse.

### 2. Configuración del Backend (API)
```bash
cd backend

# Crear entorno virtual
python -m venv venv

# Activar entorno (Windows)
.\venv\Scripts\activate

# Instalar dependencias
pip install -r requirements.txt
Variables de Entorno:Crea un archivo .env dentro de la carpeta backend/ y configura tu conexión.Ejemplo para instancia nombrada (lo más común):Properties# Reemplaza TU_PASSWORD y MSSQLSERVER02 según tu instalación
DATABASE_URI=mssql+pyodbc://sa:TU_PASSWORD@localhost\MSSQLSERVER02/helpdesk_db?driver=ODBC+Driver+17+for+SQL+Server
PORT=5000
FLASK_ENV=development
Ejecutar Servidor:Bashpython app.py
Deberás ver el mensaje: [*] Conectado a SQL Server. Tablas verificadas.3. Configuración del FrontendEn una nueva terminal:Bashcd frontend

# Instalar dependencias de Node
npm install

# Iniciar servidor de desarrollo
npm run dev
La aplicación estará disponible en: http://localhost:5173📊 Integración con Power BIEl proyecto incluye capacidad de análisis de datos. Para visualizar el dashboard:Abre Power BI Desktop.Ve a Obtener Datos > SQL Server.Ingresa tu servidor (ej: localhost\MSSQLSERVER02) y la BD helpdesk_db.Selecciona el modo DirectQuery (Importante para ver cambios en vivo).Usa tus credenciales de base de datos (sa).Carga la tabla tickets y actualiza los gráficos.🛡️ Documentación de APIMétodoEndpointDescripciónPOST/api/ticketsCrea un nuevo ticket. Requiere JSON con titulo y categoria.GET/api/ticketsObtiene todos los tickets. Soporta filtros ?estado=Abierto.PUT/api/tickets/<id>Actualiza el estado o descripción de un ticket.DELETE/api/tickets/<id>Elimina un ticket de la base de datos.GET/api/statsDevuelve KPIs JSON para dashboards ligeros.📂 Estructura del ProyectoPlaintextticket_system/
├── backend/
│   ├── app.py           # Entry point y Lógica de API
│   ├── models.py        # Modelos SQL Server (SQLAlchemy)
│   ├── config.py        # Configuración de entorno
│   └── requirements.txt # Dependencias Python
├── frontend/
│   ├── index.html       # Entry point Vite
│   ├── src/
│   │   ├── components/  # TicketForm, TicketList, TicketItem
│   │   ├── App.jsx      # Layout principal
│   │   └── index.css    # Estilos globales y Tailwind
│   └── vite.config.js   # Configuración Vite
└── README.md            # Documentación
```

📘 Aprendizajes principales

- Cómo conectar Flask con SQL Server usando ODBC
- Buenas prácticas de API REST
- Manejo de estados globales en React
- DirectQuery en Power BI para dashboards en tiempo real
- Diseño modular y separación de capas (frontend-backend-db)

Desarrollado por Kevin ALajarin - 2025





