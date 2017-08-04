window.onresize = function(event) {
	location.reload();
};

function hideVideoFrame() {
  frame = document.getElementById("video");
  frame.style.visibility = "hidden";
  frame.src = frame.scr; // stop the video
  document.getElementById("videohider").style.visibility = "hidden";
  document.getElementById('videoSelector').value = -1; // reset the dropdown
}

var attacks = [{embedLink: "https://www.youtube.com/embed/AQPlREDW-Ro", lat: 33.2232, lon: 43.6793},
               {embedLink: "https://www.youtube.com/embed/PlN_copvSmg", lat: 7.8731, lon: 80.7718},
               {embedLink: "https://www.youtube.com/embed/oYuZLHkUD04"}];

function onVideoRequest() {
  if (document.getElementById("videoSelector").value != -1){
	  var attack = attacks[document.getElementById("videoSelector").value];
	  frame = document.getElementById("video");
	  frame.style.visibility = "visible";
	  frame.src = attack.embedLink;
	  document.getElementById("videohider").style.visibility = "visible";
	  if (document.getElementById("videoSelector").value < 2){
	   	globe.setLocation(attack.lat, attack.lon);
    }
  }
	else{
	  hideVideoFrame();
	}
}

// Set up globe.
// Where to put the globe?
var container = document.getElementById( 'container' );
// Make the globe
var globe = new DAT.Globe( container );
// We're going to ask a file for the JSON data.
var xhr = new XMLHttpRequest();
// Where do we get the data?
xhr.open( 'GET', 'parsedOutput.json', true );
// What do we do when we have it?
xhr.onreadystatechange = function() {
  // If we've received the data
  if ( xhr.readyState === 4 && xhr.status === 200 ) {
    // Parse the JSON
    var data = JSON.parse( xhr.responseText );
    // Tell the globe about your JSON data
    globe.addData( data, {format: 'magnitude', name: "Terrorism"} );
    // Create the geometry
    globe.createPoints();
    // Begin animation
    globe.animate();
  }
};
// Begin request
xhr.send( null );