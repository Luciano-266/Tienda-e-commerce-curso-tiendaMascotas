# PetWorld - Aplicación Web SPA en React

Este proyecto consiste en una Single Page Application (SPA) desarrollada con **React** y construida sobre **Vite** para una tienda de productos de mascotas. La aplicación desarrollada implementa mejoras con IA en base a el proyecto desarrolado en anteroriores evaluaciones

## Caracteristicas del Proyecto
- **Arquitectura Modular:** Componentes limpios, modulares y reutilizables (`Header`, `Hero`, `SelectorMascotas`, `VistaProductos`, `AdminPanel`).
- **Navegación SPA Eficiente:** Gestión de vistas mediante estados globales de React (`useState`), evitando recargas innecesarias del navegador.
- **CRUD Completo con Persistencia:** Panel de administración interactivo que permite **C**rear, **R**eer, **U**pactualizar y **E**liminar productos, almacenando la información de manera persistente mediante `Local Storage`.
- **Consumo de APIs Externas:** Integración asíncrona mediante `fetch` y estructuras `async/await` con la API pública `catfact.ninja`, implementando loaders de carga y bloques `try/catch` para el control robusto de errores de red.

---

## Declaración y Justificación del Uso de Inteligencia Artificial

En conformidad con los requerimientos éticos y metodológicos del proyecto, se declara el uso de herramientas de **Inteligencia Artificial (IA)** como asistente de desarrollo. A continuación, se detalla en qué y por qué se utilizó:

### ¿En qué se utilizo la IA?
1. **Migración Arquitectónica:** Se utilizó la IA como consultor técnico para transformar una estructura estática previa construida en HTML, CSS y JavaScript nativo hacia el paradigma orientado a componentes de React, asegurando el correcto mapeo de propiedades (`props`) y flujos de renderizado condicional.
2. **Estrategia de Persistencia de Datos:** Apoyo en el diseño de funciones puras de JavaScript para sincronizar de forma segura el estado de React (`inventario`) con la API de almacenamiento local (`Local Storage`), resguardando que los datos no se corrompan ante reinicios de la aplicación.
3. **Manejo de Asincronía y Excepciones:** Asistencia en la implementación del ciclo de vida del componente `VistaProductos` mediante el hook `useEffect` y en la optimización de la lógica de captura de errores en las peticiones HTTP (bloques `try/catch`).

### ¿Por qué se utilizo la IA?
- **Optimización del Flujo de Trabajo:** Actuó como un revisor de código (*Code Reviewer*) en tiempo real, agilizando la detección de errores comunes de sintaxis en JSX (como la corrección de atributos nativos de HTML a la sintaxis de React, ej: `class` a `className`).
- **Garantía de Buenas Prácticas:** Permitir un aprendizaje acelerado sobre la gestión de estados globales y flujos asíncronos en frameworks modernos, asegurando un código limpio, legible y escalable que cumpla con los estándares de la industria del software.

