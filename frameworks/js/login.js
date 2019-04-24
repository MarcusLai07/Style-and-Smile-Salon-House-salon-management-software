var app_fireBase = {};
(function(){
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

  app_fireBase = firebase;

  var ui = new firebaseui.auth.AuthUI(firebase.auth());
  var uiConfig = {
    callbacks: {
      signInSuccessWithAuthResult: function(authResult, redirectUrl) {
        // User successfully signed in.
        // Return type determines whether we continue the redirect automatically
        // or whether we leave that to developer to handle.
        return true;
      },
      uiShown: function() {
        // The widget is rendered.
        // Hide the loader.
        document.getElementById('loader').style.display = 'none';
      }
    },
    // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
    signInFlow: 'popup',
    signInSuccessUrl: 'index.html',
    signInOptions: [
      // Leave the lines as is for the providers you want to offer your users.
      firebase.auth.EmailAuthProvider.PROVIDER_ID
    ],
    // // Terms of service url.
    // tosUrl: 'index.html',
    // // Privacy policy url.
    // privacyPolicyUrl: 'index.html'
  };

  // The start method will wait until the DOM is loaded.
  ui.start('#firebaseui-auth-container', uiConfig);

}());
