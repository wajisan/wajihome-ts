"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//import * as dotenv from 'dotenv';
const fastify_1 = __importDefault(require("fastify"));
const fs_1 = __importDefault(require("fs"));
const fastifyEnv = require('@fastify/env');
const weather_1 = require("./services/weather");
const crypto_1 = require("./services/crypto");
const transport_1 = require("./services/transport");
const traffic_1 = require("./services/traffic");
const schema = {
    type: 'object',
    required: ['PORT'],
    properties: {
        PORT: {
            type: 'string',
            default: 9856
        }
    }
};
const options = {
    confKey: 'config',
    schema: schema,
    dotenv: {
        path: '.env',
        debug: true,
    },
};
const fastify = (0, fastify_1.default)({
    logger: true,
    https: {
        key: fs_1.default.readFileSync(__dirname + '/../cert/privkey.pem'),
        cert: fs_1.default.readFileSync(__dirname + '/../cert/cert.pem')
    }
});
fastify.register(fastifyEnv, options)
    .after(err => {
    if (err)
        console.log(err);
    //dotenv.config();
    //fastify.register(require('./setup/db'))
});
/* ROUTES */
fastify.get('/', (req, rep) => {
    rep.send({ hello: 'world' });
});
fastify.get('/traffic', (req, rep) => {
    rep.header("Access-Control-Allow-Origin", "*");
    (0, traffic_1.getTraffic)().then(data => {
        rep.send(data);
    });
});
fastify.get('/transport', (req, rep) => {
    rep.header("Access-Control-Allow-Origin", "*");
    (0, transport_1.getTransport)().then(data => {
        rep.send(data);
    });
});
fastify.get('/crypto', (req, rep) => {
    rep.header("Access-Control-Allow-Origin", "*");
    (0, crypto_1.getCrypto)().then(data => {
        console.log(data);
        rep.send(data);
    });
});
fastify.get('/weather', (req, rep) => {
    rep.header("Access-Control-Allow-Origin", "*");
    (0, weather_1.getWeather)().then(data => {
        rep.send(data);
    });
});
/* server */
fastify.listen({ port: 9856, host: 'wajihome.wajitech.fr' }, (err) => {
    if (err) {
        fastify.log.error(err);
        process.exit(1);
    }
});
