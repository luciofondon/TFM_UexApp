#!groovy

node {
    // ------------------------------------
    // -- ETAPA: Compilar
    // ------------------------------------
    stage 'Dependencias backend'
   
    // -- Configura variables
    echo "Decargando dependencias backend"
    cd backend
    npm install
    cd ..
   
   
    // ------------------------------------
    // -- ETAPA: Test
    // ------------------------------------
    stage 'Dependencias frontend'
    echo "Decargando frontend"
    cd frontend
    npm install
    bower install
    cd ..
}