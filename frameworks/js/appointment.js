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

	var today = new Date();
	var dd = String(today.getDate()).padStart(2, '0');
	var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
	var yyyy = String(today.getFullYear());

	var datetoday = dd + '/' + mm + '/' + yyyy ;
	
	
	console.log(today);
	

//Adding appoinment into database
const form = document.querySelector('#add-appointment-form');

	
 

form.addEventListener('submit', (e) => {
	e.preventDefault();
	db.collection('Appointment').add({
		customer_name: form.A_name.value,
		services: form.A_services.value,
		time: form.A_time.value,
		date: form.A_date.value
	})
})

//Render all appoinments
const AppointmentList = document.querySelector('#all_content');

function renderAppointment(doc){
    let tr = document.createElement('tr');
    let A_name = document.createElement('td');
    let A_services = document.createElement('td');
    let A_date = document.createElement('td');
    let A_time = document.createElement('td');
    //creating button
    var btn=document.createElement("BUTTON");
    btn.innerHTML="Edit"
    btn.className="btn btn-outline-info btn-xs"
    btn.id= "M_Edit";
    
    var btn2=document.createElement("BUTTON");
    btn2.innerHTML="Delete"
    btn2.className="btn btn-outline-danger btn-xs"
    
    tr.setAttribute('data-id', doc.id);
    A_name.textContent = doc.data().customer_name;
    A_services.textContent = doc.data().services;
    A_time.textContent = doc.data().time;
    A_date.textContent = doc.data().date;
    
    tr.appendChild(A_name);
    tr.appendChild(A_services);
    tr.appendChild(A_time);
    tr.appendChild(A_date);
    tr.appendChild(btn);
    tr.appendChild(btn2);

    AppointmentList.append(tr);
}


       

db.collection('Appointment').orderBy("date").get().then((snapshot) => {
    snapshot.docs.forEach(doc => { 

		renderAppointment(doc);
    })
});


form.addEventListener('submit', (e) => {
	e.preventDefault();
	db.collection('Appointment').add({
		
		customer_name: form.A_name.value,
		
		services: form.A_services.value,
		
		time: form.A_time.value,
		
		date: form.A_date.value
		
		
	});
})



//Render today appoinments

const TodayAppointmentList = document.querySelector('#today_content');
function renderTodayAppointment(doc){
	
    let tr = document.createElement('tr');
    let A_name = document.createElement('td');
    let A_services = document.createElement('td');
    let A_date = document.createElement('td');
    let A_time = document.createElement('td');
    //creating button
    var btn=document.createElement("BUTTON");
    btn.innerHTML="Edit"
    btn.className="btn btn-outline-info btn-xs"
    btn.id= "M_Edit";
    
    var btn2=document.createElement("BUTTON");
    btn2.innerHTML="Delete"
    btn2.className="btn btn-outline-danger btn-xs"
    
    tr.setAttribute('data-id', doc.id);
    A_name.textContent = doc.data().customer_name;
    A_services.textContent = doc.data().services;
    A_time.textContent = doc.data().time;
    A_date.textContent = doc.data().date;
	
    
    tr.appendChild(A_name);
    tr.appendChild(A_services);
    tr.appendChild(A_time);
    tr.appendChild(A_date);
    tr.appendChild(btn);
    tr.appendChild(btn2);

    TodayAppointmentList.append(tr);
}



       

db.collection('Appointment').where('date', '==', datetoday).get().then((snapshot) => {
    snapshot.docs.forEach(doc => {  

		renderTodayAppointment(doc);
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
    //creating button
    var btn=document.createElement("BUTTON");
    btn.innerHTML="Edit"
    btn.className="btn btn-outline-info btn-xs"
    btn.id= "M_Edit";
    
    var btn2=document.createElement("BUTTON");
    btn2.innerHTML="Delete"
    btn2.className="btn btn-outline-danger btn-xs"
    
    tr.setAttribute('data-id', doc.id);
    A_name.textContent = doc.data().customer_name;
    A_services.textContent = doc.data().services;
    A_time.textContent = doc.data().time;
    A_date.textContent = doc.data().date;
    
    tr.appendChild(A_name);
    tr.appendChild(A_services);
    tr.appendChild(A_time);
    tr.appendChild(A_date);
    tr.appendChild(btn);
    tr.appendChild(btn2);

    PreviousAppointmentList.append(tr);
}


       

db.collection('Appointment').where('date', '<', datetoday).get().then((snapshot) => {
    snapshot.docs.forEach(doc => {       

		renderPreviousAppointment(doc);
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
    //creating button
    var btn=document.createElement("BUTTON");
    btn.innerHTML="Edit"
    btn.className="btn btn-outline-info btn-xs"
    btn.id= "M_Edit";
    
    var btn2=document.createElement("BUTTON");
    btn2.innerHTML="Delete"
    btn2.className="btn btn-outline-danger btn-xs"
    
    tr.setAttribute('data-id', doc.id);
    A_name.textContent = doc.data().customer_name;
    A_services.textContent = doc.data().services;
    A_time.textContent = doc.data().time;
    A_date.textContent = doc.data().date;
    
    tr.appendChild(A_name);
    tr.appendChild(A_services);
    tr.appendChild(A_time);
    tr.appendChild(A_date);
    tr.appendChild(btn);
    tr.appendChild(btn2);

    UpcomingAppointmentList.append(tr);

}



db.collection('Appointment').where("date", ">", datetoday).get().then((snapshot) => {
    snapshot.docs.forEach(doc => {
       
		renderUpcomingAppointment(doc);
    })
});




