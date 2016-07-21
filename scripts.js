var minutes = 3600;
var hours = minutes * 60;

var displayMinutes = document.getElementsByClassName('min')[0];
var displayHours = document.getElementsByClassName('hour')[0];


function updateClock(){

	var theMin = Date.getMinutes();
	var theHour = Date.getHours();
	if(theHour < 13){
		therHour - 12;
	}

	displayMinutes.innerHTML = theMin;
	displayHours.innerHTML = theHour;
};

setInterval(updateClock(), 1000);
console.log(minutes);
console.log(displayMinutes);
console.log(Date);