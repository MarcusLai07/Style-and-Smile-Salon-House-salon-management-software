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
        
    }]
   
     
});


