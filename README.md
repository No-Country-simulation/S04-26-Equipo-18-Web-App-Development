# NorthPay – Contractor Onboarding Portal (MVP)

## Objetivo del proyecto
Desarrollar un **portal web de onboarding de contratistas**, que permita reducir el tiempo de activación, centralizar el proceso y dar visibilidad en tiempo real al equipo de operaciones.

Este proyecto se desarrolla como **Simulación laboral en NoCountry**, con un equipo distribuido y metodología **SCRUM**, y tiene como objetivo entregar una **demo funcional de un MVP en 4 semanas**.

---

## Alcance del MVP
El foco del MVP es **demostrar el flujo completo**, priorizando funcionalidad y claridad por sobre la complejidad.

### Portal de Contratistas
- Acceso mediante link de invitación
- Flujo de onboarding secuencial:
  1. Datos personales
  2. Carga de documentos
  3. Firma de contrato
  4. Configuración del método de pago
  5. Estado “Pendiente de verificación”
- Notificaciones ante cambios de estado

### Panel de Operaciones (Admin)
- Listado de contratistas en onboarding
- Visualización del estado de cada etapa
- Revisión de documentación
- Acciones de aprobación o solicitud de correcciones
- Actualización de estados en tiempo real

---

## Usuarios del sistema
- **Contratistas**: completan el proceso de onboarding desde sus dispositivos
- **Operadores internos**: monitorean, revisan y aprueban cada etapa del proceso

---

## Flujo general
1. El contratista accede mediante un link de invitación
2. Completa cada paso del onboarding
3. El sistema cambia el estado a `PENDING_VERIFICATION`
4. El operador revisa la información
5. Se aprueba o solicita corrección
6. El contratista recibe notificación
7. La cuenta queda activada

---

## Stack tecnológico
### Frontend

- Vite
- React 
- TypeScript
- WebSockets (actualizaciones en tiempo real)
- Tailwind CSS (Estilos)
- React Router (Rutas)

Librerías sugeridas (lo vemos en equipo)
- shadcn/ui (UI)
- TanStack Query (Peticiones + server state)
- Zustand (Manejo de estados)
- React Hook Form (Control de formularios)
- Zod (Validaciones de tipos)
- date-fns (Manejo de fechas)

### Backend

- 
- 
- 

---

## 🗂️ Organización del repositorio (Frontend)
Estructura propuesta (sujeta a ajustes en equipo) Featured-Based:

```
src/
 ├─ app/
 │   ├─ router.tsx
 │   ├─ providers.tsx
 │   └─ store.ts
 │
 ├─ features/
 │   ├─ onboarding/
 │   │   ├─ pages/
 │   │   ├─ components/
 │   │   ├─ hooks/
 │   │   ├─ services.ts
 │   │   ├─ types.ts
 │   │   └─ onboarding.slice.ts
 │   │
 │   ├─ admin/
 │   │   ├─ pages/
 │   │   ├─ components/
 │   │   ├─ services.ts
 │   │   └─ types.ts
 │
 ├─ shared/
 │   ├─ ui/
 │   ├─ layout/
 │   ├─ hooks/
 │   ├─ utils/
 │   └─ types/
 │
 ├─ services/
 │   ├─ apiClient.ts
 │   └─ socketClient.ts
 │
 └─ assets/
 ```
