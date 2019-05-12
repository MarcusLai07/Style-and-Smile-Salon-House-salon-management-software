/*jslint white:true*/
/*global angular*/


//from interface design lecture 8

var chart=Highcharts.chart('myChart',{
    
    chart:{
        type:'line'
    },
    
    title:{
        text:'Style and Smile Salon House Yearly Sales Report'
    },
    
    xAxis:{
        categories:['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun','Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
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
        name:'Sales',
        data:[200,400,600,800,1000,1200,750,2000,3000,1000,11000,20000]
        
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

function downloadCSV()
{
    chart.downloadCSV();
}


