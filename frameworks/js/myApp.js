const MembershipList = document.querySelector('#M_Content');

// populate the membership table with the data in the database
function renderList(doc){
    let tr = document.createElement('tr')
    let M_id = document.createElement('td');
    let M_name = document.createElement('td');
    let M_phone = document.createElement('td');
    let M_email = document.createElement('td');
    
    tr.setAttribute('data-id', doc.id);
    M_id.textContent = doc.data().Member_ID;
    M_name.textContent=doc.data().Member_Name;
    M_phone.textContent=doc.data().Member_Phone;
    M_email.textContent=doc.data().Member_Email;
    
    tr.appendChild(M_id);
    tr.appendChild(M_name);
    tr.appendChild(M_phone);
    tr.appendChild(M_email);
    
    MembershipList.append(tr); 
}
//render the table to the web UI
db.collection('Members').get().then((snapshot) => {
    snapshot.docs.forEach(doc => {
        renderList(doc)
    })
})

db.collection('Staffs').get().then((snapshot) => {
    snapshot.docs.forEach(doc => {
        console.log(doc.data())
    })
})

