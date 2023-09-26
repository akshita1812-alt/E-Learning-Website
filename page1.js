var words = ['HTML', 'CSS', 'JAVASCRIPT', ' BACKEND', 'FRONTEND'],
    part,
    i = 0,
    offset = 0,
    len = words.length,
    forwards = true,
    skip_count = 0,
    skip_delay = 15,
    speed = 70;
var wordflick = function () {
  setInterval(function () {
    if (forwards) {
      if (offset >= words[i].length) {
        ++skip_count;
        if (skip_count == skip_delay) {
          forwards = false;
          skip_count = 0;
        }
      }
    }
    else {
      if (offset == 0) {
        forwards = true;
        i++;
        offset = 0;
        if (i >= len) {
          i = 0;
        }
      }
    }
    part = words[i].substr(0, offset);
    if (skip_count == 0) {
      if (forwards) {
        offset++;
      }
      else {
        offset--;
      }
    }
    $('.word').text(part);
  },speed);
};

$(document).ready(function () {
  wordflick();
});




// var data = {
//   // A labels array that can contain any sort of values
//   labels: ['Jan', 'Feb', 'March', 'April', 'May' , 'June' , 'July' , 'Aug' , 'Sept' , 'Oct' , 'Nov' , 'Dec'],
//   // Our series array that contains series objects or in this case series data arrays
//   series: [
//     [4.5, 2, 4, 2, 1, 3, 4, 3.3, 4.5, 2, 1, 2, ]
//   ]
// };

//  // Over 300px, we change the bar distance and show the first three letters of the weekdays
//  ['screen and (min-width: 300px)', {
//   seriesBarDistance: 15,
//   axisX: {
//     labelInterpolationFnc: function(value) {
//       return value.slice(0, 3);
//     }
//   }
// }],
// // Over 600px, we increase the bar distance one more time and show the full weekdays
// ['screen and (min-width: 600px)', {
//   seriesBarDistance: 30,
//   axisX: {
//     labelInterpolationFnc: function(value) { return value; }
//   }
// }]
// // Create a new line chart object where as first parameter we pass in a selector
// // that is resolving to our chart container element. The Second parameter
// // is the actual data object.
// new Chartist.Bar('.ct-chart', data);


// new Chartist.Bar('.ct-chart', {
//   labels: ['Jan', 'Feb', 'March', 'April', 'May' , 'June' , 'July' , 'Aug' , 'Sept' , 'Oct' , 'Nov' , 'Dec'],
//   series: [20, 60, 120, 200, 180, 20, 10, 30, 50,22, 55, 77]
// }, {
//   distributeSeries: true
// });
// chart.on('draw', function(data) {
//   if(data.type == 'bar') {
//       data.element.animate({
//           y2: {
//               dur: '0.2s',
//               from: data.y1,
//               to: data.y2
//           }
//       });
//   }
// });
  // Create the chartc
//   const Chartist = require('chartist')
//   let abc=(labels,series)=>{
//   var data = {
//     labels: labels,
//     series:series
// };

// var options = {
//   seriesBarDistance: 15,
//   axisX: {
//     showGrid: false
//   },
//   height: '300px'
// };

// new Chartist.Bar('.ct-chart', data, options); 
// }

// module.exports=abc;