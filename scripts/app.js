var apiKey = '45733562';
var sessionId = '1_MX40NTczMzU2Mn5-MTQ4MTc2MTUxMjU1NH4xakUva3o3cWJ0bEZaMGxPWVRaWXlzQkV-fg';
var token = 'T1==cGFydG5lcl9pZD00NTczMzU2MiZzaWc9MmJlNzZlY2ZhZTBmZmE3MWI3YjQzNDA4YzAyYWNmNGMwZTE1MTM1YTpzZXNzaW9uX2lkPTFfTVg0ME5UY3pNelUyTW41LU1UUTRNVGMyTVRVeE1qVTFOSDR4YWtVdmEzbzNjV0owYkVaYU1HeFBXVlJhV1hselFrVi1mZyZjcmVhdGVfdGltZT0xNDgxNzYxOTU0Jm5vbmNlPTAuMjc3MDk3NzIzOTQyNjQyJnJvbGU9cHVibGlzaGVyJmV4cGlyZV90aW1lPTE0ODQzNTM5NTI=';

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
//        url: "http://localhost:5000/record",
        data: JSON.stringify({
            sessionId: sessionId
        }),
        contentType: 'application/json; charset=utf-8'
    })
        .done(function(data) {
            window.archive = data;
        });
}

function stopRecording() {
    $.ajax({
        method: "POST",
        url: "https://krowdy-testing.herokuapp.com/stop-recording",
//        url: "http://localhost:5000/stop-recording",
        data: JSON.stringify({
            archiveId: window.archive && window.archive.id
        }),
        contentType: 'application/json; charset=utf-8'
    })
        .done(function( msg ) {
            console.log(msg);
        });
}

function list() {
    $.ajax({
        method: "GET",
        url: "https://krowdy-testing.herokuapp.com/list",
//        url: "http://localhost:5000/list"
    })
        .done(function(data) {
            console.log(data);
        });
}

function clearAll() {
    $.ajax({
        method: "POST",
        url: "https://krowdy-testing.herokuapp.com/clear-all",
//        url: "http://localhost:5000/clear-all"
    })
        .done(function(data) {
            console.log(data);
        });
}
