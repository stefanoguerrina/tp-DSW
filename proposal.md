# Propuesta TP DSW

## Grupo
### Integrantes
* 54394 - Alí, Elías
* 54653 - Guerrina, Stéfano
* 54780 - Persig, Juan Andrés
* 54323 - Schujman, Gastón Enrique

### Repositorios
* [frontend app](http://hyperlinkToGihubOrGitlab)
* [backend app](http://hyperlinkToGihubOrGitlab)
*Nota*: si utiliza un monorepo indicar un solo link con fullstack app.

## Tema
### Descripción
Aplicación web orientada a facilitar la planificación y elección de comidas a partir de los ingredientes disponibles y las necesidades nutricionales del usuario. Combina la asistencia personalizada de un ChatBot IA con un formato estilo red social para crear, guardar y reseñar recetas.


### Modelo
<img width="1581" height="705" alt="CHEFCITO" src="https://github.com/user-attachments/assets/37b77532-08e3-413b-95db-cb90089d3c1e" />

<br>https://drive.google.com/file/d/1qhVu1HhclK_4AcHlgWWReyOWdjftukHB/view

## Alcance Funcional 

### Alcance Mínimo

Regularidad:
|Req|Detalle|
|:-|:-|
|CRUD simple|1. CRUD Usuario<br>2. CRUD Categoria-Ingrediente<br>3. CRUD Receta<br>4. CRUD Categoria-Receta|
|CRUD dependiente|1. CRUD Valoración {depende de} CRUD Usuario y CRUD Receta<br>2. CRUD Ingrediente {depende de} CRUD Categoria-Ingrediente|
|Listado<br>+<br>detalle| 1. Listado de recetas filtrado por categoría, muestra nombre y descripción de receta => detalle CRUD Receta<br> 2.  Listado de recetas filtrado por valoración, muestra nombre, descripción, valoración de la receta y nombre del creador de la receta => detalle muestra datos completos de la receta y del creador|
|CUU/Epic|1. Crear y publicar recetas<br>2. Reseñar recetas de otros usuarios|


Adicionales para Aprobación
|Req|Detalle|
|:-|:-|
|CRUD |1. CRUD Usuario<br>2. CRUD Categoria-Ingrediente<br>3. CRUD Receta<br>4. CRUD Categoria-Receta<br>5. CRUD Valoración<br>6. CRUD Ingrediente|
|CUU/Epic|1. Crear y publicar recetas<br>2. Reseñar recetas de otros usuarios<br>3. Consultar recetas en base a ingredientes<br>4. Brindar asistencia personalizada (ChatBot)|


### Alcance Adicional Voluntario

|Req|Detalle|
|:-|:-|
|Listados | AGREGAR |
|CUU/Epic | AGREGAR |
|Otros | AGREGAR |

