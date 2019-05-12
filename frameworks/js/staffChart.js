/*jslint white:true*/
/*global angular*/


//from interface design lecture 8

var chart=Highcharts.chart('myChart',{
    
    chart:{
        type:'pie'
    },
    plotOptions:{
         series: {
         cursor: 'pointer',
    }
   },
    
    title:{
        text:'Style and Smile Salon House Yearly Staff Performance'
    },
    
    
//    It is an pie chart, so xAxis and yAxis does not do anything here. Logically.
//    xAxis:{
//        categories:['Chuan Hek', 'Marcus Lai', 'Daniel Wong', 'Gimmy Sii', 'Wong'],
//        title:{
//            enabled:true,
//            text:"Staff Name"
//        }
//    },
//    
//    yAxis:{
//         title:{
//            enabled:true,
//            text:"Total Services Sales"
//        } 
//    },
    
       series: [{
            name: 'Total Sales in RM',
            colorByPoint: true,
            data: [{
                title:"Staff Name",                
                name: 'Chuan Hek',
                y: 11222,
                sliced: true,
                selected: true
            }, {
                name: 'Marcus Lai',
                y: 22333
            }, {
                name: 'Daniel Wong',
                y: 44555
            }, {
                name: 'Gimmy Sii',
                y: 55566
            }, {
                name: 'Wong',
                y: 77888
            }],
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


