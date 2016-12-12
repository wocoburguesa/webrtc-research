var apiKey = '45733562';
var sessionId = '1_MX40NTczMzU2Mn5-MTQ4MTUwOTIxMzM5OX5TNjZCbDJUNHhsMVJ0QmN2Wkd0RHpIckN-fg';
var token = 'T1==cGFydG5lcl9pZD00NTczMzU2MiZzaWc9YjkyODAzMzYzMjEwNzMxYjNjMTUzYWYxNjc1ZDY0YWViYzg3ZTIzMTpzZXNzaW9uX2lkPTFfTVg0ME5UY3pNelUyTW41LU1UUTRNVFV3T1RJeE16TTVPWDVUTmpaQ2JESlVOSGhzTVZKMFFtTjJXa2QwUkhwSWNrTi1mZyZjcmVhdGVfdGltZT0xNDgxNTA5MjQ0Jm5vbmNlPTAuNTIyNDkxNzUyODQ2MDMyNyZyb2xlPXB1Ymxpc2hlciZleHBpcmVfdGltZT0xNDgxNTk1NjQz';

var session = OT.initSession(apiKey, sessionId)
    .on('streamCreated', function(event) {
        session.subscribe(event.stream);
    })
    .connect(token, function(error) {
        var publisher = OT.initPublisher();
        session.publish(publisher);
    });

function sendRecordRequest(jwt) {
    $.ajax({
        method: "POST",
        url: "https://api.opentok.com/v2/project/" + apiKey + "/archive",
        data: {
            sessionId: sessionId,
            hasAudio: true,
            hasVideo: true,
            name: 'test_video',
            outputMode: 'composed'
        },
        headers: {
            'X-OPENTOK-AUTH': jwt
        }
    })
        .done(function( msg ) {
            console.log(msg);
        });
}

function record() {
    $.ajax({
        method: "POST",
        url: "https://krowdy-testing.herokuapp.com/record",
        data: {
            sessionId: sessionId
        }
    })
        .done(function( msg ) {
            console.log(msg);
        });
    return;

}
