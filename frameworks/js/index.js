var inDex = {};
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
    const db = firebase.firestore();
    db.settings({timestampsInSnapshots: true})

function getSelectedService(){
    var selectedValue = document.getElementById("S_Content").value;
    var selectedText = document.getElementById("S_Content").options[S_Content.selectedIndex].innerHTML;
    console.log(selectedValue + selectedText);

    listNode = document.getElementById('S_List');
    liNode = document.createElement("LI");
    txt = document.createTextNode(selectedText + " RM" + selectedValue);

    liNode.appendChild(txt);
    listNode.appendChild(liNode);
}

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