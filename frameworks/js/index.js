var inDex = {};

(function(){

    //logout module
    var firebase = app_fireBase;
    var uid = null;
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            // User is signed in.
            user = user.uid;
        }else{
            uid = null;
            window.location.replace("login.html");
        }
    });
    function logOut(){
        firebase.auth().signOut();
    }
    inDex.logOut = logOut;

})()