var apiKey = '45733562';
var sessionId = '2_MX40NTczMzU2Mn5-MTQ4MTUwNjMzNjE2OX5NdkV0N3dMMjBIbnJRYmhLZ0JYSkpaYmV-fg';
var token = 'T1==cGFydG5lcl9pZD00NTczMzU2MiZzaWc9YWI0NzkyNDA4ZmM1NDI4ZGEzNzA5MjNjMWNmMzRkMDJjZTU0MTA0NTpzZXNzaW9uX2lkPTJfTVg0ME5UY3pNelUyTW41LU1UUTRNVFV3TmpNek5qRTJPWDVOZGtWME4zZE1NakJJYm5KUlltaExaMEpZU2twYVltVi1mZyZjcmVhdGVfdGltZT0xNDgxNTA2MzQ0Jm5vbmNlPTAuMzExODEyNTU2Njg0MTAwOCZyb2xlPXB1Ymxpc2hlciZleHBpcmVfdGltZT0xNDgxNTA5OTQ0';

var session = OT.initSession(apiKey, sessionId)
    .on('streamCreated', function(event) {
        session.subscribe(event.stream);
    })
    .connect(token, function(error) {
        var publisher = OT.initPublisher();
        session.publish(publisher);
    });

function record() {
    $.ajax({
        method: "POST",
        url: "https://api.opentok.com/v2/project/" + apiKey + "/archive",
        data: {
            sessionId: sessionId,
            hasAudio: true,
            hasVideo: true,
            name: 'test_video',
            outputMode: 'composed'
        }
    })
        .done(function( msg ) {
            console.log(msg);
        });
}
