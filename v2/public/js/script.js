
//Methods

	var initTokBox = function(){
		var session = OT.initSession(sessionId);
		var publisherOptions  = {
			showControls: true
		};

		var publisher = OT.initPublisher(apiKey, publisherOptions );

		session.on({
		  sessionConnected: function(event) {
		    session.publish(publisher);
		  },
		  streamCreated: function(event) {
		    var subOptions = {insertMode: 'append'};
		    session.subscribe(event.stream, 'subscribers', subOptions);
		  }
		});

		session.connect(apiKey, token);
	}



	var stopVideoRecording = function () {
		var archiveId = 1314; //test
		$.ajax({
		  	url  : '/stopVideo',
		  	type : 'POST',
		  	data : {
		  		'archiveId' : archiveId
		  	}
		})
		.then(function(resp){
			console.log(resp)
		});
	}


	var initVideoRecording = function (){
		/** POST**/
		$.ajax({
		  	url  : '/recordVideo',
		  	type : 'POST',
		  	data : {
		  		'sessionId' : sessionId
		  	}
		})
		.then(function(resp){
			console.log(resp)
		});
	}

// Init 
	initTokBox();