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


var staffName=[];
var dbDate=[];
var dbTime=[];

//get real time database, if changes made, refresh automatically
db.collection('Appointment').orderBy('date').orderBy('time').onSnapshot(snapshot =>{
    let changes=snapshot.docChanges();
    changes.forEach(change=>{
        if(change.type=='added'){
            renderAppointment(change.doc)
		  
			
        }else if (change.type=='removed'){
            let tr = AppointmentList.querySelector('[data-id=' + change.doc.id +']');
            AppointmentList.removeChild(tr);
        }
    })
	
});


db.collection('Appointment').get().then((snapshot)=>{
    snapshot.docs.forEach(doc=>{
		
        dbDate.push(doc.data().date)
		dbTime.push(doc.data().time)
    }) 
    
})
  

//get staff database to display name on the option list in the form.
db.collection('Staffs').orderBy("Staff_ID").get().then((snapshot)=>{
    snapshot.docs.forEach(doc=>{
        
            staffName.push(doc.data().Staff_Name)
    }) 
    
})


//Declare a variable to keep track on today's date
	var today = new Date();
	var dd = String(today.getDate()).padStart(2, '0');
	var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
	var yyyy = String(today.getFullYear());

	var today = dd + '/' + mm + '/' + yyyy ;
console.log(today);

var modal_Edit = document.getElementById('myModal2');

var span = document.getElementById('close');
var selectedID;
 





//Adding appoinment into database
const form = document.querySelector('#add-appointment-form');
const form2 = document.querySelector('#edit-appointment-form');

//Render all appoinments
const AppointmentList = document.querySelector('#all_content');


function renderAppointment(doc){
    let tr = document.createElement('tr');
    let A_name = document.createElement('td');
    let A_services = document.createElement('td');
    let A_date = document.createElement('td');
    let A_time = document.createElement('td');


	

   


    let A_Preference=document.createElement('td');

    //creating button
    var btnEdit=document.createElement("BUTTON");
    btnEdit.innerHTML="Edit"
    btnEdit.className="btn btn-outline-info btn-xs"

    
    var btnDel=document.createElement("BUTTON");
    btnDel.innerHTML="Delete"
    btnDel.className="btn btn-outline-danger btn-xs"
    
    tr.setAttribute('data-id', doc.id);
    A_name.textContent = doc.data().customer_name;
    A_services.textContent = doc.data().services;
    A_time.textContent = doc.data().time;
    A_date.textContent = doc.data().date;
    A_Preference.textContent=doc.data().S_Preference;
    
	
    tr.appendChild(A_name);
    tr.appendChild(A_services);
    tr.appendChild(A_time);
    tr.appendChild(A_date);
    tr.appendChild(A_Preference);
    tr.appendChild(btnEdit);
    tr.appendChild(btnDel);

    AppointmentList.append(tr);


btnEdit.addEventListener('click', (e) => {
		e.stopPropagation();
		let id = e.target.parentElement.getAttribute('data-id');
		console.log("heres your id that you selected:"+ id);
		selectedID = id;
		console.log(selectedID);
		modal_Edit.style.display="block";
		span.onclick=function()
		{
			modal_Edit.style.display="none";
		}
		window.onclick=function(event)
		{
			if(event.target == modal_Edit)
				{
					modal_Edit.style.display="none";
					
				}
		}
	});
	
	btnDel.addEventListener('click', (e) => {
		e.stopPropagation();
		let id = e.target.parentElement.getAttribute('data-id');
		console.log("heres your id that you selected:" +id);
		db.collection('Appointment').doc(id).delete();
			alert("You had successfully delete the item from system! Your table will now be updated!");
	});
	
	
	
	
	var date1 = document.appointform.A_date.value;
	var time1 = document.appointform.A_time.value; 
	
   
    
	console.log(dbTime);
	for (i =0; i<dbTime.length; i++){
			if(time1 == dbTime[i]){
				
				alert("Please select another time");
			}
	
			
	break;
	}
	
}





