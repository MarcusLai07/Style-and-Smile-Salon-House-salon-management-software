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

var chart;
//store staff name from staff management page
var staffName=[];
//

////store staff get choosed for preference from appointment page time to populate the data into pie chart
var choosedPreference=[600,400,900,800,1000,1300,2000,2500,3000,2800,3200,3000];


var custPreference=[];

db.collection('Staffs').orderBy("Staff_ID").get().then((snapshot)=>{
    snapshot.docs.forEach(doc=>{
//        renderTable(doc);
    }) 
    console.log(staffName);
    
})




db.collection('Appointment').get().then((snapshot)=>{
    snapshot.docs.forEach(doc=>{
        custPreference.push(doc.data().S_Preference)
    })
    
    console.log(custPreference);
})

//
//function calculateTotalSelectedPreference()
//{
//    for(i=0;i<custPreference.length;i++)
//        {
//            if(custPreference.toString=="Daniel")
//                {
//                    
//                }
//        }
//    console.log(Total_Selected + " "+ "TEsting");
//}

//
//Select table and form from the html file.

//const StaffReportList = document.querySelector('#staff_content');
//var selectedID;
//
//// populate the membership table with the data in the database
//function renderTable(doc){
//    //debugging purpose
//    console.log("you rendered a table");
//    
//    
//    let tr = document.createElement('tr');
//    tr.className="text-center"
//    
//    let Staff_id = document.createElement('td');
//    let Staff_Name = document.createElement('td');
//    let Staff_PNumb = document.createElement('td');
//    let Staff_Pos = document.createElement('td');
//    let Staff_TSales=document.createElement('td');
//    
//    
//
//    tr.setAttribute('data-id', doc.id);
//    Staff_id.textContent = doc.data().Staff_ID;
//    Staff_Name.textContent=doc.data().Staff_Name;
//    Staff_PNumb.textContent=doc.data().Staff_PNum;
//    Staff_Pos.textContent=doc.data().Staff_Position;
//    
//    tr.appendChild(Staff_id);
//    tr.appendChild(Staff_Name);
//    tr.appendChild(Staff_PNumb);
//    tr.appendChild(Staff_Pos);
//
//    
//    StaffReportList.append(tr);     
//}

//from interface design lecture 8
function GenerateChart(){
    chart=Highcharts.chart('myChart',{
    
    chart:{
        type:'column'
    },
    
    title:{
        text:'Style and Smile Salon House Yearly Sales Report'
    },
    
   
    xAxis:{
       
        categories:["Daniel","Marcus","Chuan hek","Gimmy","Paul","Darren","Sharon","Jessica","Chloe","Jane","Wanda","Tony"],
        title:{
            enabled:true,
            text:"Month"
        }
    },
    
    yAxis:{
         title:{
            enabled:true,
            text:"Sales"
        } 
    },

    series:[{
        name:"Total Sales",
        data:choosedPreference
        
    }],
        exporting: {
        //disable the mini menu button on top right of the chart.
    enabled:false,
        
        //enable Labels
      chartOptions:{
      plotOptions:{
      series:{
      dataLabels: {
             enabled: true
                  }
             }
         }

       },
     
    csv: {
        itemDelimiter: ' ; '
    }
  }
   
     
  });

}
    function downloadCSV()
{
    chart.downloadCSV();
}








