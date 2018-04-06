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