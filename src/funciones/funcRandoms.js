function arrayNumeros(cantidadVeces) {
    let array=[]
    let repetidos = {};
    for(let i=0; i<cantidadVeces; i++){
        array.push(Math.floor(Math.random() * (1000 - 1) + 1))
    }
    array.forEach(function(numero){
        repetidos[numero] = (repetidos[numero] || 0) + 1;
    });
    return repetidos
}

module.exports = arrayNumeros