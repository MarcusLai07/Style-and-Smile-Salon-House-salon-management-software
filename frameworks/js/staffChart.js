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

////store staff name from staff management page into arrays to populate into pie chart
//var staffName=[];
//
////store staff get choosed for preference from appointment page time to populate the data into pie chart
//var choosedPreference=[200,400,600,800,1000];

db.collection('Staffs').orderBy("Staff_ID").get().then((snapshot)=>{
    snapshot.docs.forEach(doc=>{
        renderTable(doc);

    }) 
    
})




db.collection('Stocks').get().then((snapshot)=>{
    snapshot.docs.forEach(doc=>{
//        console.log(doc.data().date);
//        choosedPreference.push(doc.data().Stock_Price);
//        console.log(choosedPreference);
    })
})

//
//Select table and form from the html file.

const StaffReportList = document.querySelector('#staff_content');
var selectedID;

// populate the membership table with the data in the database
function renderTable(doc){
    //debugging purpose
    console.log("you rendered a table");
    
    
    let tr = document.createElement('tr');
    tr.className="text-center"
    
    let Staff_id = document.createElement('td');
    let Staff_Name = document.createElement('td');
    let Staff_PNumb = document.createElement('td');
    let Staff_Pos = document.createElement('td');
    let Staff_TSales=document.createElement('td');
    
    

    tr.setAttribute('data-id', doc.id);
    Staff_id.textContent = doc.data().Staff_ID;
    Staff_Name.textContent=doc.data().Staff_Name;
    Staff_PNumb.textContent=doc.data().Staff_PNum;
    Staff_Pos.textContent=doc.data().Staff_Position;
    
    tr.appendChild(Staff_id);
    tr.appendChild(Staff_Name);
    tr.appendChild(Staff_PNumb);
    tr.appendChild(Staff_Pos);

    
    StaffReportList.append(tr);     
}

//from interface design lecture 8
//function GenerateChart(){
//    var index;
//  for(i=0;i<staffName.length;i++){
//      index=[i];
//      console.log(index);
//  }
// 
//var chart=Highcharts.chart('myChart',{
//    
//    chart:{
//        type:'column'
//    },
//    
//    title:{
//        text:'Style and Smile Salon House Yearly Sales Report'
//    },
//    
//   
//    xAxis:{
//       
//        categories:staffName.data,
//        title:{
//            enabled:true,
//            text:"Month"
//        }
//    },
//    
//    yAxis:{
//         title:{
//            enabled:true,
//            text:"Sales"
//        } 
//    },
//
//    series:[{
//        name:"Total Sales",
//        data:choosedPreference
//        
//    }],
//        exporting: {
//        //disable the mini menu button on top right of the chart.
//    enabled:false,
//        
//        //enable Labels
//      chartOptions:{
//      plotOptions:{
//      series:{
//      dataLabels: {
//             enabled: true
//                  }
//             }
//         }
//
//       }
//     
////    csv: {
////        itemDelimiter: ' ; '
////    },
//  }
//   
//     
//  });
//}    





