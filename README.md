
## 2.1. Instalar Mongo DB. ##
MongoDB es una base de datos libre y de código abierto NoSQL utilizada comúnmente en aplicaciones web modernas.

Se agrega el repositorio oficial de MongoDB. El repositorio oficial proporciona la versión más actualizada y es el camino recomendado para instalar este software.

```
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv EA312927
```

Se añade el repositorio y se actualiza en la lista de paquetes.

```
echo "deb http://repo.mongodb.org/apt/ubuntu xenial/mongodb-org/3.2 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.2.list
```

```
sudo apt-get update
```

Por último, se instala el paquete.

```
sudo apt-get install -y mongodb-org
```

Este comando instalará diversos paquetes incluyendo la versión estable más reciente de MongoDB junto con herramientas administrativas para administrar el servidor MongoDB.

Una vez instalado ya se podría lanzar el servidor mediante el siguiente. Sin embargo, esta opción solo es aconsejable en un entorno de desarrollo.
```
mongod
```

Para lanzar apropiadamente MongoDB como un servicio de Ubuntu 16.04, debe
crearse un archivo unitario que describa el servicio. Un archivo unitario le
dice al systemd cómo manejar el recurso. El tipo más común de unidad es un
servicio, el cual determina como iniciar o detener el servicio, cuándo debería
iniciar automáticamente al arrancar, y cuándo debería depender de otro
software para su ejecución.

Se va a crear un archivo de unidad para administrar el servicio de MongoDB.
Se creará un archivo de configuración llamado mongodb.service en el
directorio /etc/systemd/system utilizando nano o su editor de texto
favorito.

```
sudo vim /etc/systemd/system/mongodb.service
```

Se añade al archivo el siguiente contenido:

```
[Unit]
Description=High-performance, schema-free document-oriented database
After=network.target
[Service]
User=mongodb
ExecStart=/usr/bin/mongod --quiet --config /etc/mongod.conf
[Install]
WantedBy=multi-user.target
```
Este archivo tiene una estructura simple:

- La sección Unit contiene un resumen y las dependencias que deberán existir
antes de que el servicio inicie. En este caso, MongoDB depende de que la red
esté disponible, por lo tango se agrega network.target aquí.

- La sección Service indica cómo deberá iniciar el servicio. La
directiva User especifica que el servicio deberá correr bajo el
usuario mongodb, y la directiva ExecStart inicia el comando para arrancar el
servidor MongoDB.

- La sección, Install le dice a systemd cuándo debe iniciar el servicio. multi-
user.target es un sistema de secuencias de arranque estándar, que significa
que el servicio correrá automáticamente al arrancar.

Lo siguiente será iniciar el servicio recién creado con systemctl
```
sudo systemctl start mongodb
```
Con este comando también se puede parar el servicio.
```
sudo systemctl stop mongodb
```
Además, es posible ver el estado del proceso.
```
sudo systemctl status mongodb
```

El último paso es habilitar el arranque automático de MongoDB cuando el sistema
inicie.
```
sudo systemctl enable mongodb
```
## 2.2. Instalar Node JS y NPM.
Node.js es una plataforma de programación en JavaScript de propósitos
generales que permite a los usuarios hacer aplicaciones de red.

En primer lugar, es necesario instalar el PPA con el fin de obtener acceso a
la versión de NodeJS que requiere la plataforma.
```
sudo curl -sL https://deb.nodesource.com/setup_6.x -o nodesource_setup.sh
```
Con el comando anterior, se descarga un instalador para configurar el
repositorio de NodeJS, simplemente se ejecuta el instalador para darlo de
alta en el sistema. El script está preparado para auto-eliminarse cuando
termine la ejecución.

```
sudo sh nodesource_setup.sh
```
El paquete contiene el binario de NodeJS, así como NPM, por lo que no es
necesario instalar NPM por separado. Sin embargo, para que algunos
paquetes NPM funcionen (como los que requieren compilar el código desde el
origen), tendrá que instalarse el paquete build-essential.
```
sudo apt-get install nodejs
sudo apt-get install build-essential
```
Para comprobar que se ha instalado correctamente bastará con comprobar la
versión que se ha instalado.

```
node -v
```
Comprobar que ya se ha instalado el manejador de paquete de Node.
```
npm -v
```

## 2.3. Instalar BOWER.

Instalar el gestor de paquetes para las librerías del frontend.
```
sudo npm install -g bower
```

## 2.4. Instalar GRUNT.
Grunt es una herramienta para automatizar tareas en smartligth (compilar fichero LESS a CSS, mimificar JS...)
```
sudo npm install -g grunt-cli
```
## 2.5. Instalar PM2.
PM2 es el gestor de procesos utilizado para desplegar las aplicaciones en producción.
```
sudo npm install grunt-cli -g
```

## 2.6. Instalar Mocha.

Mocha permite crear pruebas unitarias para conteplar que tras nuevos desarrollo la aplicación sigue funcionando correctamente.
```
sudo npm install -g mocha
```


## 3. VERSIONES NECESARIAS

Es recomendable comprobar que se ha instalado correctamente todo lo necesario antes de configurar el proyecto.

Comprobar que se tiene instalado correctamente Node a partir de la 6.0.0 debido que se utiliza ECMAScript 6.

```
node -v
npm -v
grunt -version
```


## 4. GENERAR DOCUMENTACIÓN INTERNA
El proyecto permite generar una página HTML con la documentación interna de la aplicación. El siguiente comando lo generará autoḿaticamente y bastará con abrir el fichero "doc/index.html" generado.
```
grunt doc
```

## 5. ANALIZAR EL CÓDIGO SINTAXTICAMENTE
El proyecto permite analizar el código sintáxticamente para proporcionar calidad de código.

```
grunt lint
```


## 6. LANZAR TEST UNITARIOS
Para poder comprobar que los diferentes test unitarios de la API funcionan correctamente habría que lanzar el siguiente comando.

```
mocha --recursive test
```






# ServerApp

## Descripción
Servicio encargado ....


## Instalaciónn
```
mongo mongoDB/ScriptDefault.js
```
```
npm install
```

```
bower install
```

```
mongo StriptDefaultDB.js
```

```
mv config/config.js.dist config/config.js 
```


Generar el fichero config/config.js 

## Ejecucion
En desarrollo ejecutamos:
```
node server.js
```
En producción ejecutamos:
```
NODE_ENV=production forever start server.js
```