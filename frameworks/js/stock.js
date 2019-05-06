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


//get real time database, if changes made, refresh automatically
db.collection('Stocks').orderBy("SKU").onSnapshot(snapshot =>{
    let changes=snapshot.docChanges();
    changes.forEach(change=>{
        if(change.type=='added'){
            renderTable(change.doc)
        }else if (change.type=='removed'){
            let tr = StockList.querySelector('[data-id=' + change.doc.id +']');
            StockList.removeChild(tr);
        }
    })
            
            
})
//
////Select table and form from the html file.
const StockList = document.querySelector('#S_Content');
const form = document.querySelector('#add-stock-form');

var modal_Edit=document.getElementById('myModal2');
var form2 = document.querySelector('#edit-stock-form');
var span = document.getElementById("close");
var selectedID;

//// populate the stock table with the data in the database
function renderTable(doc){
    
    let tr = document.createElement('tr');
    tr.className="text-center"
    
    let SKU = document.createElement('td');
    let Category = document.createElement('td');
    let S_Name = document.createElement('td');
    let S_Quantity = document.createElement('td');
    let Retail_Price = document.createElement('td');
    let Ori_Price = document.createElement('td');
    
    //creating button
    var btnEdit=document.createElement("BUTTON");
    btnEdit.innerHTML="Edit";
    btnEdit.className="btn btn-outline-info btn-xs";
    
    var btnDelete=document.createElement("BUTTON");
    btnDelete.innerHTML="Delete"
    btnDelete.className="btn btn-outline-danger btn-xs"
    
    tr.setAttribute('data-id', doc.id);
    SKU.textContent = doc.data().SKU;
    Category.textContent=doc.data().Category;
    S_Name.textContent=doc.data().Stock_Name;
    S_Quantity.textContent=doc.data().Stock_Quantity;
    Retail_Price.textContent=doc.data().Retail_Price;
    Ori_Price.textContent=doc.data().Stock_Price;
    
    tr.appendChild(SKU);
    tr.appendChild(Category);
    tr.appendChild(S_Name);
    tr.appendChild(S_Quantity);
    tr.appendChild(Retail_Price);
    tr.appendChild(Ori_Price);
    tr.appendChild(btnEdit);
    tr.appendChild(btnDelete);
   
    StockList.append(tr); 
    
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
        db.collection('Stocks').doc(id).delete();
          alert("You had sucessfully delete the item from system! Your table will now be updated!");
    })  
}


form.addEventListener('submit', (e) => {
    e.preventDefault();
    db.collection('Stocks').add({
        SKU: form.SKUCode.value,
        Category: form.Category.value,
        Stock_Name: form.S_name.value,
        Stock_Quantity: form.S_Qty.value,
        Retail_Price: form.RPrice.value,
        Stock_Price: form.SPrice.value
    })
    console.log("you added the new item!");
})

form2.addEventListener('submit', (e) => {
    e.preventDefault();
    //store field values to a new empty string.
    db.collection('Members').doc(selectedID).update({
        Member_Name: form2.Edit_name.value,
        Member_ID: form2.Edit_id.value,
        Member_Email: form2.Edit_email.value,
        Member_Phone: form2.Edit_phone.value
    })
   
    confirm("You had made the changes on the details! Please refresh the page!");
    console.log("you edit the item!");
})