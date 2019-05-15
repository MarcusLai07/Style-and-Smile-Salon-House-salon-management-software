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
db.collection('Staffs').orderBy("Staff_ID").onSnapshot(snapshot =>{
    let changes=snapshot.docChanges();
    changes.forEach(change=>{
        if(change.type=='added'){
            renderTable(change.doc)
        }else if (change.type=='removed'){
            let tr = StaffList.querySelector('[data-id=' + change.doc.id +']');
            StaffList.removeChild(tr);
        }
    })
    console.log("you gain some data")
            
            
});





//Select table and form from the html file.

const StaffList = document.querySelector('#data_content');
const Add_Form = document.querySelector('#add-staff-form');


var modal_Edit=document.getElementById('myModal2');
var Edit_Form = document.querySelector('#edit-staff-form');
var span = document.getElementById("close");
var selectedID;

// populate the membership table with the data in the database
function renderTable(doc){
    console.log("you just run me");
    
    
    let tr = document.createElement('tr');
    tr.className="text-center"
    
    let Staff_id = document.createElement('td');
    let Staff_Name = document.createElement('td');
    let Staff_Gender = document.createElement('td');
    let Staff_PNumb = document.createElement('td');
    let Staff_Pos = document.createElement('td');
    let Staff_Sly = document.createElement('td');
    
    //creating button
    
    var btnEdit=document.createElement("BUTTON");
    btnEdit.innerHTML="Edit";
    btnEdit.className="btn btn-outline-info btn-xs";
    
    
    
    var btnDelete=document.createElement("BUTTON");
    btnDelete.innerHTML="Delete"
    btnDelete.className="btn btn-outline-danger btn-xs"
    
    

    tr.setAttribute('data-id', doc.id);
    Staff_id.textContent = doc.data().Staff_ID;
    Staff_Name.textContent=doc.data().Staff_Name;
    Staff_Gender.textContent=doc.data().Staff_Gender;
    Staff_PNumb.textContent=doc.data().Staff_PNum;
    Staff_Pos.textContent=doc.data().Staff_Position;
    Staff_Sly.textContent=doc.data().Staff_Salary;
    
    tr.appendChild(Staff_id);
    tr.appendChild(Staff_Name);
    tr.appendChild(Staff_Gender);
    tr.appendChild(Staff_PNumb);
    tr.appendChild(Staff_Pos);
    tr.appendChild(Staff_Sly);
    tr.appendChild(btnEdit);
    tr.appendChild(btnDelete);

    
    StaffList.append(tr); 
    
     btnEdit.addEventListener('click', (e) => {
        e.stopPropagation();
        let id = e.target.parentElement.getAttribute('data-id');
        console.log("heres your id that you selected: "+ id);
         selectedID=id;
         console.log(selectedID);
         modal_Edit.style.display="block";
    })
    
 

    
    btnDelete.addEventListener('click', (e) => {
        e.stopPropagation();
        let id = e.target.parentElement.getAttribute('data-id');
        console.log("heres your id that you selected: "+ id);
        db.collection('Staffs').doc(id).delete();
           alert("You had sucessfully delete the item from system! Your table will now be updated!");
    })
    


        
}

Add_Form.addEventListener('submit', (e) => {
    e.preventDefault();
    db.collection('Staffs').add({
        
        Staff_ID: Add_Form.ID.value,
        
        Staff_Name: Add_Form.Name.value,
        
        Staff_Gender: Add_Form.Gender.value,
        
        Staff_PNum: Add_Form.PNum.value,
        
        Staff_Position: Add_Form.Pos.value,
        
        Staff_Salary: Add_Form.Salary.value
               
    })
})


Edit_Form.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log("you edit the item!");
    //store field values to a new empty string.
    
    db.collection('Staffs').doc(selectedID).update({
       
        Staff_ID: Edit_Form.ID.value,
        
        Staff_Name: Edit_Form.Name.value,
        
        Staff_Gender: Edit_Form.Gender.value,
        
        Staff_PNum: Edit_Form.PNum.value,
        
        Staff_Position: Edit_Form.Pos.value,
        
        Staff_Salary: Edit_Form.Salary.value
    })
   
});




