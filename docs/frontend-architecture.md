# Guia de Arquitectura Frontend

## Objetivo
Dejar el frontend desacoplado de backend para que el equipo pueda conectar API/database sin reescribir UI.

## Principios
- UI (pages/components) no conoce endpoints ni `localStorage`.
- La data se consume solo via hooks y repositorios.
- Los repositorios pueden tener implementacion local o remota con la misma interfaz.
- Si cambia backend, se modifica el adaptador, no las pantallas.

## Capas actuales
1. Capa UI
- `frontend/src/features/**/pages`
- `frontend/src/features/**/components`

2. Capa de Hooks
- `frontend/src/shared/hooks/useContractorsData.ts`
- Expone estado y operaciones para UI.

3. Capa de Repositorio
- `frontend/src/shared/data/contractorsRepository.ts`
- Fuente unica de verdad en frontend.

4. Capa de Sesion
- `frontend/src/features/contractor/session.ts`
- Maneja la sesion contractor.

## Reglas de equipo (obligatorias)
1. No importar `@/app/store` desde UI nueva.
2. No usar `fetch`/`axios` directo en pages/components.
3. No usar `localStorage` directo fuera de repositorios/session.
4. Toda mutacion debe vivir en hooks/repositorios.
5. Cada flujo nuevo debe exponer loading/error/success.

## Patron para migrar a backend
1. Mantener firma de metodos de repositorio.
2. Reemplazar implementacion local por HTTP en repositorio.
3. Mantener los mismos hooks hacia UI.
4. Agregar mapper DTO -> modelo UI si backend cambia nombres/campos.

## Estructura recomendada (siguiente iteracion)
- `frontend/src/shared/api/client.ts`
- `frontend/src/shared/api/contracts/`
- `frontend/src/shared/data/contractorsRepository.ts` (interface + factory)
- `frontend/src/shared/data/contractorsRepository.local.ts`
- `frontend/src/shared/data/contractorsRepository.http.ts`

## Criterio de "Listo" para conectar backend
- Existe contrato de endpoints y payloads.
- Existe convencion de errores.
- Existe estrategia de auth (token/session/cookies).
- Existe regla de estados de onboarding y transiciones.

## Antipatrones a evitar
- Hardcodear URLs en componentes.
- Duplicar logica de negocio en varias pantallas.
- Mezclar DTO de backend con tipos de UI sin mapper.
- Resolver permisos/seguridad solo en frontend.