//Render today appoinments

const TodayAppointmentList = document.querySelector('#today_content');
function renderTodayAppointment(doc){
	
    let tr = document.createElement('tr');
    let A_name = document.createElement('td');
    let A_services = document.createElement('td');
    let A_date = document.createElement('td');
    let A_time = document.createElement('td');
    let A_Preference=document.createElement('td');
    //creating button
    var btnEdit=document.createElement("BUTTON");
    btnEdit.innerHTML="Edit"
    btnEdit.className="btn btn-outline-info btn-xs"
   
    
    var btnDel=document.createElement("BUTTON");
    btnDel.innerHTML="Delete"
    btnDel.className="btn btn-outline-danger btn-xs"
    
    tr.setAttribute('data-id', doc.id);
    A_name.textContent = doc.data().customer_name;
    A_services.textContent = doc.data().services;
    A_time.textContent = doc.data().time;
    A_date.textContent = doc.data().date;
    A_Preference.textContent=doc.data().S_Preference;
	
    
    tr.appendChild(A_name);
    tr.appendChild(A_services);
    tr.appendChild(A_time);
    tr.appendChild(A_date);
    tr.appendChild(A_Preference);
    tr.appendChild(btnEdit);
    tr.appendChild(btnDel);

    TodayAppointmentList.append(tr);
	
	btnEdit.addEventListener('click', (e) => {
		e.stopPropagation();
		let id = e.target.parentElement.getAttribute('data-id');
		console.log("heres your id that you selected:"+ id);
		selectedID = id;
		console.log(selectedID);
		modal_Edit.style.display="block";
		span.onclick=function()
		{
			modal_Edit.style.display="none";
		}
		window.onclick=function(event)
		{
			if(event.target == modal_Edit)
				{
					modal_Edit.style.display="none";
					
				}
		}
	});
	
	btnDel.addEventListener('click', (e) => {
		e.stopPropagation();
		let id = e.target.parentElement.getAttribute('data-id');
		console.log("heres your id that you selected:" +id);
		db.collection('Appointment').doc(id).delete();
			alert("You had successfully delete the item from system! Your table will now be updated!");
	});
}

db.collection('Appointment').where('date', '==', today).orderBy('time').get().then((snapshot) => {
    snapshot.docs.forEach(doc => {  

		renderTodayAppointment(doc);
    })
});

//Render upcoming appoinments
const UpcomingAppointmentList = document.querySelector('#upcoming_content');
function renderUpcomingAppointment(doc){
    let tr = document.createElement('tr');
    let A_name = document.createElement('td');
    let A_services = document.createElement('td');
    let A_date = document.createElement('td');
    let A_time = document.createElement('td');
    let A_Preference=document.createElement('td');
    //creating button
    var btnEdit=document.createElement("BUTTON");
    btnEdit.innerHTML="Edit"
    btnEdit.className="btn btn-outline-info btn-xs"
   
    
    var btnDel=document.createElement("BUTTON");
    btnDel.innerHTML="Delete"
    btnDel.className="btn btn-outline-danger btn-xs"
    
    tr.setAttribute('data-id', doc.id);
    A_name.textContent = doc.data().customer_name;
    A_services.textContent = doc.data().services;
    A_time.textContent = doc.data().time;
    A_date.textContent = doc.data().date;
    A_Preference.textContent=doc.data().S_Preference;
    
    tr.appendChild(A_name);
    tr.appendChild(A_services);
    tr.appendChild(A_time);
    tr.appendChild(A_date);
    tr.appendChild(A_Preference);
    tr.appendChild(btnEdit);
    tr.appendChild(btnDel);

    UpcomingAppointmentList.append(tr);
	
	btnEdit.addEventListener('click', (e) => {
		e.stopPropagation();
		let id = e.target.parentElement.getAttribute('data-id');
		console.log("heres your id that you selected:"+ id);
		selectedID = id;
		console.log(selectedID);
		modal_Edit.style.display="block";
		span.onclick = function()
		{
			modal_Edit.style.display="none";
		}
		window.onclick=function(event)
		{
			if(event.target == modal_Edit)
				{
					modal_Edit.style.display="none";
					
				}
		}
	});
	
	btnDel.addEventListener('click', (e) => {
		e.stopPropagation();
		let id = e.target.parentElement.getAttribute('data-id');
		console.log("heres your id that you selected:" +id);
		db.collection('Appointment').doc(id).delete();
			alert("You had successfully delete the item from system! Your table will now be updated!");
	});

}



