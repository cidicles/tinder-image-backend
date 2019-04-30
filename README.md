# Tinder Superlatives API

The Tinder Superlatives API.

Contains:

* [Express](https://expressjs.com/)
* [Puppeteer](https://github.com/GoogleChrome/puppeteer)

Prereqs:

* [Node JS](https://nodejs.org/en/)

#### First Time Set Up
`npm i`

#### Startup (Local)
`npm run local`

#### SSL

https://stackoverflow.com/questions/21397809/create-a-trusted-self-signed-ssl-cert-for-localhost-for-use-with-express-node

`openssl req -x509 -newkey rsa:2048 -keyout keytmp.pem -out cert.pem -days 365`  
`openssl rsa -in keytmp.pem -out key.pem`
