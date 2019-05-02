const express = require('express');
const app = express();
const port = process.env.PORT || 1337;
const bodyParser = require('body-parser');
const cors = require('cors');
const http  = require('http');
//const https  = require('https'); // SSL
const path = require('path');
const fs = require('fs');
const args = process.argv.slice(2);
const uuidv1 = require('uuid/v1');
const puppeteer = require('puppeteer');
const morgan = require('morgan');
const multer = require('multer');
const crypto = require('crypto');
const changeCase = require('change-case')
const env = require('node-env-file');

// Add ENV
env(__dirname + '/.env');

// Enable Body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Logs
app.use(morgan('dev'));

// Enable CORS
app.use(cors());

// Static Serve
app.use(express.static(path.join(__dirname, 'superlative')));
app.use(express.static(path.join(__dirname, 'uploads')));

// SSL
/*
let options = {
  key: fs.readFileSync('localhost.key'),
  cert: fs.readFileSync('localhost.cert')
};
*/

// Upload Handler
const storage = multer.diskStorage({
  destination: function(req, file, callback) {
    const cry = crypto.randomBytes(8).toString("hex");
    const dir = `${__dirname}/uploads/${cry}`;
    
    if (!fs.existsSync(dir)){
      fs.mkdirSync(dir);
    }

    callback(null, dir);
  },
  filename: function(req, file, callback) {
    const extension = file.originalname.split('.').pop();
    const uuid = uuidv1();

    callback(null, `${uuid}-${Date.now()}.${extension}`);
  }
});
const upload = multer({ storage: storage });

// Render Image 
async function getScreenshot(content) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  if (!fs.existsSync(content.dir)){
    fs.mkdirSync(content.dir);
  }

  await page.setContent(`
  <html>
    <head>
    <link href="${process.env.API_URL}style.css" rel="stylesheet" />
    <head>
    <body style="background-color: #fff; padding: 0; margin:0; display: flex; align-items: center; justify-content: center;">
      <div class="photo-frame">
        <div class="photo-frame__mask">
          <img class="${content.orientationclass} photo-frame__pic--portrait photo-frame__pic" src="${content.img}" alt="Most likely to">
        </div>
        <img class="photo-frame__flame" src="${process.env.API_URL}flame.png" alt="Tinder">
        <h3>Most likely to</h3>
        <h2>${content.text}</h2>
      </div>
    </body>
  </html>
  `);

  await page.setViewport({
    width: 350, 
    height: 500
  });
  await page.content();
  await page.screenshot({
    path: content.dest
  });
  await browser.close();
}

// Routes 
app.post('/api/upload', upload.single('superlative'), (req, res) => {
  if (!req.file) {
    return res.send({
      success: false
    });

  } else {
    const img = `${process.env.API_URL}${req.file.destination.split('/').slice(-1).join('/')}/${req.file.filename}`;
    const uuid = uuidv1();
    const dir = `${__dirname}/superlative/${uuid}`;
    const filename = `${changeCase.snakeCase(req.body.text)}.png`;
    const dest = `${dir}/${filename}`;
    const url = `${process.env.API_URL}${uuid}/${filename}`;

    getScreenshot({
      img,
      dest,
      dir,
      text: req.body.text,
      orientationclass: req.body.orientationclass
    }).then(() => {
      return res.send({
        success: true,
        url
      });
    }).catch((e) => {
      console.error(e);
      return res.send({
        success: false,
        error: e
      });
    });
  }
});

app.use(function(req, res) {
  res.status(404).send({error: req.originalUrl + ' not found'})
});

http.createServer(app).listen(port);
//https.createServer(options, app).listen(443); // SSL
console.log(`api started on: ${ port }`);
