# specify the node base image with your desired version node:<version>
FROM node:alpine
WORKDIR /app
COPY . .

# Environment Variables
ENV $ JWT_SECRET_KEY 
ENV $ JWT_EXPIRES_IN
ENV $ APP_PORT

# Variables asociadas a la base de datos
ENV $ DB_USER
ENV $ DB_PASSWORD
ENV $ DB_HOST
ENV $ DB_NAME

# Variables asociadas a Redis
ENV $ REDIS_HOST
#=localhost
ENV $ REDIS_PORT
#=6379

#Variables asociadas a proveedores de Identidad
ENV $ AUTH0_DOMAIN

ENV $ AUTH0_CLIENT_ID

ENV $ AUTH0_CLIENT_SECRET

#Inicializado de server
EXPOSE ${APP_PORT}
#Initial commands for the container
#RUN npm install -g nodemon
RUN npm install
#RUN apk --update add redis
RUN npm audit fix
CMD ["npm", "start"]
#RUN nodemon ./api/app.js

# FROM python:3.7-alpine


# ENV FLASK_RUN_HOST=0.0.0.0
# RUN apk add --no-cache gcc musl-dev linux-headers
# COPY requirements.txt requirements.txt
# RUN pip install -r requirements.txt
# EXPOSE 5000
# COPY . .
# CMD ["flask", "run"]