db.collection('Appointment').where('date', '>', today).orderBy('date').get().then((snapshot) => {
    snapshot.docs.forEach(doc => {
       
		renderUpcomingAppointment(doc);
    })
});

//Render past appoinments
const PreviousAppointmentList = document.querySelector('#previous_content');
function renderPreviousAppointment(doc){
    let tr = document.createElement('tr');
    let A_name = document.createElement('td');
    let A_services = document.createElement('td');
    let A_date = document.createElement('td');
    let A_time = document.createElement('td');
    let A_Preference=document.createElement('td');
    //creating button
    var btnEdit=document.createElement("BUTTON");
    btnEdit.innerHTML="Edit"
    btnEdit.className="btn btn-outline-info btn-xs"
   
    
    var btnDel=document.createElement("BUTTON");
    btnDel.innerHTML="Delete"
    btnDel.className="btn btn-outline-danger btn-xs"
    
    tr.setAttribute('data-id', doc.id);
    A_name.textContent = doc.data().customer_name;
    A_services.textContent = doc.data().services;
    A_time.textContent = doc.data().time;
    A_date.textContent = doc.data().date;
    A_Preference.textContent=doc.data().S_Preference;
    
    tr.appendChild(A_name);
    tr.appendChild(A_services);
    tr.appendChild(A_time);
    tr.appendChild(A_date);
    tr.appendChild(A_Preference);
    tr.appendChild(btnEdit);
    tr.appendChild(btnDel);

    PreviousAppointmentList.append(tr);
	
	btnEdit.addEventListener('click', (e) => {
		e.stopPropagation();
		let id = e.target.parentElement.getAttribute('data-id');
		console.log("heres your id that you selected:"+ id);
		selectedID = id;
		console.log(selectedID);
		modal_Edit.style.display="block";
		span.onclick=function()
		{
			modal_Edit.style.display="none";
		}
		window.onclick=function(event)
		{
			if(event.target == modal_Edit)
				{
					modal_Edit.style.display="none";
					
				}
		}
	});
	
	btnDel.addEventListener('click', (e) => {
		e.stopPropagation();
		let id = e.target.parentElement.getAttribute('data-id');
		console.log("heres your id that you selected:" +id);
		db.collection('Appointment').doc(id).delete();
			alert("You had successfully delete the item from system! Your table will now be updated!");
	});
	
	
} 

db.collection('Appointment').where('date', '<', today).orderBy('date').get().then((snapshot) => {
    snapshot.docs.forEach(doc => {       

		renderPreviousAppointment(doc);
    })
});




//form is to add appointment to the table
form.addEventListener('submit', (e) => {
	e.preventDefault();

	db.collection('Appointment').add({
		customer_name: form.A_name.value,
		services: form.A_services.value,
		time: form.A_time.value,
		date: form.A_date.value,
        S_Preference: form.P_Staff.value
        
	})
});
	

	 

//form 2 is pop out for edit information
form2.addEventListener('submit', (e) => {
	e.preventDefault();
	
	db.collection('Appointment').doc(selectedID).update({
		customer_name: form2.EditA_name.value,
		
		services: form2.EditA_services.value,
		
		time: form2.EditA_time.value,
		
		date: form2.EditA_date.value,
         
        S_Preference: form.P_Staff.value
	})
	
	confirm("You had made the changes on the details! Please refresh the page!");
	console.log("you edited the item!");
	
});





