# Lista de control de PR Frontend (Listo para Backend)

Usar esta lista de control antes de hacer merge de cambios de frontend.

## Arquitectura
- [ ] No hay `fetch`/`axios` directo en pages/components.
- [ ] No hay acceso directo a `localStorage` fuera de repositorio/session.
- [ ] La UI consume hooks, no fuentes de datos directas.
- [ ] Se respeta separacion UI <-> hooks <-> capa de datos.

## Contratos y tipos
- [ ] Tipos de dominio actualizados.
- [ ] Contratos DTO/API actualizados si aplica.
- [ ] No se mezclan tipos de backend crudos en componentes.

## Estados UX
- [ ] Hay manejo de `loading`.
- [ ] Hay manejo de `error`.
- [ ] Hay manejo de estado vacio cuando corresponde.

## Flujo contractor
- [ ] Se respeta flujo: invitation -> auth -> onboarding.
- [ ] No existe bypass publico al onboarding sin sesion.
- [ ] Progreso de onboarding se persiste correctamente.

## Flujo admin
- [ ] Listado/Detalle no rompen con datos incompletos.
- [ ] Acciones admin no dejan estado inconsistente.

## Calidad
- [ ] `npm run build` pasa en local.
- [ ] No se rompieron rutas existentes.
- [ ] No se agrego codigo muerto o imports sin uso.

## Documentacion
- [ ] Se actualizo `roadmap_checklist.md` si cambia estado de tareas.
- [ ] Se actualizo `README.md` o `docs/*` si cambia arquitectura/flujo.
