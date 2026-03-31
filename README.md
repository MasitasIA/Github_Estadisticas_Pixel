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

### 2. Barra de Lenguajes (Max 10)

Muestras hasta los 10 lenguajes que más contribuyen a tu perfil.

**Enlace:**

```md
![Mis Lenguajes/Barra](https://github-estadisticas-pixel.vercel.app/api/stats/[TU_USUARIO]?type=bar)
```

**Ejemplo:**

![Mis Lenguajes/Barra](https://github-estadisticas-pixel.vercel.app/api/stats/MasitasIA?type=bar)

### 3. Estadísticas Generales

Muestra las Estrellas, Repositorios, Contribuciones y Peticiones de Pull en tu perfil.

**Enlace:**

```md
![Mis Estadísticas](https://github-estadisticas-pixel.vercel.app/api/stats/[TU_USUARIO]?type=general)
```

**Ejemlo:**

![Mis Estadísticas](https://github-estadisticas-pixel.vercel.app/api/stats/MasitasIA?type=general)

---

Hecho por **MasitasIA**. Inspirado en el repositorio de https://github.com/anuraghazra/github-readme-stats
