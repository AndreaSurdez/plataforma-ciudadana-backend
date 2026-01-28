# Plataforma Ciudadana – Reportes con Conectividad Variable

## Justificación arquitectónica
Esta aplicación está diseñada para funcionar en contextos móviles con conectividad intermitente. Se adoptó una arquitectura **frontend-backend desacoplada**, con:
- **Frontend**: React + PWA (Service Worker, manifest.json)
- **Backend**: Node.js + Express + WebSocket
- **Persistencia**: MongoDB Atlas
- **Despliegue**: Vercel (frontend) + Render (backend)

La elección responde a los principios del curso: comunicación asíncrona eficiente, experiencia offline-first, actualizaciones en tiempo real y escalabilidad bajo demanda.

## Tecnologías utilizadas
- **Frontend**: React 18, React Router, Service Worker, Axios, WebSockets
- **Backend**: Node.js, Express, Socket.IO, Mongoose
- **Base de datos**: MongoDB Atlas
- **Pruebas**: Jest (unitarias), Lighthouse (rendimiento/PWA)
- **CI/CD**: GitHub Actions → Vercel / Render

## Instalación y ejecución

### Frontend
```bash
cd frontend
npm install
npm run dev        # http://localhost:3000
npm run build      # para producción
