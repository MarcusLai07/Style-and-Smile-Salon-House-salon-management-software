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
var staffID=[];

//store TSales from staff management page
var TSales=[];
//getting Names from database
db.collection('Staffs').orderBy("Staff_ID").get().then((snapshot)=>{
    snapshot.docs.forEach(doc=>{
//        renderTable(doc);
        staffID.push(doc.data().Staff_ID)
        staffName.push(doc.data().Staff_Name)
        TSales.push(doc.data().TSales)
    }) 


    
    console.log("Test Name" + " " +staffName);
    console.log("Total Sales"+ " " +TSales);
    
})









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
//    CalHighest();
    chart=Highcharts.chart('myChart',{
    
    chart:{
        type:'column'
    },
    
    title:{
        text:'Style and Smile Salon House 2018 Staff Performance Report'
    },
    
   
    xAxis:{
       
        categories:staffName,
        title:{
            enabled:true,
            text:"Staff Name"
        }
    },

    yAxis:{
        title:{
            enabled:true,
            text:"Amount of Sales"
        }
    },

    series:[{
        name:"Total Sales in Services of Each Staff(s)",
        data:TSales
        
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


//function CalHighest()
//{
//     var Max;
//   
//    for(i=0;i<staffName.length;i++)
//        for(i=0;i<TSales.length;i++)
//    {
//        Max=(Math.max(...TSales));
//    }
//    alert(Max+"  " +staffName + " " + "Has the highest(better) sales/performance!");
//}








