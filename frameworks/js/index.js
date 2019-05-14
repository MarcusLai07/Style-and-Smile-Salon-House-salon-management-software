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

    const Summary = document.querySelector('#PurchaseSummary');

function getSelectedService(){
    var selectedValue = document.getElementById("S_Content").value;
    var selectedText = document.getElementById("S_Content").options[S_Content.selectedIndex].innerHTML;

    let tr = document.createElement('tr');
    tr.className = "text-center";

    let S_txt = document.createElement('td');
    let S_value = document.createElement('td');
    var btnEdit=document.createElement("BUTTON");
    btnEdit.innerHTML="Edit";
    btnEdit.className="btn btn-outline-info btn-xs";
    var btnDelete=document.createElement("BUTTON");
    btnDelete.innerHTML="Delete";
    btnDelete.className="btn btn-outline-danger btn-xs";

    Stxt = document.createTextNode(selectedText);
    Svalue = document.createTextNode("RM"+selectedValue);

    S_txt.appendChild(Stxt);
    S_value.appendChild(Svalue);
    tr.appendChild(S_txt);
    tr.appendChild(S_value);
    tr.appendChild(btnEdit);
    tr.appendChild(btnDelete);

    Summary.append(tr);

    btnEdit.addEventListener('click', (e) => {
        e.stopPropagation();
        let id = e.target.parentElement.getAttribute('data-id');
        console.log("heres your id that you selected: "+ id);
         selectedID=id;
         console.log(selectedID);
         modal_Edit.style.display="block";
         span.onclick=function()
         {
             modal_Edit.style.display="none";
         }
         window.onclick=function(event)
         {
             if(event.target==modal_Edit)
                 {
                     modal_Edit.style.display="none";
                 }
         }
    })
    btnDelete.addEventListener('click', (e) => {
        e.stopPropagation();
        let id = e.target.parentElement.getAttribute('data-id');
        console.log("heres your id that you selected: "+ id);
        db.collection('Members').doc(id).delete();
           alert("You had sucessfully delete the item from system! Your table will now be updated!");
    })

}
function getSelectedItem(){
    var selectedValue = document.getElementById("I_Content").value;
    var selectedText = document.getElementById("I_Content").options[I_Content.selectedIndex].innerHTML;

    let tr = document.createElement('tr');
    tr.className = "text-center";

    let S_txt = document.createElement('td');
    let S_value = document.createElement('td');
    var btnEdit=document.createElement("BUTTON");
    btnEdit.innerHTML="Edit";
    btnEdit.className="btn btn-outline-info btn-xs";
    var btnDelete=document.createElement("BUTTON");
    btnDelete.innerHTML="Delete";
    btnDelete.className="btn btn-outline-danger btn-xs";

    Stxt = document.createTextNode(selectedText);
    Svalue = document.createTextNode("RM"+selectedValue);

    S_txt.appendChild(Stxt);
    S_value.appendChild(Svalue);
    tr.appendChild(S_txt);
    tr.appendChild(S_value);
    tr.appendChild(btnEdit);
    tr.appendChild(btnDelete);

    Summary.append(tr);

    btnEdit.addEventListener('click', (e) => {
        e.stopPropagation();
        let id = e.target.parentElement.getAttribute('data-id');
        console.log("heres your id that you selected: "+ id);
         selectedID=id;
         console.log(selectedID);
         modal_Edit.style.display="block";
         span.onclick=function()
         {
             modal_Edit.style.display="none";
         }
         window.onclick=function(event)
         {
             if(event.target==modal_Edit)
                 {
                     modal_Edit.style.display="none";
                 }
         }
    })
    btnDelete.addEventListener('click', (e) => {
        e.stopPropagation();
        let id = e.target.parentElement.getAttribute('data-id');
        console.log("heres your id that you selected: "+ id);
        db.collection('Members').doc(id).delete();
           alert("You had sucessfully delete the item from system! Your table will now be updated!");
    })
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