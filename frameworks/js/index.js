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

const SummaryS = document.querySelector('#PurchaseServicesSummary');
const ServiceList = document.querySelector('#S_Content');
const SummaryI = document.querySelector('#PurchaseItemsSummary');
const ItemList = document.querySelector('#I_Content');
const SummaryT = document.querySelector('#TotalSummary');
var totalprice = 0;

function renderTotalPrice(){
    let tr = document.createElement('tr');
    tr.className = "text-center";
    tr.id = "totalsum"

    let P_total = document.createElement('td');
    var btnEdit=document.createElement("BUTTON");
    btnEdit.innerHTML="Edit";
    btnEdit.className="btn btn-outline-info btn-xs";
    var btnConfirm=document.createElement("BUTTON");
    btnConfirm.innerHTML="Confirm";
    btnConfirm.className="btn btn-outline-primary btn-xs";

    atr = document.getElementById("TotalSummary");
    if($('#totalsum').length){
        document.getElementById("TotalSummary").deleteRow(0);
    }

    CurrentTotal = totalprice;
    Total = document.createTextNode("RM"+totalprice);
    P_total.appendChild(Total);
    tr.appendChild(P_total);
    tr.appendChild(btnEdit);
    tr.appendChild(btnConfirm);
    SummaryT.append(tr);
}

//get real time database, if changes made, refresh automatically
db.collection('Services').orderBy("Service_Name").onSnapshot(snapshot =>{
    let changes=snapshot.docChanges();
    changes.forEach(change=>{
        if(change.type=='added'){
            renderServices(change.doc)
        }else if (change.type=='removed'){
            let tr = ServiceList.querySelector('[data-id=' + change.doc.id +']');
            ServiceList.removeChild(tr);
        }
    })
})
function renderServices(doc){
    let optionlist = document.createElement('option');
    optionlist.textContent = doc.data().Service_Name;
    optionlist.value = doc.data().Service_Price;
    ServiceList.append(optionlist);
}
function getSelectedService(){
    var selectedValue = document.getElementById("S_Content").value;
    var selectedText = document.getElementById("S_Content").options[S_Content.selectedIndex].innerHTML;
    var initialP = parseInt(totalprice,10);
    var tempprice = parseInt(selectedValue,10);
    totalprice = initialP + tempprice;
    console.log(selectedValue + " " + selectedText);
    console.log(totalprice);

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

    SummaryS.append(tr);

    btnEdit.addEventListener('click', (e) => {
        e.stopPropagation();
        
    })
    btnDelete.addEventListener('click', function(e){
        // var temp = e.target.parentElement.S_value;
        // var deltemp = parseInt(temp,10);
        // console.log(temp);
        e.target.parentElement.remove();
    })
}


//get real time database, if changes made, refresh automatically
db.collection('Stocks').orderBy("SKU").onSnapshot(snapshot =>{
    let changes=snapshot.docChanges();
    changes.forEach(change=>{
        if(change.type=='added'){
            renderItems(change.doc)
        }else if (change.type=='removed'){
            let tr = ItemList.querySelector('[data-id=' + change.doc.id +']');
            ItemList.removeChild(tr);
        }
    })
})
function renderItems(doc){
    let optionlist = document.createElement('option');
    optionlist.textContent = doc.data().Stock_Name;
    optionlist.value = doc.data().Stock_Price;
    ItemList.append(optionlist);
}
function getSelectedItem(){
    var selectedValue = document.getElementById("I_Content").value;
    var selectedText = document.getElementById("I_Content").options[I_Content.selectedIndex].innerHTML;
    var initialP = parseInt(totalprice,10);
    var tempprice = parseInt(selectedValue,10);
    totalprice = initialP + tempprice;
    console.log(selectedValue + " " + selectedText);
    console.log(totalprice);

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

    SummaryI.append(tr);

    btnEdit.addEventListener('click', (e) => {
        e.stopPropagation();
        
    })
    btnDelete.addEventListener('click', function(e){
        // var temp = e.target.parentElement.S_value;
        // var deltemp = parseInt(temp,10);
        // console.log(temp);
        e.target.parentElement.remove();
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