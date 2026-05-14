# Paleta de marca editable

La paleta visual de NorthPay ahora se controla desde un unico lugar:

- Archivo base: `src/shared/styles/tokens.css`
- Variables de marca: `--brand-*`

## Que variables editar

En `:root` (y opcionalmente `.dark`) puedes ajustar:

- `--brand-dark`
- `--brand-dark-soft`
- `--brand-dark-soft-hover`
- `--brand-dark-card`
- `--brand-dark-panel`
- `--brand-border`
- `--brand-muted`
- `--brand-muted-soft`
- `--brand-surface-soft`
- `--brand-surface-soft-alt`
- `--brand-mint`
- `--brand-peach`
- `--brand-periwinkle`
- `--brand-gradient-start`
- `--brand-gradient-mid`
- `--brand-gradient-end`

## Como impacta en la UI

Estas variables se exponen en Tailwind como colores `brand-*` mediante `src/shared/styles/theme.css`.

Ejemplos de uso:

- `bg-brand-dark`
- `border-brand-border`
- `text-brand-muted`
- `bg-brand-mint`

Para gradientes:

- `np-brand-gradient` (fondo)
- `np-brand-gradient-text` (texto)

Ambas utilidades viven en `src/shared/styles/base.css`.

## Recomendacion

1. Cambia la paleta en `tokens.css`.
2. Ejecuta `npm run build`.
3. Revisa landing, invite, auth contratista y auth admin para confirmar contraste y coherencia de marca.
