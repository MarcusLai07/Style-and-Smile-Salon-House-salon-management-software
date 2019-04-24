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

        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                console.log("you have signed in")
                //get user information
                var uid;
                uid = user.uid;
                console.log("User ID: " + user.uid);
        
                if (user.email == "admin@gmail.com") {    //if the user is the manager
                    var content = '<ul class="nav flex-column nav-pills"><h5 class="sidebar-heading mt-5 px-3 py-3"><span>Reports & Analytics</span></h5><li class="nav-item"><a class="nav-link text-white" href="Generate_Report.html"><i class="fas fa-file-invoice mr-3"></i>Generate Report</a></li><li class="nav-item"><a class="nav-link text-white" href="Generate_Forecast.html"><i class="fas fa-file-contract mr-3"></i>Generate Analytics</a></li></ul>';
                    document.getElementById("LogButton").innerHTML = "Manager Log Out";
                    $('#navigationSide').append(content);
                }
                if (user.email != "admin@gmail.com") {  //if the user is the staff or not manager       
                    document.getElementById("LogButton").innerHTML = "Staff Log Out"
                }
            } else {
                console.log("Signed off");
                window.location.replace("login.html")
            }
        })



//get real time database, if changes made, refresh automatically
db.collection('Members').orderBy("Member_ID").onSnapshot(snapshot =>{
    let changes=snapshot.docChanges();
    changes.forEach(change=>{
        if(change.type=='added'){
            renderTable(change.doc)
        }else if (change.type=='removed'){
            let tr = MembershipList.querySelector('[data-id=' + change.doc.id +']');
            MembershipList.removeChild(tr);
        }
    })
            
            
})

//Select table and form from the html file.

const MembershipList = document.querySelector('#M_Content');
const form = document.querySelector('#add-membership-form');


var modal_Edit=document.getElementById('myModal2');
var form2 = document.querySelector('#edit-membership-form');
var span = document.getElementById("close");
var selectedID;

// populate the membership table with the data in the database
function renderTable(doc){
    
    
    let tr = document.createElement('tr');
    tr.className="text-center"
    
    let M_id = document.createElement('td');
    let M_name = document.createElement('td');
    let M_phone = document.createElement('td');
    let M_email = document.createElement('td');
    
    //creating button
    
    var btnEdit=document.createElement("BUTTON");
    btnEdit.innerHTML="Edit";
    btnEdit.className="btn btn-outline-info btn-xs";
    
    
    
    var btn2=document.createElement("BUTTON");
    btn2.innerHTML="Delete"
    btn2.className="btn btn-outline-danger btn-xs"
    
    

    tr.setAttribute('data-id', doc.id);
    M_id.textContent = doc.data().Member_ID;
    M_name.textContent=doc.data().Member_Name;
    M_phone.textContent=doc.data().Member_Phone;
    M_email.textContent=doc.data().Member_Email;
    
    tr.appendChild(M_id);
    tr.appendChild(M_name);
    tr.appendChild(M_phone);
    tr.appendChild(M_email);
    tr.appendChild(btn2);
    tr.appendChild(btnEdit);

    
    MembershipList.append(tr); 
    
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
    
 

    
    btn2.addEventListener('click', (e) => {
        e.stopPropagation();
        let id = e.target.parentElement.getAttribute('data-id');
        console.log("heres your id that you selected: "+ id);
        db.collection('Members').doc(id).delete();
           alert("You had sucessfully delete the item from system! Your table will now be updated!");
    })
    


        
}


form.addEventListener('submit', (e) => {
    e.preventDefault();
    db.collection('Members').add({
        
        Member_Name: form.M_name.value,
        
        Member_ID: form.M_id.value,
        
        Member_Email: form.M_email.value,
        
        Member_Phone: form.M_phone.value
               
    })
    
    console.log("you added the new item!");
})

form2.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log("you edit the item!");
    //store field values to a new empty string.
    
    db.collection('Members').doc(selectedID).update({
       
        Member_Name: form2.Edit_name.value,
        
        Member_ID: form2.Edit_id.value,
        
        Member_Email: form2.Edit_email.value,
        
        Member_Phone: form2.Edit_phone.value
    })
   
})



        

////refresh page function
//
//function refreshPage()
//{
//    var x = confirm("You had sucessfully delete the item from the System!");
//    if(x==true)
//        {
//            document.location.reload(true);
//        }
//}




