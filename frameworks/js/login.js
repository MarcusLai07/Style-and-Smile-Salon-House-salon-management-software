
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      console.log(user.email + " signed in");
      if (user.email =="admin@sssh.com"){
        window.location.replace("index.html");
      }else {
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
  
    var userEmail = document.getElementById("email_field").value;
    var userPass = document.getElementById("password_field").value;
  
    firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
  
      window.alert("Error : " + errorMessage);
    });
  })
  
  //function logout(){
  //  firebase.auth().signOut();
  //}