# Component Management App

Esta aplicación permite la creación y visualización de componentes personalizados de tipo **Input**, **Checkbox**, y **Select**. El sistema utiliza una API desarrollada en Node.js y Express para almacenar y recuperar datos de componentes. Cada tipo de componente cuenta con su propio conjunto de rutas para operaciones de creación y recuperación, y se utiliza un frontend que permite a los usuarios interactuar con los componentes de forma visual.

## Características

- **Crear Componentes**: Formularios para crear componentes personalizados de tipo Input, Checkbox y Select.
- **Visualización de Componentes**: Modal para visualizar componentes almacenados.
- **API Modular**: Cada tipo de componente tiene sus propias rutas en la API para mejorar la organización y escalabilidad.
- **Validación de Datos**: Validaciones en el backend para garantizar que los datos enviados estén en el formato correcto.

## Estructura del Proyecto

```plaintext
ComponentManagementApp/
├── public/                   # Archivos públicos (favicon, index.html)
├── src/                      # Carpeta principal del código fuente
│   ├── ComponentsUI/         # Componentes de UI específicos
│   │   ├── Checkbox/         # Formularios y lógica para Checkbox
│   │   │   ├── CheckboxForm.tsx
│   │   │   ├── Checkbox.hooks.ts
│   │   │   ├── Checkbox.types.ts
│   │   └── Input/            # Formularios y lógica para Input
│   │   │   ├── InputForm.tsx
│   │   │   ├── useInput.hooks.ts
│   │   │   ├── Input.types.ts
│   │   └── Select/           # Formularios y lógica para Select
│   │       ├── SelectForm.tsx
│   │       ├── Select.hooks.ts
│   │       ├── Select.types.ts
│   ├── Utils/                # Utilidades generales
│   │   ├── BaseEmpty/        # Componente de mensaje vacío
│   │   └── Validation/       # Esquemas de validación
│   ├── App.js                # Componente principal
│   └── index.js              # Punto de entrada de la aplicación
├── server/                   # Backend del servidor
│   ├── routers/              # Rutas del API
│   │   ├── checkboxRoutes.js
│   │   ├── inputRoutes.js
│   │   ├── selectRoutes.js
│   └── server.js             # Configuración del servidor
├── .env                      # Variables de entorno
├── README.md                 # Documentación del proyecto
├── package.json              # Dependencias y scripts
└── yarn.lock                 # Bloqueo de versiones para Yarn

Requisitos
Node.js y Yarn instalados en tu sistema.
Express como servidor del backend.
Chakra UI para los componentes de UI en el frontend.
Instalación y Ejecución
Sigue estos pasos para clonar el repositorio, instalar dependencias y ejecutar la aplicación:

Clonar el repositorio:
git clone https://github.com/tu-usuario/ComponentManagementApp.git
cd ComponentManagementApp

Instalar dependencias:

bash
Copiar código
yarn install
Configurar variables de entorno:

Crea un archivo .env en la raíz del proyecto.
Define el puerto en el archivo .env (opcional):
plaintext
Copiar código
PORT=3000
Ejecutar la aplicación:

bash
Copiar código
yarn dev
Esto inicia el servidor en el puerto especificado en el .env o, si no está configurado, en el puerto 3000.
Ejecutar pruebas:

bash
Copiar código
yarn test
Este comando ejecutará las pruebas del proyecto.
Uso
Una vez que la aplicación esté en ejecución:

Accede a la aplicación en http://localhost:3000 en tu navegador.
Usa los formularios en el frontend para crear componentes personalizados (Input, Checkbox, Select).
Los componentes creados se almacenarán y podrás visualizarlos en el modal de vista previa.
API Endpoints
/api/input: Endpoints para gestionar componentes de tipo Input.
/api/checkbox: Endpoints para gestionar componentes de tipo Checkbox.
/api/select: Endpoints para gestionar componentes de tipo Select.
Cada endpoint tiene métodos POST para agregar datos y GET para obtener todos los datos almacenados.

Contribución
Si deseas contribuir al proyecto, realiza un fork del repositorio, crea una rama con tus cambios y haz un pull request.

Este README.md proporciona toda la información necesaria para comprender y ejecutar la aplicación, así como su estructura interna y los pasos de instalación.

yaml

--- 

Copia y pega este código en tu archivo `README.md`. ¿Te gustaría añadir algo más?
# chara-ui-project
