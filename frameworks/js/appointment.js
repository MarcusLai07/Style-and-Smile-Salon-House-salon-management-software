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



const AppointmentList = document.querySelector('#all_content');


 
function renderAppointment(doc){
    let tr = document.createElement('tr');
    let A_name = document.createElement('td');
    let A_services = document.createElement('td');
    let A_date = document.createElement('td');
    let A_time = document.createElement('td');
    
    tr.setAttribute('data-id', doc.id);
    A_name.textContent = doc.data().customer_name;
    A_services.textContent = doc.data().services;
    A_time.textContent = doc.data().time;
    A_date.textContent = doc.data().date;
    
    tr.appendChild(A_name);
    tr.appendChild(A_services);
    tr.appendChild(A_time);
    tr.appendChild(A_date);
	
	
    
    AppointmentList.append(tr);
     
}


db.collection('Appointment').orderBy("date", "desc").get().then((snapshot) => {
    snapshot.docs.forEach(doc => {
       
		renderAppointment(doc);
    })
})






