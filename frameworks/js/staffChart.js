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

//declared globally to let downloading CSV function able to access the chart
var chart;


//store staff name from staff management page
var staffName=[];

//store TSales from staff management page
var TSales=[];

//getting Names and Total Sales from database
db.collection('Staffs').orderBy("Staff_ID").get().then((snapshot)=>{
    snapshot.docs.forEach(doc=>{
        staffName.push(doc.data().Staff_Name)
        TSales.push(doc.data().TSales)
    }) 


    //testing if data stored into arrays
    console.log("Test Name" + " " +staffName);
    console.log("Total Sales"+ " " +TSales);
    
})



//Generate Chart function after click Generate Button

function GenerateChart(){
//    CalHighest();
    chart=Highcharts.chart('myChart',{
    
    chart:{
        type:'column'
    },
    
    title:{
        text:'Style and Smile Salon House 2018 Staff Performance Report (Services)'
    },
    
   
    xAxis:{
       
        categories:staffName,
        title:{
            enabled:true,
            showInLegend:true,
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
        colorByPoint: true,
        data:TSales
        
    }],
        exporting: {
        //disable the mini menu button on top right of the chart.
    enabled:false,
        
        //enable Labels
//      chartOptions:{
//      plotOptions:{
//      series:{
//      dataLabels: {
//             enabled: false
//                  }
//             },
//      showInLegend: true
//         }
//
//       },
     
    csv: {
        itemDelimiter: ' ; ',
        lineDelimiter: '\n'
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

function invertedChart() {
    chart.update({
        chart: {
            inverted: true,
            polar: false
        },
        subtitle: {
            text: 'Inverted'
        }
    });
}







