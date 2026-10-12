# Guía del blog de Orientación Militar

Esta guía la sigue quien escriba un artículo, sea una persona o la tarea automática semanal.

## Para quién escribimos

Personas de 18 a 28 años que se van a presentar a Tropa y Marinería (o ya están dentro) y sus familias. Buscan en Google cosas concretas: fechas, plazas, requisitos, pruebas, sueldos, cómo es cada destino. Queremos que lleguen por Google, que la guía les resuelva la duda de verdad y que, si quieren ir más allá, hagan el test, descarguen la checklist o reserven la llamada con un exmilitar.

## Reglas de veracidad (las más importantes)

- Cada dato concreto (cifras, fechas, porcentajes, requisitos, sueldos, nombres de unidades, marcas de pruebas físicas) tiene que salir de una fuente que hayas leído en esta misma sesión. Si no puedes verificarlo, no lo pongas.
- Fuentes preferentes: BOE, reclutamiento.defensa.gob.es, defensa.gob.es, ejercito.defensa.gob.es, armada.defensa.gob.es, ejercitodelaire.defensa.gob.es, lamoncloa.gob.es, guardiacivil.es, policia.es. La prensa y las academias sirven como apoyo, nunca como única fuente de una cifra importante si existe la oficial.
- Di siempre a qué convocatoria o año se refiere cada dato («en la convocatoria de 2026…»).
- Prohibido: inventar testimonios, citas o experiencias personales («cuando yo estaba en…»), hablar como si fuéramos militares en activo o el Ministerio, garantizar plazas o resultados, decir que un destino es «el mejor», dar consejos médicos o legales personalizados, mencionar a la competencia por su nombre.
- Si un tema necesita datos que no encuentras, elige otro tema de la lista y deja una nota en temas.md.

## Formato del archivo

Un archivo por artículo en `contenido/blog/<slug>.html`. El slug va en minúsculas, sin tildes y con guiones, y contiene la búsqueda principal (ej. `pruebas-fisicas-tropa-y-marineria.html`).

El archivo empieza con este bloque de datos:

```
<!--
titulo: Pruebas físicas de Tropa y Marinería: las cuatro pruebas y sus marcas
descripcion: Qué pruebas físicas hay en Tropa y Marinería desde 2026, qué marcas se piden y cómo prepararlas con tiempo antes de tu cita.
fecha: 2026-10-20
categoria: Pruebas
fuentes:
- Título de la fuente oficial | https://...
- Otra fuente | https://...
-->
```

- `titulo`: 65 caracteres como máximo, con la búsqueda principal al principio.
- `descripcion`: entre 120 y 160 caracteres. Dice qué va a encontrar el lector.
- `fecha`: el día de publicación (AAAA-MM-DD). Una fecha futura deja el artículo programado.
- `actualizado`: opcional. Ponlo cuando revises un artículo ya publicado.
- `categoria`: una de: Convocatorias, Plazas y destinos, Pruebas, Unidades, Carrera y salidas, Vida militar.
- `borrador: si` para que no se publique.

Después va el cuerpo en HTML sencillo. Etiquetas permitidas: `p`, `h2`, `h3`, `ul`, `ol`, `li`, `strong`, `em`, `a`, `table`, `thead`, `tbody`, `tr`, `th`, `td`, `blockquote` y `<div class="nota">` para un aviso destacado. Nada de `h1` (lo pone la plantilla), imágenes, estilos ni scripts.

## Cómo se escribe

- Entre 900 y 1.500 palabras, con al menos 3 secciones `h2`. Los `h2` son preguntas o frases que la gente busca.
- Empieza respondiendo la duda en los dos primeros párrafos. Nada de introducciones de relleno.
- Habla de tú. Frases cortas y palabras normales. Sin emojis, sin mayúsculas para enfatizar, sin «TODO lo que necesitas saber», sin «en conclusión».
- Usa listas y tablas cuando ayuden a comparar (fechas, plazas, marcas).
- Enlaza 1 a 3 artículos del propio blog si vienen al caso (`/blog/<slug>/`) y, de forma natural, el test (`/#test`) o la checklist (`/#precios`). La plantilla ya añade los botones de reserva.
- Termina con algo útil: qué hacer ahora, qué preguntar, qué comprobar.

## Cómo se publica

1. Escribe el archivo en `contenido/blog/`.
2. Ejecuta `python3 herramientas/construir.py`. Tiene que terminar con 0 errores. Corrige también los avisos de longitud.
3. Marca el tema como hecho en `herramientas/temas.md`, con la fecha.
4. Haz commit y push a la rama `web`. Netlify publica solo.

## Actualizar artículos

Cuando salga una convocatoria nueva o cambie algo oficial (plazas, fechas, pruebas, requisitos), revisa los artículos afectados, cambia los datos, añade la fuente nueva y pon `actualizado:` con la fecha del día. Actualizar un artículo bueno vale más que publicar uno nuevo.
