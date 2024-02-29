var getusermedia = require("getusermedia");

var Peer = require("simple-peer");

var devices = undefined;
var webcamStarted = false;
var streamingStarted = false;
var video = document.getElementById("myVideoStream");
var myStream = undefined;
var remoteStream = undefined;
var peer = undefined;

var constraintsObject = {
	deviceId: {
		exact: undefined,
	},
};
/**
 * Get all the devices and populate the SELECT Html TAG called "webcam"
 * So we can recover the id of any devive and start the webcam
 *
 * We put this code inside of a promise, otherwise if we don't have permissions from the user yet
 * we couldn't recive the información and we would need to reload.
 * If we place the code in the "then" part of the promise, the code is gonna run just in the moment
 * when we got answer from the user.
 */
var mediaDevicesPromise = navigator.mediaDevices.getUserMedia({
	audio: true,
	video: true,
});

mediaDevicesPromise
	.then(function () {
		var enumeratorPromise = navigator.mediaDevices
			.enumerateDevices()
			.then(function (_devices) {
				devices = _devices;
				var select = document.getElementById("webcam");
				_devices.forEach(function (device) {
					// console.log(
					// 	device.kind + ":" + device.label + "id =" + device.deviceId
					// );
					if (device.kind == "videoinput") {
						var option = document.createElement("option");
						option.innerHTML = device.label;
						option.value = device.deviceId;

						if (constraintsObject.deviceId == undefined) {
							//Checking the right one
							constraintsObject.deviceId = device.deviceId;
						}

						select.appendChild(option);
					}
				});
			})
			.catch(function (err) {
				console.log(err.name + ":" + err.message);
			});
	})
	.catch(function () {
		//Handle errors
		console.log("Error with navigator.mediaDevices Promise");
	});

/**
 * Library to wrap navigator.getUserMedia and handle errors for all the diferent kind of browsers.
 */
function startCamera() {
	getusermedia(
		{
			//video: true,
			video: constraintsObject,
			audio: false,
		},
		function (err, stream) {
			if (err) {
				console.log(err);
			} else {
				//We can create the object dinamycly if we need to
				//video = document.createElement("video");
				//document.body.appendChild(video);
				myStream = stream;

				video.srcObject = stream;
				video.play();
			}
		}
	);
}

/**
 *
 * Simple Peer function to call another peer
 *
 */
/**
 * STEP 1 -
 * Done by the initiator
 * Get my Peer ID
 */
function getMyPeerId() {
	console.log("I'm the initiator and i'm ready to get my Peer ID");
	peer = new Peer({
		//initiator: true, //qui inicia la trucada
		initiator: true,
		trickle: false,
		//stream: myStream,
	});

	//Handshake per iniciar la comunicació sense server
	peer.on("signal", (data) => {
		//enviar via socket.io les dades d'inici de trucada.
		/**
		 * infomració que tindria que enviar via socket.io per localitzar i pasar la ifnormació a l'altre
		 * peer.
		 * id <-- id de l'usuari que vull trucar.
		 * data <-- les dades qeu envio
		 * el meu id
		 */
		console.log("MY ID TO MAKE A CALL:");
		console.log(data);
		addLogMessage("SIGNALING TYPE : " + data.type);

		if (data.type == "offer") {
			document.getElementById("yourID").value = JSON.stringify(data);
		} else {
			addLogMessage(JSON.stringify(data));
		}
	});
	peer.on("data", (data) => {
		addLogMessage(data);
	});
	peer.on("stream", (stream) => {
		//Stream de dades que rebo de l'altre costat
		console.log("event on stream from initiator");
		document.getElementById("remoteVideoStream").srcObject = stream;
		document.getElementById("remoteVideoStream").play();
	});

	peer.on("connect", () => {
		addLogMessage("Connection Established!!!");
	});
	peer.on("close", () => {
		addLogMessage("Connection Closed");
		var controlsStreamingButton = document.getElementById("sendVideoStream");

		controlsStreamingButton.innerHTML = "START STREAMING";
		controlsStreamingButton.style.backgroundColor = "lightcoral";
		streamingStarted = false;
	});
	peer.on("error", (err) => {
		addLogError(err);
		var controlsStreamingButton = document.getElementById("sendVideoStream");

		controlsStreamingButton.innerHTML = "START STREAMING";
		controlsStreamingButton.style.backgroundColor = "lightcoral";
		streamingStarted = false;
	});
}

/**
 *
 * STEP 2 -
 *  Done by the accepting user
 *  Signal the ID of the initiator and getting my ID if the sinaling works fine
 */
document.getElementById("signalPeer").addEventListener("click", () => {
	if (!document.getElementById("initiator").checked) {
		signalMyPeer();
	} else {
		logError("You need to be Accepting call USER");
	}
});
function signalMyPeer() {
	console.log("Signaling my peer");
	peer = new Peer({
		initiator: false,
		trickle: false,
		//stream: myStream,
	});
	peer.on("signal", (data) => {
		//es crida cada cop que es crea un nou objecte Peer
		console.log("MY ID TO ACCEPT CALL:");
		console.log(data);
		addLogMessage("SIGNALING TYPE : " + data.type);
		if (data.type == "answer") {
			document.getElementById("yourID").value = JSON.stringify(data);
		} else {
			addLogMessage(JSON.stringify(data));
		}
	});
	peer.on("data", (data) => {
		addLogMessage(data);
	});
	peer.on("stream", (stream) => {
		//Stream de dades que rebo de l'altre costat

		console.log("event on stream from NO initiator user");

		document.getElementById("remoteVideoStream").srcObject = stream;
		document.getElementById("remoteVideoStream").play();
	});

	//Need to signal the initiator to be abble to get our ID
	peer.signal(document.getElementById("remoteID").value);

	peer.on("connect", () => {
		addLogMessage("Connection Established!!!");
	});
	peer.on("close", () => {
		addLogMessage("Connection Closed");
		var controlsStreamingButton = document.getElementById("sendVideoStream");

		controlsStreamingButton.innerHTML = "START STREAMING";
		controlsStreamingButton.style.backgroundColor = "lightcoral";
		streamingStarted = false;
	});
	peer.on("error", (err) => {
		addLogError(err);
		var controlsStreamingButton = document.getElementById("sendVideoStream");

		controlsStreamingButton.innerHTML = "START STREAMING";
		controlsStreamingButton.style.backgroundColor = "lightcoral";
		streamingStarted = false;
	});
}

