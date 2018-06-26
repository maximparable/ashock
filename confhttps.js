  
  
var redirectApp = express();
  
  app.use(function(req, res, next) {
      if ((req.get('X-Forwarded-Proto') !== 'https')) {
        res.redirect('https://' + req.get('Host') + req.url);
      } else
        next();
    });

var options = {
    key: fs.readFileSync(config.sslKeyPath),
    cert: fs.readFileSync(config.sslCertPath),
    ca: fs.readFileSync(config.sslCaPath)
};

var server = https.createServer(options, app);
var redirectServer = http.createServer(redirectApp);

redirectApp.use(function requireHTTPS(req, res, next) {
  if (!req.secure) {
    return res.redirect('https://www.domain.com'+ req.url);
  }
  next();
});

server.listen(httpsport, function() {
    console.log("Listening on " + port);
});

redirectServer.listen(httpport, function() {
    console.log("Listening on " + port);
});
  
  
  
  
  
