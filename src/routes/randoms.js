const express = require('express');
const randomsRouter = express.Router();

//routas randoms
const { fork } = require('child_process')

randomsRouter.get('/', (req, res) => {
    try {
        const forker = fork('./src/process/processoRandoms.js')
        let cantidadVeces = req.query.cant;
        if(!cantidadVeces){
            forker.send(100000000)    
        }else{
            forker.send(cantidadVeces)
        }
        forker.on('message', (msg)=>{
            res.send(msg)
        })
    } catch (error) {
      res.status(500).send({
        status: 500,
        messages: error.message,
      });
    }
})

module.exports = randomsRouter;