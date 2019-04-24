// Initialize Firebase
var config = {
    apiKey: "AIzaSyB8gd8MusZyqJ0vLQFkgoUX8E6A6RP5t_A",
    authDomain: "style-and-smile-salon-house.firebaseapp.com",
    databaseURL: "https://style-and-smile-salon-house.firebaseio.com",
    projectId: "style-and-smile-salon-house",
    storageBucket: "style-and-smile-salon-house.appspot.com",
    messagingSenderId: "1030007772704"
 };
 firebase.initializeApp(config);

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      console.log(user.email + " signed in");
      if (user.email =="admin@gmail.com"){
        window.location.replace("index.html");
      }
  
      if(user != null){
        console.log("Welcome " + user.email);
      }
    } else {
      // No user is signed in.
      console.log("Not signed in")
    }
});
  
$(document).on("click", "#Loginbtn", function (){
    var userEmail = document.getElementById("emailfield").value;
    var userPass = document.getElementById("passwordfield").value;

    firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;

      window.alert("Error : " + errorMessage);
    });
});
  
  //function logout(){
  //  firebase.auth().signOut();
  //}