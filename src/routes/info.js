const express = require('express');
const infoRouter = express.Router();
const numCPUs = require('os').cpus().length

function getMetadata(){
    datos=[];
    let argumentos = []
    process.argv.forEach((val, index) => {
        if (index > 1){
            argumentos.push(`${val}`)
        }
    });
    elemento = {};
    elemento.arguments = argumentos;
    elemento.osname = process.platform;
    elemento.nodeVer = process.version;
    elemento.rssVer = process.memoryUsage().rss;
    elemento.execPath = process.execPath;
    elemento.processID = process.pid;
    elemento.projDir = process.cwd();
    elemento.cpuNum = require('os').cpus().length
    datos.push(elemento);
  }

infoRouter.get('/', (req, res) => {
  getMetadata();
  res.render('info', {datos});
})

module.exports = infoRouter