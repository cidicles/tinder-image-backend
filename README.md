# Tinder Superlatives API

This API allows for the uploading of an image and returns a styled image. 

Contains:

* [Express](https://expressjs.com/)
* [Puppeteer](https://github.com/GoogleChrome/puppeteer)

Prereqs:

* [Node JS](https://nodejs.org/en/)

#### First Time Set Up
`npm i`

#### Startup (Local)
`npm run local`

#### Example
[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/616d0b3ab4025ea47d8f)

#### SSL

https://stackoverflow.com/questions/21397809/create-a-trusted-self-signed-ssl-cert-for-localhost-for-use-with-express-node

`openssl req -x509 -newkey rsa:2048 -keyout keytmp.pem -out cert.pem -days 365`  
`openssl rsa -in keytmp.pem -out key.pem`
