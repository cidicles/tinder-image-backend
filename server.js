const express = require('express');
const app = express();
const port = process.env.PORT || 1337;
const bodyParser = require('body-parser');
const cors = require('cors');
const http  = require('http');
//const https  = require('https'); // SSL
const fs = require('fs');
const args = process.argv.slice(2);
const uuidv1 = require('uuid/v1');
const puppeteer = require('puppeteer');

const morgan = require('morgan');
const multer = require('multer');
const crypto = require('crypto');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan('dev'));


console.log(crypto.randomBytes(16).toString("hex"));
console.log(uuidv1());



// enable cores application wide
app.use(cors());

// SSL
/*
let options = {
  key: fs.readFileSync('localhost.key'),
  cert: fs.readFileSync('localhost.cert')
};
*/





/*
const address = "https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Hubble2005-01-barred-spiral-galaxy-NGC1300.jpg/1920px-Hubble2005-01-barred-spiral-galaxy-NGC1300.jpg";
phantom.create().then( (ph) => {
  ph.createPage().then( (page) => {


    page.set('content', '<html><body><p>Hello world</p></body></html>');

    page.open(address).then( (status) =>  {
      //console.log('Opened page: ' + address + ' Status: ' + status);
      page.property('viewportSize', { width: 1920, height: 1096} )
      page.render('test.jpg', {format: 'jpeg', quality: '100'}).then(() => {;
        console.log('Rendered page.');
        ph.exit();
      });
    });
    
  });
});
*/



(async function() {

  const browser = await puppeteer.launch();

  const page = await browser.newPage();
  await page.setContent(`
  <html>
    <body style="background-color: #f00;">
      <img src="https://via.placeholder.com/150">
      <p>Hello world</p>
    </body>
  </html>
  `);
  await page.setViewport({ width: 1920, height: 1096});

  console.log(await page.content());
  await page.screenshot({path: 'screenshot.png'});

  await browser.close();

}());









// Connection
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var storage = multer.diskStorage({
  destination: function(req, file, callback) {
    callback(null, __dirname + '/uploads')
  },
  filename: function(req, file, callback) {
    const extension = file.originalname.split('.').pop();

    //console.log(crypto.randomBytes(16).toString("hex"));
    const uuid = uuidv1();

    callback(null, `${uuid}-${Date.now()}.${extension}`);
  }
});
const upload = multer({ storage: storage });

app.post('/api/img', upload.single('superlative'), (req, res) => {
  if (!req.file) {
    return res.send({
      success: false
    });

  } else {
    console.log(req.file);
    console.log('file received');
    return res.send({
      success: true
    })
  }
});

// Routes 
//const routes = require('./api/routes/routes');
//routes(app);

app.use(function(req, res) {
  res.status(404).send({error: req.originalUrl + ' not found'})
});

http.createServer(app).listen(port);
//https.createServer(options, app).listen(443); // SSL

// Because
const because = require('./because');
because(() => {
  console.log(`api started on: ${ port }`);
});
