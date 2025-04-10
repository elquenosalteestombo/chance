# Chance App

Este proyecto es una aplicación web desarrollada con React en el frontend y Node.js/Express en el backend. A continuación se detalla la estructura de archivos y la funcionalidad de cada uno.

## Estructura de Archivos

### Frontend (client)
export NODE_OPTIONS=--openssl-legacy-provider

- **public/**
  - **index.html**: Página principal de la aplicación, contiene la estructura HTML básica y un punto de entrada para la aplicación React.
  - **favicon.ico**: Ícono que se muestra en la pestaña del navegador.
  - **manifest.json**: Configuración del manifiesto de la aplicación, incluye información como el nombre, íconos y configuración de pantalla.
  - **robots.txt**: Indica a los motores de búsqueda qué páginas deben o no deben indexar.

- **src/**
  - **App.js**: Componente principal de la aplicación React, define la estructura y el comportamiento de la interfaz de usuario.
  - **App.css**: Estilos CSS para el componente App.js.
  - **index.js**: Punto de entrada de la aplicación React, renderiza el componente App en el DOM.
  - **index.css**: Estilos CSS globales para la aplicación.

- **package.json**: Configuración del proyecto frontend, lista las dependencias, scripts y metadatos del proyecto.

### Backend (server)

- **config/**
  - **db.js**: Configuración de la conexión a la base de datos.

- **models/**
  - **Boleto.js**: Define el modelo Boleto, que representa la estructura de los datos relacionados con los boletos en la base de datos.

- **.env**: Contiene variables de entorno, como credenciales de base de datos y configuraciones sensibles.

- **index.js**: Punto de entrada del servidor, configura y arranca la aplicación Express.

- **package.json**: Configuración del proyecto backend, lista las dependencias y scripts para el servidor.

## Instalación

Para instalar las dependencias del proyecto, navega a la carpeta `client` y ejecuta:

```
npm install
```

Luego, para iniciar la aplicación, ejecuta:

```
npm start
```

## Contribuciones

Las contribuciones son bienvenidas. Si deseas contribuir, por favor abre un issue o envía un pull request.

## Licencia

Este proyecto está bajo la licencia MIT.