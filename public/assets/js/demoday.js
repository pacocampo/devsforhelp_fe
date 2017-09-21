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
    var ref = database.ref('demo_day');
  
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
      var clase = getValueFromRadio('clase');
      var posicion = document.getElementById('position');
      var comunidad = document.getElementById('community');
  
      // this validates the precence of inportant inputs and add the invalid class in case of empty  
      var inputsAreValid = isValidInputField(nombre) && isValidInputField(correo) && isValidInputField(tel) && isValidInputField(posicion);
      if (inputsAreValid) {
        return {
          nombre: nombre.value,
          correo: correo.value,
          tel: tel.value,
          clase: clase,
          posicion : posicion.value,
          comunidad: comunidad.value
        }
      }
  
      return false;
    }

    
  // This verifies if the inputs has value
  function isValidInputField(inputElement) {
    if (!inputElement.value){
      inputElement.setAttribute('class', 'validate invalid');
      return false
    }
    return true;
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
      sendRequest(requestData); 
    }
  });
})();
