var d;
var minutes = 60;
var hours = minutes * 60;
var days = hours * 24;
// to keep track of user input and create timer
var userInput = "";
var start = 0;
var createCountdown;

// for present clock
var clockSeconds = document.getElementsByClassName('sec')[0];
var clockMinutes = document.getElementsByClassName('min')[0];
var clockHours = document.getElementsByClassName('hour')[0];
var clockDays = document.getElementsByClassName('day')[0];
var clockMonth = document.getElementsByClassName('month')[0];
var clockYear = document.getElementsByClassName('year')[0];

var pauseSeconds = document.getElementsByClassName('sec')[1];
var pauseMinutes = document.getElementsByClassName('min')[1];
var pauseHours = document.getElementsByClassName('hour')[1];
var pauseDays = document.getElementsByClassName('day')[1];
var pauseMonth = document.getElementsByClassName('month')[1];
var pauseYear = document.getElementsByClassName('year')[1];

var movingIt = document.getElementsByClassName('timer-container')[0];

var monthList = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

var togglePause = document.getElementById('pause-toggle-paused');
var toggleClock = document.getElementById('pause-toggle');

// this will store user input to start countdown.
var userInputMonth; //= document.getElementById('editMonth').innerHTML;
var userInputDay; //= document.getElementById('editDay').innerHTML;
var userInputYear; //= document.getElementById('editYear').innerHTML;
var userInputHour; //= document.getElementById('editHour').innerHTML;
var userInputMin; //= document.getElementById('editMin').innerHTML;
var userInputSec; //= document.getElementById('editSec').innerHTML;

// these are the variables for the countdown clock itself
var countdownMonth = document.getElementById('month-timer');
var countdownDay = document.getElementById('day-timer');
var countdownYear = document.getElementById('year-timer');
var countdownHour = document.getElementById('hour-timer');
var countdownMin = document.getElementById('min-timer');
var countdownSec = document.getElementsByClassName('sec-timer')[0];

// stores converted month
var monthShort;
// stores month index in the array
var monthIndex;
// stores ocnverted hour
var hourNew;
// stores countdown timer "new date . getTime()" 
var countdownEndPoint = new Date(userInput).getTime();

// Various time units in seconds
var secondsInAMinute = 60;
var secondsInAHour = secondsInAMinute * 60;
var secondsInADay = secondsInAHour * 24;
var secondsInAMonth = secondsInADay * 30.44; //approximate division of days to months
var secondsInAYear = secondsInAMonth * 365;

// sets up the toggle for countdown start stop
var toggleTemp = 0;
var toggleCountdown = 1;

// this determines if alarm will go off.
var alarm = false;



// FUNCTIONS!!!! ----------------


// we want the user input to be read by the computer. especially months because they need to be converted.
// this ensures we get the right format for months.
function keepMonth3(){
	monthShort = userInputMonth.slice(0,1).toUpperCase() + userInputMonth.slice(1,3).toLowerCase();
}

function monthConvert(){
	for(var i = 0; i < monthList.length; i++){
		if(monthList[i] === monthShort){
			monthIndex = i;
		}
	}
}

// converts to proper hour time
function hourChange(){
	if((userInputHour.length === 2) && (userInput < 10)){
		hourNew = userInputHour.slice(1, 2);
	} else if(userInputHour > 25) {
		alert('Please insert a proper hour figure')
	}
}

// sets up countdown start point.
// format = month day, year hour:min:sec
function placeCountdown() {
	userInputMonth = document.getElementById('editMonth').innerHTML;
	userInputDay = document.getElementById('editDay').innerHTML;
	userInputYear = document.getElementById('editYear').innerHTML;
	userInputHour = document.getElementById('editHour').innerHTML;
	userInputMin = document.getElementById('editMin').innerHTML;
	userInputSec = document.getElementById('editSec').innerHTML;
	if(userInputMonth.length > 0){
		keepMonth3();
	} else if(parseInt(userInputMonth)) {
		alert('You must insert a proper month')
	}
	keepMonth3();
	monthConvert();
	hourChange();

	userInput = (monthShort + " " + userInputDay + "," + userInputYear + " " + userInputHour + ":" + userInputMin + ":" + userInputSec).toString();
	createCountdown = new Date(userInput).getTime();
}

