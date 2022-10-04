//import * as dotenv from 'dotenv';
import Fastify from 'fastify';
import fs from 'fs';
const fastifyEnv = require('@fastify/env');

import {getWeather} from './services/weather';
import {getCrypto} from './services/crypto';
import {getTransport} from './services/transport';
import {getTraffic} from './services/traffic';

const schema = {
    type: 'object',
    required: [ 'PORT' ],
    properties: {
      PORT: {
        type: 'string',
        default: 9856
      }
    }
  }

const options = {
    confKey : 'config',
    schema: schema,
    dotenv: {
        path: '.env',
        debug: true,
    },
}

declare module 'fastify' {
    interface FastifyInstance {
      config: { // this should be same as the confKey in options
        confKey : string,
        schema: any,
        dotenv: any,
        data: any,
        // specify your typing here
      };
    }
  }

const fastify = Fastify({
    logger: true,
    https: {
        key : fs.readFileSync(__dirname + '/../cert/privkey.pem'),
        cert : fs.readFileSync(__dirname + '/../cert/cert.pem')
    }
});
fastify.register(fastifyEnv, options)
       .after(err => {
          if (err) console.log(err);
          //dotenv.config();
          //fastify.register(require('./setup/db'))
       })


/* ROUTES */
fastify.get('/', (req, rep) => {
	rep.send({hello: 'world'});
})

fastify.get('/traffic', (req, rep) => {
    rep.header("Access-Control-Allow-Origin", "*");
    getTraffic().then(data => {
        rep.send(data);
    })
})
fastify.get('/transport', (req, rep) => {
    rep.header("Access-Control-Allow-Origin", "*");
    getTransport().then(data => {
        rep.send(data);
    })
});

fastify.get('/crypto', (req, rep) => {
    rep.header("Access-Control-Allow-Origin", "*");
    getCrypto().then(data => {
        console.log(data);
        rep.send(data);
    })
});

fastify.get('/weather', (req, rep) => {
    rep.header("Access-Control-Allow-Origin", "*");
    getWeather().then(data => {
        rep.send(data);
    });
});

/* server */
fastify.listen({ port: 9856, host: 'wajihome.wajitech.fr' }, (err) => {
    if (err) {
        fastify.log.error(err);
        process.exit(1);
    }
})





