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

#### Pupeteer Error While Loading Shared Libraries

```
sudo apt-get install gconf-service libasound2 libatk1.0-0 libc6 libcairo2 libcups2 libdbus-1-3 libexpat1 libfontconfig1 libgcc1 libgconf-2-4 libgdk-pixbuf2.0-0 libglib2.0-0 libgtk-3-0 libnspr4 libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 ca-certificates fonts-liberation libappindicator1 libnss3 lsb-release xdg-utils wget
``` 

When Installing on Linux: 
`$ sudo npm install --unsafe-perm=true --allow-root`