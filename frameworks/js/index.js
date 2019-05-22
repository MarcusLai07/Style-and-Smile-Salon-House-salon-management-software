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
db.settings({
    timestampsInSnapshots: true
})

//Declare a variable to keep track on today's date
var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = String(today.getFullYear());

var today = dd + '/' + mm + '/' + yyyy;
console.log(today);

const SummaryS = document.querySelector('#PurchaseServicesSummary');
const ServiceList = document.querySelector('#S_Content');
const SummaryI = document.querySelector('#PurchaseItemsSummary');
const ItemList = document.querySelector('#I_Content');
const SummaryT = document.querySelector('#TotalSummary');
var totalprice = 0;
var modal_Edit = document.getElementById('myModal3');
var span = document.getElementById("close");

function renderTotalPrice() {
    let tr = document.createElement('tr');
    tr.className = "text-center";
    tr.id = "totalsum"

    let P_total = document.createElement('td');
    var btnEdit = document.createElement("BUTTON");
    btnEdit.innerHTML = "Edit";
    btnEdit.className = "btn btn-outline-info btn-xs";
    var btnConfirm = document.createElement("BUTTON");
    btnConfirm.innerHTML = "Confirm";
    btnConfirm.className = "btn btn-outline-primary btn-xs";

    atr = document.getElementById("TotalSummary");
    if ($('#totalsum').length) {
        document.getElementById("TotalSummary").deleteRow(0);
    }

    Total = document.createTextNode("RM" + totalprice);
    P_total.appendChild(Total);
    tr.appendChild(P_total);
    tr.appendChild(btnEdit);
    tr.appendChild(btnConfirm);
    SummaryT.append(tr);

    btnConfirm.addEventListener('click', (e) => {
        e.preventDefault();
        db.collection('Sales').add({
            Services_Items: today,
            Sum_Sales: totalprice
        })
    })
}

//get real time database, if changes made, refresh automatically
db.collection('Services').orderBy("Service_Name").onSnapshot(snapshot => {
    let changes = snapshot.docChanges();
    changes.forEach(change => {
        if (change.type == 'added') {
            renderServices(change.doc)
        } else if (change.type == 'removed') {
            let tr = ServiceList.querySelector('[data-id=' + change.doc.id + ']');
            ServiceList.removeChild(tr);
        }
    })
})

function renderServices(doc) {
    let optionlist = document.createElement('option');
    optionlist.textContent = doc.data().Service_Name;
    optionlist.value = doc.data().Service_Price;
    ServiceList.append(optionlist);
}

function getSelectedService() {
    var selectedValue = document.getElementById("S_Content").value;
    var selectedText = document.getElementById("S_Content").options[S_Content.selectedIndex].innerHTML;
   
    
    var initialP = parseInt(totalprice, 10);
    var tempprice = parseInt(selectedValue, 10);
    totalprice = initialP + tempprice;
    console.log(selectedValue + " " + selectedText);
    console.log(totalprice);

    let tr = document.createElement('tr');
    tr.className = "text-center";

    let S_txt = document.createElement('td');
    S_txt.textContent = selectedText;
    let S_value = document.createElement('td');
    S_value.textContent = selectedValue;

    var btnEdit = document.createElement("BUTTON");
    btnEdit.innerHTML = "Edit";
    btnEdit.className = "btn btn-outline-info btn-xs";
    btnEdit.id = "myBtn";

    var btnDelete = document.createElement("BUTTON");
    btnDelete.innerHTML = "Delete";
    btnDelete.className = "btn btn-outline-danger btn-xs";

    reappend();

    function reappend() {
        tr.appendChild(S_txt);
        tr.appendChild(S_value);
        tr.appendChild(btnEdit);
        tr.appendChild(btnDelete);
        SummaryS.append(tr);
    }

    btnEdit.addEventListener('click', (e) => {
        var temp = S_value.textContent;
        var deltemp = parseInt(temp, 10);
        discount = deltemp / 2;
        S_value.textContent = discount;
        totalprice -= discount;
        console.log(totalprice);

    })
    btnDelete.addEventListener('click', function (e) {
        var temp = S_value.textContent;
        var deltemp = parseInt(temp, 10);
        totalprice -= deltemp;
        console.log(totalprice);
        e.target.parentElement.remove();
    })
}

//get real time database, if changes made, refresh automatically
db.collection('Stocks').orderBy("SKU").onSnapshot(snapshot => {
    let changes = snapshot.docChanges();
    changes.forEach(change => {
        if (change.type == 'added') {
            renderItems(change.doc)
        } else if (change.type == 'removed') {
            let tr = ItemList.querySelector('[data-id=' + change.doc.id + ']');
            ItemList.removeChild(tr);
        }
    })
})

function renderItems(doc) {
    let optionlist = document.createElement('option');
    optionlist.textContent = doc.data().Stock_Name;
    optionlist.value = doc.data().Retail_Price;
    ItemList.append(optionlist);
}

function getSelectedItem() {
    var selectedValue = document.getElementById("I_Content").value;
    var selectedText = document.getElementById("I_Content").options[I_Content.selectedIndex].innerHTML;
    var initialP = parseInt(totalprice, 10);
    var tempprice = parseInt(selectedValue, 10);
    totalprice = initialP + tempprice;
    console.log(selectedValue + " " + selectedText);
    console.log(totalprice);

    let tr = document.createElement('tr');
    tr.className = "text-center";

    let S_txt = document.createElement('td');
    S_txt.textContent = selectedText;
    let S_value = document.createElement('td');
    S_value.textContent = selectedValue;

    var btnEdit = document.createElement("BUTTON");
    btnEdit.innerHTML = "Edit";
    btnEdit.className = "btn btn-outline-info btn-xs";

    var btnDelete = document.createElement("BUTTON");
    btnDelete.innerHTML = "Delete";
    btnDelete.className = "btn btn-outline-danger btn-xs";

    reappend();

    function reappend() {
        tr.appendChild(S_txt);
        tr.appendChild(S_value);
        tr.appendChild(btnEdit);
        tr.appendChild(btnDelete);
        SummaryI.append(tr);
    }

    btnEdit.addEventListener('click', (e) => {
        e.stopPropagation();

        modal_Edit.style.display="block";
      
    })
    btnDelete.addEventListener('click', function (e) {
        var temp = S_value.textContent;
        var parsetemp = parseInt(temp, 10);
        totalprice -= parsetemp;
        console.log(totalprice);
        e.target.parentElement.remove();
    })
}

function Calculate(){
    document.getElementById('calculate').addEventListener("click", (e) =>{
        var percent = document.getElementById('discountpercent').value;
        var parsepercent = parseFloat(percent, 10).toFixed(2);
        var calcpercent = 100 - parsepercent;
        var temp = S_value.textContent;
        var parsetemp = parseFloat(temp, 10).toFixed(2);
        discount = (parsetemp/100)*50; //calcpercent;
        S_value.textContent = discount.toFixed(2);
        totalprice -= discount;
        console.log(totalprice);
    });
}

//logout module
var firebase = app_fireBase;
var uid = null;
firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        // User is signed in.
        user = user.uid;
    } else {
        uid = null;
        window.location.replace("login.html");
    }
});

function logOut() {
    firebase.auth().signOut();
}
inDex.logOut = logOut;
