# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh


## Elección de Fetch sobre Axios

En este proyecto se ha optado por usar **Fetch** en lugar de **Axios** por las siguientes razones:

1. **Sin dependencias externas**: Fetch es una API nativa del navegador, por lo que no es necesario instalar ninguna librería adicional. Esto ayuda a mantener el proyecto más ligero y evita la gestión de dependencias externas.

2. **Proyectos sencillos**: Si el proyecto no requiere características avanzadas como interceptores o un manejo complejo de errores, Fetch es más que suficiente. Permite realizar peticiones HTTP simples y manejar las respuestas de manera eficiente.

3. **Compatibilidad y simplicidad**: Fetch es ideal para aplicaciones con pocos requerimientos de peticiones HTTP. Al ser una API nativa, su uso es directo y fácil de implementar en proyectos más pequeños y sencillos.

4. **Mejor rendimiento (en ciertos casos)**: Al no depender de librerías externas, el proyecto no tiene el peso adicional de una librería como Axios. Esto puede ser beneficioso para aplicaciones ligeras donde el rendimiento es clave.

5. **Mayor control sobre el código**: Fetch ofrece un mayor control sobre el manejo de las respuestas y los errores. Aunque requiere escribir más código para gestionar casos complejos (como comprobar los errores HTTP), también proporciona mayor flexibilidad y personalización.

En resumen, Fetch es la opción más adecuada para esta estapa del proyecto Hospital debido a su simplicidad, compatibilidad nativa y su capacidad para satisfacer los requisitos de este proyecto sin la necesidad de añadir dependencias externas.
