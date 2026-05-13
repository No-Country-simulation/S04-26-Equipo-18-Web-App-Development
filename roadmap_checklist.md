# Roadmap Checklist - NorthPay MVP

Ultima revision: 2026-05-13

## Como leer este checklist
- [x] Completado
- [~] Parcial / demo (funciona en UI, falta integracion real)
- [ ] Pendiente

## 1) Base del proyecto (Frontend)
- [x] Proyecto Vite + React + TypeScript levantado
- [x] Estructura feature-based creada (`onboarding`, `admin`, `contractor`, `shared`)
- [x] Enrutado principal con React Router
- [x] Layout publico y layout admin
- [x] Sistema de estilos con Tailwind v4 + componentes UI
- [x] README y docs base alineados al estado actual

## 1.1) Decisiones de producto (MVP)
- [x] Flujo confirmado: link de invitacion -> registro/login -> onboarding
- [x] Onboarding protegido por sesion de contractor en rutas

## 2) Portal de contratistas (MVP)
- [x] Entrada por link de invitacion (`/invite/:token`)
- [~] Validacion de token de invitacion (actualmente demo por formato/token mock)
- [x] Pantalla de auth de contratista (registro/login)
- [x] Dashboard de contratista con estado y documentos
- [~] Sesion de contratista (actualmente localStorage, sin backend)

### Flujo secuencial onboarding
- [x] Paso 1: Datos personales (UI + validaciones basicas)
- [x] Paso 2: Carga de documentos (UI)
- [x] Paso 3: Firma de contrato (UI)
- [x] Paso 4: Metodo de pago (UI)
- [~] Paso 5: Estado "Pendiente de verificacion" (visual en wizard, no persistido en backend)
- [~] Navegacion secuencial con bloqueo por paso previo (resuelta en estado local)

## 3) Panel de operaciones (Admin)
- [x] Login admin (modo demo)
- [x] Dashboard con metricas y tabla de contratistas
- [x] Filtro por estado en listado
- [x] Vista detalle del contratista
- [x] Visualizacion de documentos y progreso de pasos
- [~] Acciones de aprobar/rechazar/solicitar correcciones (actualmente placeholders)
- [~] Centro de notificaciones admin (datos estaticos)
- [~] Pantalla de settings (estructura UI lista, sin logica persistente)

## 4) Tiempo real y notificaciones
- [ ] WebSockets integrados
- [ ] Actualizacion de estados en tiempo real
- [ ] Notificaciones reales por cambio de estado (contratista/admin)
- [ ] Sincronizacion multiusuario de cambios operativos

## 5) Datos, servicios y estado
- [x] Capa de acceso a datos centralizada (repositorio + hooks)
- [~] Datos mock persistidos localmente (localStorage) listos para reemplazar por API
- [ ] Cliente API (axios/fetch) centralizado
- [~] Servicios reales por feature (`onboarding/services.ts`, `admin/services.ts`) (pendiente conectar backend)
- [~] Manejo de estado server/client robusto (ej. TanStack Query + store global) (base de hooks implementada)
- [x] Persistencia local del progreso de onboarding entre vistas

## 5.1) Handoff para equipo frontend
- [x] Guia de arquitectura frontend backend-ready (`docs/frontend-architecture.md`)
- [x] Draft de contrato frontend-backend (`docs/api-contract-frontend-backend.md`)
- [x] Checklist de PR para alineacion del equipo (`docs/frontend-pr-checklist.md`)

## 6) Librerias del stack (estado)
- [x] Tailwind CSS
- [x] date-fns (uso puntual)
- [x] Componentes de UI estilo shadcn
- [ ] TanStack Query
- [ ] Zustand
- [ ] React Hook Form
- [ ] Zod
- [ ] WebSocket client real

## 7) Backend e integracion
- [ ] Definir stack backend
- [ ] Endpoints de invitacion/auth
- [ ] Endpoints de onboarding (pasos, documentos, contrato, pago)
- [ ] Endpoints admin (listado, revision, aprobacion/correcciones)
- [ ] Modelo de estados y auditoria

## 8) QA y release
- [ ] Tests unitarios
- [ ] Tests de integracion
- [ ] Flujo E2E principal (invite -> onboarding -> revision admin -> resultado)
- [ ] Validaciones de UX responsive y accesibilidad
- [ ] Checklist de deploy demo

## 9) Prioridad recomendada (proximos pasos)
- [ ] P1: Conectar `services.ts` a una API mock real (MSW/JSON server o backend inicial)
- [ ] P1: Reemplazar placeholders de acciones admin por mutaciones reales
- [x] P1: Persistir avance de onboarding por contratista (resuelto en capa local)
- [ ] P2: Integrar notificaciones reales + canal en tiempo real
- [ ] P2: Incorporar React Hook Form + Zod en pasos de formularios
- [ ] P3: Agregar TanStack Query para cache, loading y reintentos
- [ ] P3: Armar smoke tests E2E del flujo MVP

## 10) Definicion de "MVP demo listo"
- [ ] Contratista entra con invitacion real y completa los 4 pasos
- [ ] Sistema deja estado en pending verification de forma persistente
- [ ] Admin revisa, aprueba o solicita correcciones y el estado cambia
- [ ] Ambas vistas ven los cambios reflejados sin recargar
- [ ] Flujo completo demostrable de punta a punta en entorno demo
