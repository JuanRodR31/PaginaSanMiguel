# PaginaSanMiguel

Este proyecto corresponde al frontend de **PaginaSanMiguel**.

## 🚀 Ejecución en entorno local

### Requisitos previos
- Node.js 18 o superior
- npm o yarn

### Configuración de variables de entorno

1. **Configurar el archivo .env**
   - El proyecto incluye un archivo `.env.example` con las variables necesarias
   - Copia `.env.example` a `.env` (si no existe ya)
   - Configura `VITE_API_URL` con la URL de tu backend

2. **Variables de entorno disponibles**

| Variable | Descripción | Valor por defecto |
|----------|-------------|-------------------|
| `VITE_API_URL` | URL del backend API | http://localhost:8080 |

### Ejecutar el frontend

Para iniciar el entorno de desarrollo, ejecuta el siguiente comando:

```bash
npm install
npm run dev
```

El servidor de desarrollo se iniciará en `http://localhost:5173` (o el puerto disponible).

### Configuración del proxy

El proyecto está configurado para usar un proxy de Vite que redirige las peticiones `/api/*` al backend configurado en `VITE_API_URL`. Esto permite:

- Desarrollo local sin problemas de CORS
- Cambiar fácilmente entre diferentes entornos (local, staging, producción)
- Configurar la URL del backend mediante variables de entorno

**Nota:** Asegúrate de que el backend esté ejecutándose en la URL configurada en `VITE_API_URL` para que las peticiones funcionen correctamente.
