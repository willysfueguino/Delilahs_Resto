# Delilahs Resto API 
### Instrucciones de verificación de configuración y ejecución desde AWS:

1. Iniciar sesión siguiendo el link `Console Login Link` desde el archivo `TechReviewer.csv`, utilizando el nombre de usuario y la contraseñas provistas en el archivo zip.
2. En la barra de herramientas a la izquierda de la página de EC2, desplazar el cursor hacia abajo hasta la sección "Auto Scaling" y hacer click en `Grupos de Auto Scaling`.
3. Hacer click en el grupo `DelilahsAuto`.
4. Hacer click en el botón `Editar` en el margen superior derecho.
5. Cambiar la capacidad deseada y minima de instancias al valor deseado (máximo 3 instancias).
6. Esperar unos 120 segundos a que inicien las instancias (se puede corroborar el estado de las mismas en la pestaña `Administración de instancias`)
7. El nombre de dominio de la Api es `delilahs-resto.ml` (subdominio registrado es www ).
8. Se incluye en el repositorio y en el archivo zip, la collección de Postman que se usó para hacer los tests de cada uno de los endpoints correspondientes, separados por categorías (Medios de Pago, Usuarios, etc.)

### Instrucciones de instalación y ejecución de modo local usando Docker y Docker Compose:

1. Descomprimir el archivo zip. **Alternativamente puede ejecutar el comando `git clone https://github.com/willysfueguino/Delilahs_Resto.git` desde una consola.
2. Abrir una consola en el directorio donde se descomprimió el archivo (Debe estar a la vista en el navegador de archivos el archivo Dockerfile).
3. Modificar el archivo `.env.docker.example` para configurar las variables de entorno que se usarán.
4. Ejecutar el comando `docker build -t delilahs-resto-img .` para crear la imagen de la aplicación que usará Docker Compose.
6. Modificar el archivo `docker-compose.yml` de ser necesario para modificar variables de entorno.
6. Detener el servicio de `redis-server` y `mongod` para que la aplicación funcione correctamente.
7. Ejecutar el comando `docker-compose up`.

### Instrucciones para verificar el funcionamiento de la API a través de Postman:

**NOTA: Si se ejecutan las pruebas de modo local, primerp se debe instalar y ejecutar la API a través de Docker Compose.**
1. Abrir Postman
2. Hacer click en `File > Import`
3. En la carpeta donde descomprimió o clonó el repositorio, en la carpeta `Postman tests`, elija el archivo a importar (hay 2 archivos, uno llamado `Delilahs Resto CLOUD` para probar la versión online de la api, y otro llamado `Delilahs Resto LOCALHOST` para hacer pruebas de forma local).
4. Ejecutar las pruebas correspondientes, *verificando* los parametros pasados en el body y el header de los request.

### Instrucciones para verificar el funcionamiento de la API a través de Swagger:
**NOTA: Si se ejecutan las pruebas de modo local, primerp se debe instalar y ejecutar la API a través de Docker Compose.**
1. Abrir el navegador web.
2. a) Si se ejecutan las pruebas de modo local, dirigirse a `http://localhost:APP_PORT/api-docs` (donde APP_PORT es el puerto definido en `.env.docker` y en el archivo `docker-compose.yml`)
3. Para probar correctamente los endpoints, se debe ejecutar primero el endpoint `http://localhost:APP_PORT/api-docs/#/Usuarios/post_api_auth_signin` (Las credenciales de ejemplo son las del usuario administrador para poder comprobar correctamente los endpoints que requieren privilegios de administrador).
4. Luego de loguearse, copiar el token recibido desde el backend (sin las comillas).
5. Hacer click en la parte superior derecha de la página, en el botón "Authorize" (tiene una imagen de un candado). Se abrirá un cuadro de diálogo.
6. En la casilla de texto "Value", pegar el token recibido sin las comillas, luego hacer click en "Authorize". Ejemplo de Token: `eyJhbGciOiJIUzI1Nig5HnR5cCI6IkpXVCJ9.eyJ1aWQiOnsiZW1haWwiOiJhZG1AYWR5H5wicGFzcyI6IkRlTGlMYUhzIn0sImlhdCI6MTY1MDA3NDc2NiwiZXhwIjoxNjUwMDg5MTY2fQ.zxkhymxF2DD3JZikVi6sQfsVmdY60RmhIcVPic4lOL`
7. Divertirse probando la API! 

