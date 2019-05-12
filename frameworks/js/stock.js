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

function paginateTable() {
    $("#data-table").DataTable();
}

//get real time database, if changes made, refresh automatically
//db.collection('Stocks').orderBy("SKU").onSnapshot(snapshot =>{
//    let changes=snapshot.docChanges();
//    changes.forEach(change=>{
//        if(change.type=='added' || change.type=='modified'){
//            renderTable(change.querySnapshot)
//        }else if (change.type=='removed'){
//            let tr = StockList.querySelector('[data-id=' + change.doc.id +']');
//            StockList.removeChild(tr);
////            $('#data-table').removeChild(tr);
//        }
//    })
            
//            
//})
//
////Select table and form from the html file.
//const StockList = document.querySelector('#S_Content');
const form = document.querySelector('#add-stock-form');

var modal_Edit=document.getElementById('myModal2');
var form2 = document.querySelector('#edit-stock-form');
var span = document.getElementById("close");
var selectedID;
//var StocksArr=[];

//db.collection('Stocks').get().then((snapshot)=>{
//    snapshot.docs.forEach(doc =>{
//        
//    })
//})

//// populate the stock table with the data in the database
//function renderTable(querySnapshot){
db.collection("Stocks").get().then(function(querySnapshot){
        var productIDarray = [];
    var IDcounterForEachProduct=0;
    var content = "";   
    querySnapshot.forEach (function(doc){
        productIDarray[IDcounterForEachProduct]=doc.id;//mapping the index number to ID
        content += '<tr id="' + IDcounterForEachProduct + '">';
        content += '<td>' + doc.data().SKU + '</td>';
        content += '<td>' + doc.data().Category + '</td>';
        content += '<td>' + doc.data().Stock_Name + '</td>';
        content += '<td>' + doc.data().Stock_Quantity + '</td>';
        content += '<td>' + doc.data().Retail_Price + '</td>';
        content += '<td>' + doc.data().Stock_Price + '</td>';
        content += '<td>' + "<Button class='btn btn-outline-info btn-xs btnEdit'>Edit</Button><Button class='btn btn-outline-danger btn-xs btnDelete'>Delete</Button>" + '</td>';
        content += '</tr>';
        IDcounterForEachProduct++;
});
//    let tr = document.createElement('tr');
//    tr.className="text-center";
//    
//    let SKU = document.createElement('td');
//    let Category = document.createElement('td');
//    let S_Name = document.createElement('td');
//    let S_Quantity = document.createElement('td');
//    let Retail_Price = document.createElement('td');
//    let Ori_Price = document.createElement('td');
//    
    //creating button
//    var btnEdit=document.createElement("BUTTON");
//    btnEdit.innerHTML="Edit";
//    btnEdit.className="btn btn-outline-info btn-xs";
//    
//    var btnDelete=document.createElement("BUTTON");
//    btnDelete.innerHTML="Delete"
//    btnDelete.className="btn btn-outline-danger btn-xs"
    
    
//    var StockArr=[];
//    //var content = "";
//    
//    tr.setAttribute('data-id', doc.id);
//    SKU.textContent = doc.data().SKU;
//    Category.textContent=doc.data().Category;
//    S_Name.textContent=doc.data().Stock_Name;
//    S_Quantity.textContent=doc.data().Stock_Quantity;
//    Retail_Price.textContent=doc.data().Retail_Price;
//    Ori_Price.textContent=doc.data().Stock_Price;

    setTimeout(paginateTable,100); 

//    content += tr;
//    content += SKU;
//    content += Category;
//    content += S_Name;
//    content += S_Quantity;
//    content += Retail_Price;
//    content += Ori_Price;
//    
//    tr.appendChild(SKU);
//    tr.appendChild(Category);
//    tr.appendChild(S_Name);
//    tr.appendChild(S_Quantity);
//    tr.appendChild(Retail_Price);
//    tr.appendChild(Ori_Price);
//    tr.appendChild(btnEdit);
//    tr.appendChild(btnDelete);
//
//    StockList.append(tr); 
//    
//    
    
            $(document).on("click", ".btnDelete", function () {
            if (confirm("Proceed with Delete: click 'OK'\n")) {
                console.log("deleted button clicked"); //works
                var getrowIndex = $(this).closest('tr').attr('id');
                console.log(getrowIndex); //works
                var getPID = productIDarray[getrowIndex];
                console.log(getPID); //works
                $(this).closest('tr').remove();

                //now i have to delete the document with getPID from the database
                db.collection("Stocks").doc(getPID).delete().then(function () {
                    console.log("Document successfully deleted!");

                })
                //then triger a function that will delete the entire <tbody> and then reload it
            }
        })
        $("#data-table").append(content);
    var edit = document.getElementsByClassName("btnEdit");
    for (var i=0; i<edit.length;i++){
        edit[i].addEventListener('click', (e) => {
        e.stopPropagation();
            var getrowIndex = $(this).closest('tr').attr('data-id');
                console.log(getrowIndex); //works
                var getPID = productIDarray[getrowIndex];
                console.log(getPID); //works
//        let id = e.target.parentElement.getAttribute('data-id');
//        console.log("heres your id that you selected: "+ id);
//         selectedID=id;
//         console.log(selectedID);
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
    })}



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
    console.log("you added a new item!");
})

form2.addEventListener('submit', (e) => {
    e.preventDefault();
    //store field values to a new empty string.
    db.collection('Stocks').doc(selectedID).update({
        SKU: form2.Edit_SKUCode.value,
        Category: form2.Edit_Category.value,
        Stock_Name: form2.Edit_S_name.value,
        Stock_Quantity: form2.Edit_S_Qty.value,
        Retail_Price: form2.Edit_RPrice.value,
        Stock_Price: form2.Edit_SPrice.value
    });
   
    confirm("You had made the changes on the details!");
})
})