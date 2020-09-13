firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    // User is signed in.   

    document.getElementById("email").style.display = "none";
    document.getElementById("password").style.display = "none";
    document.getElementById("login").style.display = "none";
    document.getElementById("logout").style.display = "block";
    document.getElementById("create").style.display = "none";
    document.getElementById("head").innerHTML = "Welcome";



    var use = firebase.auth().currentUser;

    if (use != null) 
    {
      if (use.emailVerified) 
      {
        window.location.href = ("computer.html");
      }
      else
      {
        window.alert("Please verify your email to continue...");
      }
    }

  }
  else {
    // No user is signed in.
    document.getElementById("email").style.display = "block";
    document.getElementById("password").style.display = "block";
    document.getElementById("login").style.display = "block";
    document.getElementById("logout").style.display = "none";
    document.getElementById("create").style.display = "block";
    document.getElementById("head").innerHTML = "LOGIN";
    document.getElementById("user").innerHTML = "";

  }
});


function login() {
  var userEmail = document.getElementById("email").value;
  var userPass = document.getElementById("password").value;

  firebase.auth().signInWithEmailAndPassword(userEmail, userPass).then(function () {
    window.alert('Logged in successfully');
  }).catch(function (error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;

    window.alert("Error : " + errorMessage);

    // ...
  });
}

function create() {

  var userEmail = document.getElementById("email").value;
  var userPass = document.getElementById("password").value;
  firebase.auth().createUserWithEmailAndPassword(userEmail, userPass).then(function () {
    window.alert('Account successfully created \n' + document.getElementById("email").value);
    var user = firebase.auth().currentUser;

    user.sendEmailVerification().then(function () {
      window.alert('verification mail sent');
    }).catch(function (error) {
      // An error happened.
    });
  }).catch(function (error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    window.alert("Error : " + errorMessage);
    // ...
  });
}

function logout() {
  firebase.auth().signOut();
  window.location.href = ("index.html");
}
