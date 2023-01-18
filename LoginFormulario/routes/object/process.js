const express = require('express');
const { Router } = express
const routerProcess = new Router()
const args = process.argv;
const { fork } = require('child_process');
const { query } = require('express');

routerProcess.get('/info', async (req, res, next) => {

    const argumentos = args.slice(2);
    const platform = process.platform;
    const version = process.version;
    const memory = process.memoryUsage.rss()
    const rutaCompleta = process.execPath;
    const pid = process.pid;
    const carpeta = process.cwd()

    const datos = {
        argumentos,
        platform,
        version,
        memory,
        rutaCompleta,
        pid,
        carpeta
    }

    res.send({ datos })
})


routerProcess.get('/api/randoms', async (req, res, next) => {
    const cant = req.query.cant || 100000000
    const child = fork('./api/calculo.js');
    child.send(cant);
    child.on('message', (suma) => {
        res.json(suma);
    })
})

module.exports = routerProcess