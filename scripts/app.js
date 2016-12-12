var apiKey = '45733562';
var sessionId = '2_MX40NTczMzU2Mn5-MTQ4MTUwMjQ2NjQzNn5lTS9PYllmdHhDMGRObkxNWUhNNzNhVWR-fg';
var token = 'T1==cGFydG5lcl9pZD00NTczMzU2MiZzaWc9MmRhMzg0MWVjYjhhNDJjNzIyOGE2ZWViY2UyOTY2N2QzYmNmNWIxZTpzZXNzaW9uX2lkPTJfTVg0ME5UY3pNelUyTW41LU1UUTRNVFV3TWpRMk5qUXpObjVsVFM5UFlsbG1kSGhETUdST2JreE5XVWhOTnpOaFZXUi1mZyZjcmVhdGVfdGltZT0xNDgxNTAyNTEwJm5vbmNlPTAuNTMxOTMxNzg0MjU0NDE5OCZyb2xlPXB1Ymxpc2hlciZleHBpcmVfdGltZT0xNDgxNTA2MTA5';
var session = OT.initSession(apiKey, sessionId)
    .on('streamCreated', function(event) {
        session.subscribe(event.stream);
    })
    .connect(token, function(error) {
        var publisher = OT.initPublisher();
        session.publish(publisher);
    });
