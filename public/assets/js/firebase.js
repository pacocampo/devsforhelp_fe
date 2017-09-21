(function(){
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDzpVSRUE8r6tUiVbRYB67OJ6Sv8ewnegY",
    authDomain: "centraal-academy.firebaseapp.com",
    databaseURL: "https://centraal-academy.firebaseio.com",
    projectId: "centraal-academy",
    storageBucket: "centraal-academy.appspot.com",
    messagingSenderId: "460520129357"
  };

  // Get the Firebase app and all primitives we'll use
  firebase.initializeApp(config);

  var database = firebase.database();
  var ref = database.ref('solicitudes');
  var location = "";

  // This get data from one radio button
  function getValueFromRadio(radioName){
    var radios = document.getElementsByName(radioName);
    for (var i = 0; i < radios.length; i++) {
      if (radios[i].checked) {
        return radios[i].value;
      }
    }
  }

  // this remove the wrong message when input is clicked
  var inputs = document.getElementsByTagName("input")
  for (input of inputs) {
    input.addEventListener('click', function(){
      this.setAttribute('class','validate');
    })
  }

  // This get data from form
  function getDataFromForm() {
    var nombre = document.getElementById('full_name');
    var correo = document.getElementById('email');
    var tel = document.getElementById('telephone');
    var programa = getValueFromRadio('program');
    var sede = getValueFromRadio('headquarter');
    var comentario = document.getElementById('comment');

    // this validates the precence of inportant inputs and add the invalid class in case of empty  
    var inputsAreValid = isValidInputField(nombre) && isValidInputField(correo) && isValidInputField(tel);
    if (inputsAreValid) {
      return {
        nombre: nombre.value,
        correo: correo.value,
        tel: tel.value,
        programa: programa,
        sede : sede,
        comentario: comentario.value
      }
    }

    return false;
  }

  // This get Location from browser
  function getLocation() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(saveLocation);
    }
  }

  // This verifies if the inputs has value
  function isValidInputField(inputElement) {
    if (!inputElement.value){
      inputElement.setAttribute('class', 'validate invalid');
      return false
    }
    return true;
  }

  //This saves locations
  function saveLocation(position) {
    location = {
      latitude : position.coords.latitude,
      longitude : position.coords.longitude
    };
  }

  // This saves data in firebase
  function sendRequest(requestData) {
    ref.push(requestData);
    document.querySelector('#inscribete').style.display = 'none';
    document.querySelector('#alert').style.display = "block";
  }

  document.querySelector("#submit-button").addEventListener("click", function(e){
    e.preventDefault();
    var requestData = getDataFromForm();
    if (requestData) {
      if (location) {
        requestData.location = location;
      }
      sendRequest(requestData); 
    }
  });

  getLocation();

})();

(function(deadLine, countDownId) {

  function getTimeRemaining(deadLine) {
    var remaining = Date.parse(deadLine) - Date.parse(new Date());
    var days = Math.floor(remaining / (86400000));
    var hours = Math.floor((remaining / (3600000)) % 24);
    var minutes = Math.floor((remaining / 1000 / 60) % 60);
    var seconds = Math.floor((remaining / 1000) % 60);
    return {
      'remaining': remaining,
      'days': days,
      'hours': hours,
      'minutes': minutes,
      'seconds': seconds
    };
  }

  function updateCountDown(deadLine, countDownElements) {
    var timeRemaining = getTimeRemaining(deadLine);

    if (timeRemaining.remaining <= 0) {
      clearInterval(this.interval);
      return;
    }

    countDownElements.days.innerHTML = timeRemaining.days;
    countDownElements.hours.innerHTML = ('0' + timeRemaining.hours).slice(-2);
    countDownElements.minutes.innerHTML = ('0' + timeRemaining.minutes).slice(-2);
    countDownElements.seconds.innerHTML = ('0' + timeRemaining.seconds).slice(-2);

  }

  function initializeCountDown(deadLine, countDownId) {
    var countDownNode = document.getElementById(countDownId);
    var countDownElements = {};
    countDownElements.days = countDownNode.querySelector('.countdown-days');
    countDownElements.hours = countDownNode.querySelector('.countdown-hours');
    countDownElements.minutes = countDownNode.querySelector('.countdown-minutes');
    countDownElements.seconds = countDownNode.querySelector('.countdown-seconds');

    var context = {};
    var updateCountDownBinded = updateCountDown.bind(context, deadLine, countDownElements);
    context.invertal = setInterval(updateCountDownBinded, 1000);
  }

  // initializeCountDown(deadLine, countDownId);
})(new Date('2017/09/3 19:00:00'), 'countdown');
