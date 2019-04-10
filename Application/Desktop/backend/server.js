var express = require('express');
	var app = express();
	var assert = require('assert');
	var bodyParser = require('body-parser');
	var rand = require('csprng');
	var sjcl = require('sjcl');
	var backendcontroller = require('./backendController.js')
	app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
		extended: true
	}));


	/*
	Running the server
	*/
	var server = app.listen(8081, function () {
	var host = server.address().address
	var port = server.address().port

	console.log("Server up and running!! Listening on port "+port, host, port)
	})

		/*
		Server request handeling
		*/
		app.post('/', async function (req, res) {

			console.log("request is: "+req);

			/*
				LOGIN REQUEST
				returns "noUser" or "noPass" or "succes"
			*/
			if(req.body.type == 'login'){
				console.log("");
				console.log("LOGIN request recived");

				console.log("user  connected succesfuly");
				res.send("success");
			}

  		    /*
				GET PASSWORDS & TAG REQUEST
				returns 'passwords and tag' or 'failed'
			*/
			else if(req.body.type == 'getPasswords'){
				// var user = req.body.user;
				console.log("GET PASSWORDS request reviced");
				console.log(req.body);

				//call backendcontroller getRecord()
				var recordString = await  backendcontroller.getRecord();
				console.log("Records", recordString);
				//convert idString to proper format
				res.send(recordString);

				// findUserPassAndTag(function(array){
				// 	if(array.length > 0){
				// 		var passwordsString = array[0].passwords;
				// 		var tag = array[0].tag;
				// 		res.send({passwords: passwordsString, tag: tag});
				// 	}
				// 	else{
				// 		res.send("failed");
				// 	}
				//
				// }, user)
			}

  		    /*
				STORE PASSWORDS request
				returns 'passwords and tag' or 'failed'
			*/

			else if(req.body.type == 'storePasswords'){
				// var user = req.body.user;
				var passwordsString = req.body.passwordsString;
				// var tag = req.body.tag;
				console.log("");
				console.log(" Store PASSWORDS request reviced");
				        console.log("stag to store = " +tag);

				//call backendcontroller addId()
				backendcontroller.addId(passwordsString.hostname, passwordsString.username, passwordsString.password, 1);

				// storePassAndTag(user,passwordsString,tag,function(response){
				// 	if(response !== null){
				// 		res.send("store passwords succeed");
				// 	}
				// 	else{
				// 		res.send("failed");
				// 	}
				//
				// }, user)
			}
	});
