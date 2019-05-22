/*jslint white:true*/
/*global angular*/
var chart;
var stock=[];
var TEarn=[];
var Total=[];
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

db.collection('Stocks').orderBy("SKU").get().then((snapshot)=>{
    snapshot.docs.forEach(doc=>{
//        renderTable(doc);
        stock.push(doc.data().Stock_Name)
        TEarn.push(doc.data().TEarn)
    }) 
    console.log(stock);
    console.log(TEarn);
    
})


//from interface design lecture 8
function GenerateChart(){
 chart=Highcharts.chart('myChart',{
    chart:{
        type:'pie'
    },
    
    title:{
        text:'Style and Smile Salon House Yearly Sales Report'
    },
    
//    xAxis:{
//        categories:stock,
//        title:{
//            enabled:true,
//            text:"Product Name"
//        }
//    },
//    
//    yAxis:{
//         title:{
//            enabled:true,
//            text:"Sales"
//        } 
//    },

    series:[{
        name:'Total Earn in RM ',
        data:stock,600,1200,900,400,800,800,2500,3000,4200,3200,3300,2800,2200
        
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

       }
     
//    csv: {
//        itemDelimiter: ' ; '
//    },
  }
   
     
    });
}

function downloadCSV()
{
    'use strict';
    chart.downloadCSV();
}


