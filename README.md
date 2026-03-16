# Estadísticas de Github (Estilo Pixel)

Generador dinámico de tarjetas de estadísticas para perfiles de GitHub. Creado con Next.js y Satori, renderiza SVGs que puedes descargar.

![Demostración de la Tarjeta](public/MasitasIA.svg)

## Características

- **Estéticas Gamer:** Interfaz oscura, fuente pixelada "BoldPixels" y componentes de Lucide Icons.

- **Renderizado Rápido:** Genera imágenes SVG estáticas y ultraligeras.

- **GraphQL Powered:** Utiliza la API oficial de Github GraphQL para recibir los datos.

## Uso

**Importante:** Recuerda cambiar "[TU_USUARIO]" por tu nombre de usuario de GitHub.

### 1. Lenguajes Top 3
Muestra los 3 lenguajes de programación más utilizados.

**Enlace:**

```md
![Mis Lenguajes](https://github-estadisticas-pixel.vercel.app/api/stats/[TU_USUARIO])
```

**Ejemplo:**

![Mis Lenguajes](https://github-estadisticas-pixel.vercel.app/api/stats/MasitasIA)

### 2. Estadísticas Generales
Muestra las Estrellas, Repositorios, Contribuciones y Peticiones de Pull en tu perfil.

**Enlace:**
```md
![Mis Lenguajes](https://github-estadisticas-pixel.vercel.app/api/stats/[TU_USUARIO]?type=general)
```

**Ejemlo:**

![Mis Estadíscisticas](https://github-estadisticas-pixel.vercel.app/api/stats/MasitasIA?type=general)

---
Hecho por **MasitasIA**. Inspirado en el repositorio de https://github.com/anuraghazra/github-readme-stats