peer?.on("track", (track, stream) => {
	console.log("PEER EVENT ON TRACK");
	console.log(track);
	console.log(stream);
});

/**
 *
 * STEP 3 -
 * Done by the initiator
 * Signaling the ID of the accepting user.
 */

document.getElementById("connect").addEventListener("click", () => {
	peer.signal(document.getElementById("remoteID").value);
});
/**
 *
 * STEP 4.a -
 *
 * Send information to the other peer.
 *
 */
document.getElementById("send").addEventListener("click", (event) => {
	var message = document.getElementById("message").value;
	console.log("message => " + message);
	peer.send(message);
});

/**
 *
 * STEP 4.b -
 * Send Streams of video / audio to the other person.
 *
 * working on progress, may need to renegotiate the ID's. Needs to be checked with the docs.
 */
document
	.getElementById("sendVideoStream")
	.addEventListener("click", (event) => {
		var controlsStreamingButton = document.getElementById("sendVideoStream");

		if (streamingStarted) {
			stopStreamToMyPeer();
			controlsStreamingButton.innerHTML = "PLAY STREAMING";
			controlsStreamingButton.style.backgroundColor = "lightcoral";
			streamingStarted = false;
		} else {
			sentStreamToMyPeer();
			controlsStreamingButton.innerHTML = "STOP STREAMING";
			controlsStreamingButton.style.backgroundColor = "lightgreen";
			streamingStarted = true;
		}
	});
function sentStreamToMyPeer() {
	if (myStream) {
		addLogMessage("adding Stream ....");
		peer?.addStream(myStream);
	} else {
		logError("You need to start your Camera to send the stream");
	}
}
function stopStreamToMyPeer() {
	addLogMessage("Stoping Stream ....");
	peer?.removeStream(myStream);
}
/**
 *
 * GENERIC STEP
 * Generic Signalig, to test diferent parts of the protocol.
 *
 *
 */
/**
 * EventListener and actions for the web
 */

document.getElementById("genericSignal").addEventListener("click", () => {
	console.log("Signaling generic Signal");
	var genericSignal = document.getElementById("genericSignalText").value;
	console.log(genericSignal);
	peer?.signal(genericSignal);
});

document.getElementById("log").addEventListener("click", () => {
	console.log(devices);
	logMessage("<ul>");
	devices.forEach((device) => {
		addLogMessage(
			"<li><b>" + device.label + ":</b>[" + device.deviceId + "]</li><br>"
		);
	});
	addLogMessage("</ul>");
});

document.getElementById("removeLog").addEventListener("click", () => {
	emptyLog();
});

document.getElementById("getInitiatorID").addEventListener("click", () => {
	if (document.getElementById("initiator").checked) {
		getMyPeerId();
	} else {
		logError("You need to be initiator");
	}
});

document.getElementById("controlCamera").addEventListener("click", () => {
	controlCameraButton = document.getElementById("controlCamera");
	if (webcamStarted) {
		console.log("turining OFF web cam");
		controlCameraButton.innerHTML = "START MY CAMERA";
		controlCameraButton.style.backgroundColor = "lightcoral";

		if (video) {
			video.pause();
			video.currentTime = 0;

			//In case peer exist, remove the Stream
			peer?.removeStream(myStream);

			video.srcObject = null;
		}
	} else {
		console.log("turning ON webcam");
		controlCameraButton.innerHTML = "STOP MY CAMERA";
		controlCameraButton.style.backgroundColor = "lightgreen";
		startCamera();
	}
	webcamStarted = !webcamStarted;
});

document.getElementById("webcam").addEventListener("change", (event) => {
	constraintsObject.deviceId = event.target.value;
	if (webcamStarted) {
		console.log("Reiniciando camera");
		document.getElementById("controlCamera").click(); //Switching off
		document.getElementById("controlCamera").click(); //Switching on
	}
});

document.getElementById("initiator").addEventListener("change", (event) => {
	var initiator = document.getElementById("initiator").checked;
	if (initiator) {
		document.getElementById("accepting_div").style.display = "none";
		document.getElementById("initiator_div").style.display = "inline";
	} else {
		document.getElementById("initiator_div").style.display = "none";
		document.getElementById("accepting_div").style.display = "inline";
	}
});

/**
 *
 * UTILS
 */
function logError(txt) {
	console.log(txt);
	rawMessage("<div class='logError'>" + txt + "</div>");
}
function addLogError(txt) {
	console.log(txt);
	addRawMessage("<div class='logError'>" + txt + "</div>");
}
function emptyLog() {
	rawMessage("");
}
function logMessage(txt) {
	rawMessage("<div class='logMessage'>" + txt + "</div>");
}
function addLogMessage(txt) {
	addRawMessage("<div class='logMessage'>" + txt + "</div>");
}
function rawMessage(txt) {
	document.getElementById("messages").innerHTML = txt;
}
function addRawMessage(txt) {
	document.getElementById("messages").innerHTML += txt;
}
