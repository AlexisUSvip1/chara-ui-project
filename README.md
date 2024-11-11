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
├── server/                   # Backend del servidor
│   ├── routers/              # Rutas de la API
│   │   ├── CheckboxApi/
│   │   │   └── serverCheckbox.js
│   │   ├── InputApi/
│   │   │   └── serverInput.js
│   │   ├── SelectApi/
│   │   │   └── serverSelect.js
│   │   └── index.js          # Archivo principal de rutas del servidor
│   ├── .env                  # Variables de entorno
│   ├── package.json          # Dependencias y scripts del servidor
│   ├── package-lock.json     # Archivo de bloqueo de dependencias para npm
│   └── server.js             # Configuración principal del servidor
├── src/                      # Carpeta principal del código fuente de frontend
│   ├── __test__/             # Carpeta de pruebas
│   ├── ComponentsUI/         # Componentes de UI específicos
│   │   ├── Checkbox/
│   │   │   ├── Checkbox.hooks.ts
│   │   │   ├── Checkbox.styles.ts
│   │   │   ├── Checkbox.tsx
│   │   │   └── Checkbox.types.ts
│   │   ├── Input/
│   │   │   ├── Input.styles.ts
│   │   │   ├── Input.tsx
│   │   │   ├── Input.types.ts
│   │   │   └── useInput.hooks.ts
│   │   ├── Select/
│   │   │   ├── Select.hooks.ts
│   │   │   ├── Select.styles.ts
│   │   │   ├── Select.tsx
│   │   │   └── Select.types.ts
│   │   ├── FormModal/        # Componente para el modal de formularios
│   │   │   ├── FormModal.style.ts
│   │   │   ├── FormModal.tsx
│   │   │   └── FormModal.types.ts
│   │   └── ShowComponentsUI/ # UI para mostrar los componentes
│   │       ├── CounterComponents.tsx
│   │       └── CounterComponents.types.ts
│   ├── Home/                 # Página principal
│   │   ├── App.style.ts
│   │   └── App.tsx
│   ├── PreviewContainer/     # Contenedor para la vista previa de componentes
│   │   ├── PreviewContainer.hooks.ts
│   │   ├── PreviewContainer.styles.ts
│   │   └── PreviewContainer.tsx
│   ├── Utils/                # Utilidades generales
│   │   ├── BaseEmpty/
│   │   │   └── BaseEmpty.tsx # Componente para mostrar mensajes vacíos
│   │   ├── Button/
│   │   │   ├── Button.tsx
│   │   │   └── Button.types.ts
│   │   └── Validation/
│   │       └── ValidateComponents.utils.ts # Esquemas de validación
│   ├── services/             # Servicios para solicitudes HTTP
│   │   ├── apiService.d.ts   # Tipos para el servicio API
│   │   └── apiService.js     # Servicio API para manejar solicitudes HTTP
│   ├── index.css             # Estilos globales
│   ├── main.tsx              # Punto de entrada principal del frontend
│   └── setupTests.ts         # Configuración de pruebas
├── .env                      # Variables de entorno del proyecto
├── .gitignore                # Archivos y carpetas ignorados por git
├── index.html                # Archivo HTML principal
├── package.json              # Dependencias y scripts del proyecto
├── package-lock.json         # Archivo de bloqueo de dependencias para npm
├── README.md                 # Documentación del proyecto
├── tsconfig.app.json         # Configuración de TypeScript para la aplicación
├── tsconfig.json             # Configuración general de TypeScript
├── tsconfig.node.json        # Configuración de TypeScript para Node
├── vite.config.ts            # Configuración de Vite
└── yarn.lock                 # Bloqueo de versiones para Yarn

```

## Requisitos
    Node.js y Yarn instalados en tu sistema.
    Express como servidor del backend.
    Chakra UI para los componentes de UI en el frontend.
## Instalación y Ejecución
Sigue estos pasos para clonar el repositorio, instalar 
### Dependencias y ejecutar la aplicación:
```bash
 Clonar el repositorio: git clone https://github.com/tu-usuario/ComponentManagementApp.git
```
```bash
 cd chara-ui-project
```
   

### Instalar dependencias:

- La version de node debe de ser de ```bash >=21.1.0```
- Configurar variables de entorno (cliente):

    Crea un archivo .env en la raíz del proyecto.
    Define el puerto en el archivo .env:
    plaintext
    Copiar código
    ```bash 
    chara-ui-project/
        VITE_API_BASE_URL=http://localhost:3005/api
    ```
- Configurar variables de entorno (servidor):

    Crea un archivo .env en la raíz del proyecto.
    Define el puerto en el archivo .env:

    ```bash 
    server/
        PORT=3000
    ```
### Ejecutar la aplicación:

- Primer paso 
para poder instalar dependencias

```bash 
yarn install
```

- Secundo paso
para poder ejecutar la aplicacion ejecutamos
```bash 
yarn dev
```
- Tercer paso
Ejecutar pruebas:
Este comando ejecutará las pruebas del proyecto.

```bash 
yarn test
```
- Cuarto paso
Ejecutar api en node:
Este comando ejecutará la api en node (recuerda tener el mismo puerto en el env de node (v. >=21.1.0 y en el env de el frontend)

```bash 
node server.js
```
Debera salir un mensaje tipo
```bash 
Servidor en funcionamiento en http://localhost:3000
```
### Uso
Una vez que la aplicación esté en ejecución:

Accede a la aplicación en el puerto en tu navegador.
Usa los formularios en el frontend para crear componentes personalizados (Input, Checkbox, Select).

Los componentes creados se almacenarán y podrás visualizarlos en el modal de vista previa.
### API Endpoints
    /api/input: Endpoints para gestionar componentes de tipo Input.
    /api/checkbox: Endpoints para gestionar componentes de tipo Checkbox.
    /api/select: Endpoints para gestionar componentes de tipo Select.
Cada endpoint tiene métodos POST para agregar datos y GET para obtener todos los datos almacenados.


