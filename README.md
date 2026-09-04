# Portafolio · Maria Mercedes Atim

Portafolio personal de **Maria Mercedes Atim**, desarrolladora full stack.
Sitio estático, sin frameworks ni proceso de build: se abre `index.html` y funciona.

🔗 **[Ver el sitio](https://meratim.github.io/Portafolio2025/)** · [LinkedIn](https://www.linkedin.com/in/mariamercedesatim-dev/) · [GitHub](https://github.com/MerAtim)

---

## Qué incluye

| Sección | Contenido |
|---|---|
| Inicio | Presentación, stack resumido y accesos de contacto |
| Experiencia | Pasantía full stack, coordinación como Scrum Master y proyectos en equipo |
| Proyectos | 4 destacados con detalle técnico + 4 académicos |
| Logros | Situaciones técnicas concretas resueltas en proyectos reales |
| Stack | Tecnologías agrupadas por área |
| Formación | Título universitario, certificaciones e inglés C1, con diplomas |
| Contacto | Datos directos y formulario funcional |
| CV | Descargable en PDF, en español e inglés |

## Stack del sitio

- **HTML5** semántico, sin dependencias de build
- **CSS3** con variables de diseño, grid y flexbox
- **JavaScript** vanilla (sin librerías): idioma ES/EN, tema claro/oscuro, modales, scrollspy y animaciones al scroll
- **Font Awesome** y **Google Fonts** por CDN
- **Formspree** para el formulario de contacto

## Detalles de implementación

- **Español e inglés**: el sitio entero se traduce sin recargar. El español vive en `index.html` y el inglés en `js/i18n.js`, con las mismas claves `data-i18n`. Por defecto usa el idioma del navegador y recuerda la elección.
- **Tema claro y oscuro**: respeta la preferencia del sistema y permite elegir manualmente; la elección se guarda en `localStorage` y se aplica antes del primer pintado para evitar parpadeo.
- **Accesibilidad**: enlace para saltar al contenido, foco visible, `aria-label` en controles y modales cerrables con `Escape`.
- **Responsive**: adaptado a escritorio, tablet y móvil, sin desbordamiento horizontal.
- **Movimiento reducido**: se respeta `prefers-reduced-motion`.
- **Impresión**: hoja de estilos que limpia la página para imprimirla o guardarla en PDF.

## Estructura

```
Portafolio2025/
├── index.html          Todo el contenido del sitio
├── css/style.css       Estilos y sistema de diseño
├── js/scripts.js       Interacciones
├── js/i18n.js          Traducciones al inglés
├── cv/                 Fuente HTML del CV (se exporta a PDF)
├── assets/             Foto, diplomas y CV en PDF
└── README.md
```

## Uso local

No requiere instalación. Se puede abrir `index.html` directamente o servirlo:

```bash
python -m http.server 8000
# luego abrir http://localhost:8000
```

## Cómo editar el contenido

- **Agregar un proyecto destacado**: duplicar un `<article class="pcard">` dentro de `.projects--featured` y, si lleva ficha ampliada, crear un `<template id="pd-nombre">` y apuntar el botón con `data-project="nombre"`.
- **Agregar un diploma**: dejar la imagen en `assets/` y sumar un botón `<button class="cert-btn js-image" data-src="./assets/archivo.png" data-alt="...">`.
- **Agregar una tecnología**: sumar un `<span class="chip">` en la tarjeta correspondiente de la sección Stack.
- **Traducir un texto nuevo**: ponerle `data-i18n="clave"` al elemento en `index.html` y agregar esa misma clave con su texto en inglés en `js/i18n.js`.

## Regenerar el CV

El CV se escribe en HTML (`cv/cv-es.html` y `cv/cv-en.html`) y se exporta a PDF. Está pensado
para ATS: una sola columna, sin tablas ni imágenes, con encabezados estándar y texto
seleccionable. Para regenerarlo después de editarlo, abrí el HTML en el navegador e imprimí
a PDF sobre `assets/CV-Maria-Mercedes-Atim-ES.pdf` (o `-EN.pdf`).

---

© 2026 Maria Mercedes Atim
