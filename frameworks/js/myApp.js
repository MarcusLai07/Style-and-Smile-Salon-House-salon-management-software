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


//Select table and form from the html file.

const MembershipList = document.querySelector('#M_Content');
const form = document.querySelector('#add-membership-form');
const Edit_Form = document.querySelector('#edit-membership-form');
var modal_E = document.getElementById('myModal_E');

// populate the membership table with the data in the database
function renderTable(doc){
    let tr = document.createElement('tr');
    tr.className="text-center"
    
    let M_id = document.createElement('td');
    let M_name = document.createElement('td');
    let M_phone = document.createElement('td');
    let M_email = document.createElement('td');
    
    //creating button
    var btn=document.createElement("BUTTON");
    btn.innerHTML="Edit"
    btn.className="btn btn-outline-info btn-xs"
    btn.id= "M_Edit";
    
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
    tr.appendChild(btn);
    tr.appendChild(btn2);

    
    MembershipList.append(tr); 
    
var span2 = document.getElementsByClassName("close1")[0];
btn.onclick = function() {
  modal_E.style.display = "block";
}


span2.onclick = function() {
  modal.style.display = "none";
}




    
    btn2.addEventListener('click', (e) => {
        e.stopPropagation();
        let id = e.target.parentElement.getAttribute('data-id');
        db.collection('Members').doc(id).delete();
           confirm("You had sucessfully delete the item from system! Please refresh the table!");
    })
    
//    Edit_Form.addEventListener('click', (e) => {
//        e.stopPropagation();
//        let id = e.target.parentElement.getAttribute('data-id');
//        db.collection('Members').doc(id).update({
//        Member_Name: Edit_Form.M_name.value,
//        
//        Member_ID: Edit_Form.M_id.value,
//        
//        Member_Email: Edit_Form.M_email.value,
//        
//        Member_Phone: Edit_Form.M_phone.value
//        })
//        console.log(M_name.value);
//    })
//
//    
        
}

//render the table to the web UI
db.collection('Members').orderBy("Member_ID").get().then((snapshot) => {
    snapshot.docs.forEach(doc => {
        renderTable(doc);
        console.log(doc);
    })
})

/*db.collection('Staffs').get().then((snapshot) => {
    snapshot.docs.forEach(doc => {
        console.log(doc.data())
    })
})*/



form.addEventListener('submit', (e) => {
    e.preventDefault();
    db.collection('Members').add({
        
        Member_Name: form.M_name.value,
        
        Member_ID: form.M_id.value,
        
        Member_Email: form.M_email.value,
        
        Member_Phone: form.M_phone.value
               
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




