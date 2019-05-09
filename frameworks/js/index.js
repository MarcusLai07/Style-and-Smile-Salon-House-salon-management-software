var inDex = {};

// Material Select Initialization
$(document).ready(function() {
    $('.mdb-select').materialSelect();
    $('.select-wrapper.md-form.md-outline input.select-dropdown').bind('focus blur', function () {
    $(this).closest('.select-outline').find('label').toggleClass('active');
    $(this).closest('.select-outline').find('.caret').toggleClass('active');
    });
});

// SideNav Button Initialization
$(".button-collapse").sideNav();
// SideNav Scrollbar Initialization
var sideNavScrollbar = document.querySelector('.custom-scrollbar');
var ps = new PerfectScrollbar(sideNavScrollbar);

function GetServices() {
    var services = document.getElementById("services");
    var selectedText = services.options[services.selectedIndex].innerHTML;
    var selectedValue = services.value;
    alert("Selected Text: " + selectedText + " Value: " + selectedValue);
}
function GetItems() {
    var items = document.getElementById("items");
    var selectedText = items.options[items.selectedIndex].innerHTML;
    var selectedValue = items.value;
    alert("Selected Text: " + selectedText + " Value: " + selectedValue);
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