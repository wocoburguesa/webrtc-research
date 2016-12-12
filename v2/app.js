var express = require('express');
var OpenTok = require('opentok');
var bodyParser = require('body-parser');


var apiKey = '45733562',
    apiSecret = '8855ef0d488ba92cce093580908e1aa726ec5048';

if (!apiKey || !apiSecret) {
  console.log('You must specify API_KEY and API_SECRET environment variables');
  process.exit(1);
}


//CONFIG EXPRESS
    var app = express();
    app.use(express.static(__dirname + '/public'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));   


//CONFIG OPENTOK
    var opentok = new OpenTok(apiKey, apiSecret);

    opentok.createSession({mediaMode:"routed", archiveMode:'always'},function(err, session) {
        if (err) throw err;
        app.set('sessionId', session.sessionId);
        init();
    });




//ROUTES 

    app.get('/', function(req, res) {
        var sessionId = app.get('sessionId');
        var token     = opentok.generateToken(sessionId);

        res.render('index.ejs', {
            apiKey: apiKey,
            sessionId: sessionId,
            token: token
        });
    });

    app.post('/recordVideo', function(req,res){
        var sessionId = req.body.sessionId;

        var archiveOptions = {
            name: 'Important Presentation',
            hasVideo: true,  // Record vide
            hasAudio: true  // Record audio 
        };

        opentok.startArchive(sessionId, archiveOptions, function(err, archive) {
            if (err) {
                return console.log(err);
            } else {
                console.log("new archive:" + archive.id);
                return res.json({
                    'archiveId' : archive.id
                })
            }
        });
    });


    app.post('/stopVideo', function(req,res){
        var archiveId = req.body.archiveId;

        opentok.stopArchive(archiveId, function(err, archive) {
            if (err) return console.log(err);
            console.log("Stopped archive:" + archive.id);
            return res.json({'success' : archive.id})
        });

        archive.stop(function(err, archive) {
            if (err) return console.log(err);
        });
    });

function init() {
  app.listen(3000, function() {
    console.log('You\'re app is now ready at http://localhost:3000/');
  });
}