function countdown(){
	var now = Date.now();
	// Time in seconds between current moment and start of Rio 2016
	var destination = (createCountdown - now)/1000;

	// get various units of time til event
	var seconds = Math.floor(destination % 60)
	var minutes = Math.floor((destination / secondsInAMinute) % 60);
	var hours = Math.floor((destination / secondsInAHour) % 24);
	var days = Math.floor((destination / secondsInADay) % 30);
	var months = Math.floor((destination / secondsInAMonth) % 12);
	var years = Math.floor((destination / 31536000) % 31536000);


	countdownSec.innerHTML = seconds.toString();
	countdownMin.innerHTML = minutes.toString();
	countdownHour.innerHTML = hours.toString();
	countdownDay.innerHTML = days.toString();
	countdownMonth.innerHTML = months.toString();
	countdownYear.innerHTML = years.toString();

	if((createCountdown - now) === 0){
		alarm = true;
		alert('Yay!');
	}
}


// toggles countdown
function clickMe(){
	toggleTemp = toggleCountdown;
	if (toggleTemp === 0){
		toggleCountdown = 1;
	}else if (toggleTemp === 1){
		toggleCountdown = 0;
	}
	placeCountdown();
	countdown();
}

function updateClock(){
	a = new Date();
	d = Date.now();
	d /= 1000;
	var theSec = Math.floor(d % 60);
	var theMin = Math.floor((((d % 31536000) % 86400) % 3600) / 60);
	var theHour = Math.floor(((d % 31536000) % 86400) / 3600);
	// corrects time zone
	theHour -= 4;
	var theDay = a.getDate();
	var theYear = a.getFullYear();
	var theMonth = monthList[a.getMonth()];

	clockSeconds.innerHTML = theSec;
	clockMinutes.innerHTML = theMin;
	clockHours.innerHTML = theHour;
	clockDays.innerHTML = theDay;
	clockMonth.innerHTML = theMonth;
	clockYear.innerHTML = theYear;
};
// this will grab a time stamp of the current time
function pause(){
	a = new Date();

	pauseSeconds.innerHTML = a.getSeconds();
	pauseMinutes.innerHTML = a.getMinutes();
	pauseHours.innerHTML = a.getHours();
	pauseDays.innerHTML = a.getDate();
	pauseMonth.innerHTML = monthList[a.getMonth()];
	pauseYear.innerHTML = a.getFullYear();
}

function toggle(){
	if(togglePause.style.display === "none"){
		togglePause.style.display = "inline-block";
		toggleClock.style.display = "none";
		pause();
	}else{
		toggleClock.style.display = "inline-block";
		togglePause.style.display = "none";
	}
}

// moves the whole thing to different corners of the page
function movetl(){
	movingIt.style.top = "0";
	movingIt.style.left = "0";
	movingIt.style.bottom = "";
	movingIt.style.right = "";
}
function movetr(){
	movingIt.style.top = "0";
	movingIt.style.left = "";
	movingIt.style.bottom = "";
	movingIt.style.right = "0";
}
function movebl(){
	movingIt.style.top = "";
	movingIt.style.left = "0";
	movingIt.style.bottom = "0";
	movingIt.style.right = "";
}
function movebr(){
	movingIt.style.top = "";
	movingIt.style.left = "";
	movingIt.style.bottom = "0";
	movingIt.style.right = "0";
}

if(!alarm){
	setInterval(countdown, 1000);
}
// setInterval(countdown, 1000);
setInterval(updateClock, 1000);
