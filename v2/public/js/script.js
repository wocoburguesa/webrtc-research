
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
		//archiveId contains response from initVideoRecording POST
		var url = "https://api.opentok.com/v2/project/"+ apiKey + "/archive/" + archiveId + "/stop";
		var data = new FormData();
			data.append('sessionId', sessionId);
			data.append('hasAudio', true);
			data.append('hasVideo', true);
			data.append('name', 'hola');
			data.append('outputMode', 'composed');


		var http = new XMLHttpRequest();
		http.open("POST", url, true);
		http.setRequestHeader('Content-type', 'application/json');

		http.onload = function (resp) {
			console.log(resp);
		};

		http.send(data);
	}


	var initVideoRecording = function (){
		var dataSend = {
			'sessionId' : sessionId,
			'hasAudio' : true,
			'hasVideo' : true,
			'name' : 'hola',
			'outputMode' : 'composed'
		}

		var jwt = {
    		"iss": apiKey,
    		"ist": "project",
    		"iat": new Date(),
    		"exp": new Date(),
    		"jti": "jwt_nonce"
		};

		/** POST**/
		$.ajax({
		  	url : 'https://api.opentok.com/v2/project/'+ apiKey + '/archive',
		  	type: 'POST',
		  	dataType : "application/json",
		  	data: dataSend,
		  	headers :{
	  			'Access-Control-Allow-Origin' :  '*',
				'Content-type'  : 'application/json',
				'X-OPENTOK-AUTH': jwt
		  	} 
		},function(resp){
			console.log(resp)
		});
	}

// Init 
	initTokBox();