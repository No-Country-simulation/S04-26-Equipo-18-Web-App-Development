# Contrato API - Frontend <-> Backend (Borrador)

## Objetivo
Definir contrato minimo para que frontend pueda integrarse sin friccion cuando backend este listo.

## Convenciones generales
- Base URL: `${API_BASE_URL}`
- Content-Type: `application/json`
- Fechas en ISO 8601 UTC
- IDs como `string`

## Estructura de error estandar
```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Mensaje entendible",
    "details": {}
  }
}
```

## 1) Invitaciones / Autenticacion

### Validar invitacion
- `POST /v1/invitations/validate`

Solicitud:
```json
{
  "token": "NORTH-2024-ABC123"
}
```

Respuesta:
```json
{
  "invitationId": "inv_123",
  "email": "ana.silva@email.com",
  "status": "VALID"
}
```

### Registro de contratista
- `POST /v1/contractors/register`

Solicitud:
```json
{
  "invitationToken": "NORTH-2024-ABC123",
  "email": "ana.silva@email.com",
  "password": "******"
}
```

Respuesta:
```json
{
  "contractorId": "ctr_123",
  "email": "ana.silva@email.com",
  "session": {
    "accessToken": "jwt_or_session_token",
    "expiresAt": "2026-05-20T10:00:00.000Z"
  }
}
```

### Inicio de sesion de contratista
- `POST /v1/contractors/login`

## 2) Datos del contratista

### Obtener contratista por sesion
- `GET /v1/contractors/me`

### Listar documentos del contratista
- `GET /v1/contractors/me/documents`

### Subir/reemplazar documento
- `POST /v1/contractors/me/documents`
- multipart/form-data

### Guardar datos personales
- `PUT /v1/contractors/me/personal-data`

### Firmar contrato
- `POST /v1/contractors/me/contract/sign`

### Guardar metodo de pago
- `PUT /v1/contractors/me/payment-method`

## 3) Estado de onboarding

### Obtener estado de onboarding
- `GET /v1/onboarding/me`

Respuesta:
```json
{
  "currentStep": "documents",
  "completedSteps": ["personal-data"],
  "status": "in-progress",
  "lastUpdatedAt": "2026-05-13T12:00:00.000Z"
}
```

### Actualizar estado de onboarding
- `PATCH /v1/onboarding/me`

Solicitud:
```json
{
  "currentStep": "contract",
  "completedSteps": ["personal-data", "documents"],
  "status": "in-progress"
}
```

## 4) Administracion

### Listar contratistas
- `GET /v1/admin/contractors?status=pending-verification`

### Obtener detalle de contratista
- `GET /v1/admin/contractors/:contractorId`

### Aprobar contratista
- `POST /v1/admin/contractors/:contractorId/approve`

### Rechazar contratista
- `POST /v1/admin/contractors/:contractorId/reject`

Solicitud:
```json
{
  "reason": "Falta documento fiscal"
}
```

### Solicitar correcciones
- `POST /v1/admin/contractors/:contractorId/request-corrections`

## 5) Tiempo real (futuro)

### Eventos sugeridos
- `onboarding.status.changed`
- `onboarding.document.reviewed`
- `admin.notification.created`

Canal sugerido:
- WebSocket o SSE con token de autenticacion.

## Criterios de aceptacion frontend
- Los endpoints responden con las claves acordadas.
- La estructura de error es estable.
- Los valores de estado coinciden con el enum del frontend.
- Los campos de fecha son strings ISO.
