# Paleta + Tipografías  
**Para un portafolio femenino, elegante y profesional**

---

## Paleta de colores

| Uso                    | Color              | Hex       |
|------------------------|--------------------|-----------|
| Fondo principal        | Crema cálido       | `#F8F4F0` |
| Fondo secundario       | Arena suave        | `#EDE6DF` |
| Texto principal        | Carbón profundo    | `#2C2A29` |
| Texto secundario       | Gris taupe         | `#6B6560` |
| Acento principal       | Rosa empolvado     | `#C9A9A6` |
| Acento secundario      | Terracota suave    | `#B07D6A` |
| Detalle de lujo        | Champagne dorado   | `#C9B8A8` |

### Cómo usarla
- **Fondos**: `#F8F4F0` o `#EDE6DF`
- **Tipografía**: texto principal `#2C2A29`, secundario `#6B6560`
- **Botones / links / acentos**: `#C9A9A6` (hover → `#B07D6A`)
- **Detalles finos** (líneas, iconos, bordes): `#C9B8A8`

---

## Fuentes recomendadas

Alternativas a **Montserrat**, **Lexend** e **IBM Plex** que se sienten frescas y menos “de plantilla”.

| Fuente              | Similar a              | Origen          | Ideal para          | Notas |
|---------------------|------------------------|-----------------|---------------------|-------|
| **Satoshi**         | Montserrat / neo-grotesca premium | Fontshare (gratis) | Títulos y body     | La más elegante y “premium” de las gratuitas |
| **Outfit**          | Montserrat (geométrica) | Google Fonts   | Títulos             | Limpia, moderna y geométrica |
| **Plus Jakarta Sans** | Lexend (legible)     | Google Fonts   | Cuerpo de texto     | Amigable, profesional y muy legible |
| **Manrope**         | Mezcla Montserrat + Lexend | Google Fonts | Títulos y body     | Semi-condensada, moderna y con carácter |
| **Sora**            | Lexend                 | Google Fonts   | Interfaces / body   | Amplia, clara, con toque tecnológico suave |

---

## Pairings recomendados

### Opción favorita
- **Títulos:** Satoshi  
- **Cuerpo:** Plus Jakarta Sans  

Se siente premium, femenina y actual. Satoshi tiene ese “algo” que la diferencia de las tipografías más usadas.

### Alternativa 100% Google Fonts
- **Títulos:** Outfit  
- **Cuerpo:** Plus Jakarta Sans o Manrope  

Más geométrica y limpia. Ideal si querés un look minimalista.

### Nota sobre IBM Plex
IBM Plex Sans sigue siendo excelente. Podés usarla como secundaria o solo para código/detalles técnicos.

---

## Enlaces rápidos

- [Satoshi (Fontshare)](https://www.fontshare.com/fonts/satoshi)
- [Outfit (Google Fonts)](https://fonts.google.com/specimen/Outfit)
- [Plus Jakarta Sans (Google Fonts)](https://fonts.google.com/specimen/Plus+Jakarta+Sans)
- [Manrope (Google Fonts)](https://fonts.google.com/specimen/Manrope)
- [Sora (Google Fonts)](https://fonts.google.com/specimen/Sora)

---
### Recomendaciones:

No usar degrades a menos que tenga movimiento
---

## Valores finales implementados

La paleta original se mantuvo entera, pero **tres colores no podían llevar texto encima**.
Medidos contra el fondo crema `#F8F4F0` con el estándar WCAG AA (mínimo 4.5:1 para
texto normal):

| Color | Contraste | Veredicto |
|---|---|---|
| Carbón `#2C2A29` | 13.05:1 | Texto principal |
| Taupe `#6B6560` | 5.25:1 | Texto secundario |
| Rosa `#C9A9A6` | **1.98:1** | Ilegible como texto |
| Terracota `#B07D6A` | **3.20:1** | Insuficiente para texto normal |
| Champagne `#C9B8A8` | **1.76:1** | Solo líneas y bordes |

Por eso se derivaron variantes más profundas, del mismo tono:

| Token | Hex | Uso | Contraste |
|---|---|---|---|
| `--text` | `#2C2A29` | Texto principal | 13.05:1 |
| `--text-soft` | `#6B6560` | Texto secundario | 5.25:1 |
| `--text-dim` | `#6D6762` | Etiquetas y metadatos | 5.09:1 |
| `--accent` | `#976350` | Links y texto de acento | 4.55:1 |
| `--accent-chip` | `#8C5C4A` | Texto sobre el lavado rosa | 4.51:1 |
| `--accent-solid` | `#A06955` | Fondo de botón con texto blanco | 4.52:1 |
| `--accent-soft` | `#C9A9A6` | Rellenos, nunca texto | — |
| `--rule` | `#C9B8A8` | Líneas finas y bordes | — |

### Modo oscuro

Derivado en la misma familia, sin azules: fondo `#1A1614`, texto `#F2EBE4`,
acento `#E0A88F`. Todos los pares verificados por encima de 4.5:1.

### Tipografías finales

- **Títulos:** Satoshi (Fontshare) — pesos 400/500/700/900
- **Cuerpo:** Plus Jakarta Sans (Google Fonts)
- **Código y etiquetas:** IBM Plex Mono (Google Fonts)

### Sobre los degradados

Se eliminaron todos los decorativos, siguiendo la recomendación del documento.
Solo quedan como máscaras invisibles y en el lavado del fondo del hero, que sí
tiene movimiento lento.

### Verificación

El sitio se audita con un script que recorre cada texto renderizado y compara su
color contra el fondo real heredado. Estado actual: **0 textos por debajo del
mínimo en modo claro y en modo oscuro**.
