/*jslint white:true*/
/*global angular*/


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

//store stock name from stock page
var stock;
//store Total Earn name from stock page
var TEarn;

//an Array to store stocks and Total Earn together to display in the Series.
var Total=[];


//getting stock name and TotalEarn from firebase
db.collection('Stocks').orderBy("SKU").get().then((snapshot)=>{
    snapshot.docs.forEach(doc=>{
        stock=doc.data().Stock_Name
        TEarn=doc.data().TEarn
        Total.push({
            name:stock,
            y:TEarn
            
        })
    }) 
    
    //testing if the data store it into the array correctly
    console.log(stock);
    console.log(TEarn);
    console.log(Total);
    
})


//Generate pie chart after clicking Generate button from HTML file
function GenerateChart(){
 chart=Highcharts.chart('myChart',{
    chart:{
        type:'pie'
    },
    
    title:{
        text:'Style and Smile Salon House Yearly Sales Report'
    },
    

    series:[{
        name:'Total Earn in RM ',
        showInLegend:true,
        data:Total
        
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


//export the chart to CSV file and let users download
function downloadCSV()
{
    'use strict';
    chart.downloadCSV();
}


