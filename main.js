var express = require('express');
var jwt = require('jsonwebtoken');
var app = express();
var ot = require('opentok');

var apiKey = '45733562';
var apiSecret = '8855ef0d488ba92cce093580908e1aa726ec5048';

ot = new OpenTok(apiKey, apiSecret);

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/scripts'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('index');
});

app.post('/jwt', function(request, response) {
    console.log(request.body);
    jwt.sign({
        iss: '45733562',
        ist: 'project',
        iat: (new Date()).valueOf(),
        exp: (new Date()).valueOf() + 300,
        jti: 'jwt_nonce'
    }, 'krowdy', {}, function (err, data) {
        response.json({
            jwt: data
        });

    });
});

app.post('/record', function(request, response) {
    var body = request.body;

    ot.startArchive(
        body.sessionId,
        { name: 'Test' },
        function (err, archive) {
            response.json(archive);
        }
    );
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
