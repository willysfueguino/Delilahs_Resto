## Curso de Desarrollo Web Backend de Acámica

#### Descripción

Sprint Project Nº4 del curso de Back End. (Mi APP Full!)

#### Instrucciones de verificación de configuración y ejecución desde AWS:

1. Iniciar sesión siguiendo el link `Console Login Link` desde el archivo `TechReviewer.csv`, utilizando el nombre de usuario y la contraseñas provistas en el archivo zip.
2. En la barra de herramientas a la izquierda de la página de EC2, desplazar el cursor hacia abajo hasta la sección "Auto Scaling" y hacer click en `Grupos de Auto Scaling`.
3. Hacer click en el grupo `DelilahsAuto`.
4. Hacer click en el botón `Editar` en el margen superior derecho.
5. Cambiar la capacidad deseada y minima de instancias al valor deseado (máximo 3 instancias).
6. Esperar unos 120 segundos a que inicien las instancias (se puede corroborar el estado de las mismas en la pestaña `Administración de instancias`)
7. El nombre de dominio de la Api es `delilahs-resto.ml` (subdominio registrado es www ).
8. Se incluye en el repositorio y en el archivo zip, la collección de Postman que se usó para hacer los tests de cada uno de los endpoints correspondientes, separados por categorías (Medios de Pago, Usuarios, etc.)

#### Instrucciones de instalación y ejecución de modo local usando Docker y Docker Compose:

1. Descomprimir el archivo zip.
2. Abrir una consola en el directorio donde se descomprimió el archivo (Debe estar a la vista en el navegador de archivos el archivo Dockerfile).
3. Ejecutar el comando `docker build -t delilahs-resto-img .` para crear la imagen de la aplicación que usará Docker Compose.
4. Ejecutar el comando `docker-compose up --remove-orphans`. **Se debe contar con una conexión a internet durante este paso** ya que se descargarán las imagenes de Redis y Mongo que se usarán de base para manipular datos y caché.
5. Modificar el archivo `.env.docker.example` para configurar las variables de entorno que se usarán.
6. Detener el servicio de `redis-server` y `mongod` para que la aplicación funcione correctamente.
7. Ejecutar el comando `docker-compose up`.
---
