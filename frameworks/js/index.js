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
    var selectedValue = services.value;
    console.log(selectedValue);
    //var services = document.querySelectorAll("#services li");    
    for(var i = 0; i < services.length; i++)
    {
        services[i].onclick = function(){
            var newService = document.createElement("LI");
            var textnode = document.getElementById("summarylist").value = this.innerHTML;
            newService.appendChild(textnode);
            var list = document.getElementById("summarylist");
            list.insertBefore(newItem, list.childNodes[0]);
        };
    }
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