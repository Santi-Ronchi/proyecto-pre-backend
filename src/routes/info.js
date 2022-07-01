const express = require('express');
const infoRouter = express.Router();
const numCPUs = require('os').cpus().length

infoRouter.get('/', (req, res) => {
    const datoInfo = {
        process: process,
        platform: process.platform,
        version: process.version,
        memory: process.memoryUsage(),
        path: process.execPath,
        pid: process.pid,
        cwd: process.cwd(),
        CPUs: numCPUs
    }
    res.render('info', datoInfo)
})

module.exports = infoRouter