# PROYECTO CHEFCITO — División de Tareas y Flujo de Trabajo

## Equipo

| Dev | Integrante |
|---|---|
| Dev A | Guerrina, Stéfano |
| Dev B | Alí, Elías |
| Dev C | Persig, Juan Andrés |
| Dev D | Schujman, Gastón Enrique |

---

## Flujo de Git (trabajo asíncrono)

Para que las 4 personas puedan laburar en paralelo sin pisarse:

**Ramas:**
- `main` → versión estable, solo se mergea al cerrar cada fase (entrega).
- `develop` → rama de integración, acá van todos los merges de tareas.
- `feature/T-X.X-nombre-corto` → una rama por task, creada desde `develop`.
  - Ej: `feature/T-2.2-crud-ingredientes`

**Commits:**
- Formato: `[T-X.X] descripción corta en imperativo`
  - Ej: `[T-3.2] agregar formulario dinámico de pasos`
- Commits chicos y frecuentes, no un commit gigante al final de la tarea.

**Pull Requests:**
- Al terminar una task, PR de `feature/T-X.X-...` → `develop`.
- Mínimo 1 revisión/aprobación de otro integrante antes de mergear (así todos ven el código de los demás).
- `develop` → `main` solo en las fechas de entrega de cada fase.

**Dependencias entre fases:**
- La Fase 1 (infra + DB + arquitectura) bloquea a todos, así que se termina primero y recién ahí arrancan en paralelo las Fases 2 en adelante.
- Dentro de cada fase, las 4 tareas son independientes entre sí (por eso están separadas por dev), así que no deberían necesitar esperarse mutuamente salvo por entidades compartidas (ver notas al pie de cada fase).

---

## FASE 1: Infraestructura y Base de Datos

| Task-ID | Módulo | Descripción | Responsable |
|---|---|---|---|
| T-1.1 | Infraestructura | Configurar repositorios (Front/Back). Definir rama `main` y `develop`. | Dev A |
| T-1.2 | Base de Datos | Traducir el DER final a código SQL. Crear tablas, claves foráneas y conectarlo a Node.js | Dev B |
| T-1.3 | Autenticación | Implementar login/registro en backend, y manejo de sesión/tokens en frontend. | Dev C |
| T-1.4 | Arquitectura | Configurar enrutadores base en Express y estructura de carpetas/rutas base en React | Dev D |

> ⚠️ Esta fase es bloqueante: nadie puede arrancar Fase 2 en serio hasta que T-1.2 (esquema de DB) y T-1.4 (estructura base) estén al menos en un estado usable en `develop`.

---

## FASE 2: Alcance Mínimo - Entidades Base

| Task-ID | Módulo | Descripción | Responsable |
|---|---|---|---|
| T-2.1 | Usuarios | CRUD de User (perfil, actualización de datos, roles) | Dev A |
| T-2.2 | Ingredientes | CRUD de IngredientCategory e Ingredient + entidad NutritionalValue | Dev B |
| T-2.3 | Categorías | CRUD de Category (Recipe) | Dev C |
| T-2.4 | UI/UX Base | Layout principal, Navbar, Sidebar y estilos globales del proyecto | Dev D |

---

## FASE 3: Alcance Mínimo - Core del Negocio

| Task-ID | Módulo | Descripción | Responsable |
|---|---|---|---|
| T-3.1 | Recetas (Base) | CRUD principal de Recipe (creación, listado básico, vinculación con RecipeCategory y creador vía `creates`) | Dev A |
| T-3.2 | Recetas (Datos) | Gestión de RecipeIngredient y Step (formularios dinámicos en React para agregar múltiples pasos/ingredientes) | Dev B |
| T-3.3 | Media | Subida de archivos y endpoints para Image. Galería en React | Dev C |
| T-3.4 | Valoraciones | CRUD de Review (crear reseña, listar en detalle de receta, calcular promedio) | Dev D |

> T-3.2 depende de que T-3.1 tenga la entidad Recipe funcionando (aunque sea básica) en `develop`.

---

## FASE 4: Alcance Adicional - Lógica Avanzada

| Task-ID | Módulo | Descripción | Responsable |
|---|---|---|---|
| T-4.1 | Inventario | CRUD de Inventory (el usuario carga lo que tiene en su heladera) | Dev A |
| T-4.2 | Motor Búsqueda | Endpoint complejo: cruzar Inventory vs RecipeIngredient y renderizar listado de coincidencias en React | Dev B |
| T-4.3 | Financiero | Entidad Donation. Endpoints de registro de pago y simulación de transacción en frontend | Dev C |
| T-4.4 | Filtros UI | Listados avanzados: filtrar por tiempo, valoración, necesidades nutricionales; guardar recetas (UserRecipe); recomendaciones (RecommendedRecipes) | Dev D |

> T-4.2 depende de T-4.1 (necesita Inventory ya cargado).

---

## FASE 5: IA y Cierre

| Task-ID | Módulo | Descripción | Responsable |
|---|---|---|---|
| T-5.1 | Integración IA | Conectar API de LLM (ej. Gemini) en Node.js. Endpoint que reciba el inventario del usuario y devuelva un prompt procesado | Dev A |
| T-5.2 | Interfaz Chat | Componente de chat en React, manejo de estado conversacional y parseo de respuesta del backend | Dev B |
| T-5.3 | QA & Fixes | Pruebas de integración, resolución de bugs de interfaz (Frontend) | Dev C |
| T-5.4 | QA & Fixes | Optimización de queries complejas, saneamiento de errores (Backend) | Dev D |

---

## Resumen de carga por dev

Cada dev tiene exactamente **5 tareas** (una por fase), manteniendo la carga pareja a lo largo de todo el proyecto:

- **Dev A**: T-1.1, T-2.1, T-3.1, T-4.1, T-5.1
- **Dev B**: T-1.2, T-2.2, T-3.2, T-4.2, T-5.2
- **Dev C**: T-1.3, T-2.3, T-3.3, T-4.3, T-5.3
- **Dev D**: T-1.4, T-2.4, T-3.4, T-4.4, T-5.4
