const arrayNumeros = require('../funciones/funcRandoms')
process.on('message',(msg)=>{

    let repetidos = {}
    
    if(!msg){
        repetidos = arrayNumeros(100000000)
    }else{
        repetidos = arrayNumeros(msg)
    }
    process.send(repetidos)
})