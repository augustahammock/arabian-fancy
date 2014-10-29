//
// Requires
// ---------------------------------------------------------
var
    express       = require('express'),
    http          = require('http'),
    path          = require('path'),
    favicon       = require('serve-favicon'),
    logger        = require('morgan'),
    cookieParser  = require('cookie-parser'),
    bodyParser    = require('body-parser'),
    photos        = require('./app/assets/files/photos.json')
;


var
    app           = express(),
    server        = http.createServer()
;



//
// Global variables
//---------------------------------------------------------

var
    root              = '.',
    paths             = {
        root:         root,
        css:          root + '/css',
        img:          root + '/img',
        fonts:        root + '/fonts',
        js:           root + '/js',
        lib:          root + '/lib',
        files:        root + '/files'
    },
    pathsJSON         = JSON.stringify(paths),
    defaults          = {
        title:        'Arabian Fancy Tack',
        description:  'Arabian Fancy Tack specializes in custom handmade adornments for Arabian horses seen in photo shoots, presentations, and show rings worldwide!',
        keywords:     'Arabian horse, Arabian tack, Arabian halter, Arabian presentation sets, Arabian show halter, handmade tack, custom Arabian tack, tack for photo shoots',
        shareImage:   paths.img + 'browser/shareImage--default.jpg'
    }
;



//
// Express setup
// ---------------------------------------------------------

// Views setup
app.set('views', path.join(__dirname, 'app/views'));
app.set('view engine', 'jade');
app.use(express.static(process.cwd() + '/public'));

// Server setup
var port = process.env.PORT || 9999;
app.listen(port);
server.on('request', app);

// Terminal feedback for living server
server.on('listening', onListening);
function onListening () {
  console.log('Express server listening on port %s.', app.get('port'));
};

// Terminal feedback for errors
server.on('error', onError);
function onError (error) {
  throw error;
};
server.listen(app.get('port'));



//
// Page routes
// ---------------------------------------------------------

// Home
app.get('/', function (request, response) {
  response.render('pages/index', {
        paths:          paths,
        title:          defaults.title,
        description:    defaults.description,
        keywords:       defaults.keywords,
        shareImage:     defaults.shareImage,
        bodyClass:      'home'
  });
});

// FAQ
app.get('/faq', function (request, response) {
  response.render('pages/faq', {
        paths:          paths,
        title:          'Frequently Asked Questions',
        description:    defaults.description,
        keywords:       defaults.keywords,
        shareImage:     defaults.shareImage,
        bodyClass:      'faq'
  });
});

// Tack
app.get('/tack', function (request, response) {
  response.render('pages/tack', {
        paths:          paths,
        title:          'Custom Handmade Tack by Arabian Fancy',
        description:    defaults.description,
        keywords:       defaults.keywords,
        shareImage:     defaults.shareImage,
        bodyClass:      'tack',
        photos:         photos
  });
});

// Contact
app.get('/contact', function (request, response) {
  response.render('pages/contact', {
        paths:          paths,
        title:          'Contact Arabian Fancy',
        description:    defaults.description,
        keywords:       defaults.keywords,
        shareImage:     defaults.shareImage,
        bodyClass:      'contact'
  });
});
