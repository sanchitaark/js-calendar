(function Calendar () {
  var readline = require('readline');
  var currentMonth = 1;
  var numDays;
  var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  var  dayNames = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
  var calendar = {};


  var rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
  });

  rl.question('Enter The Year: ', function (value) {
    var year = parseInt(value);
    processInput(year);     
    rl.close();
    process.stdin.destroy();    
  });

  function processInput(year){
    console.log('You Entered: '+ year);
    var firstDay = yearFirstDay(year);
    var isLeapYear = checkLeapYear(year);

    while(currentMonth <= 12){
      var i = currentMonth - 1;
      numDays = DaysInMonth(currentMonth, isLeapYear);
      var value =  buildCalendar(firstDay, currentMonth, numDays);
      calendar[monthNames[i]] = value.data;
      firstDay = value.firstDay;
      currentMonth++;
    }
    console.log(calendar);
  }

  function yearFirstDay(year){
    var x = parseInt((year-1)/4);
    var y = parseInt((year-1)/100);
    var z = parseInt((year-1)/400);
    var startDay = parseInt((year+x-y+z)%7);

    return startDay;
  }
  
  function checkLeapYear(year){
    if(((year%4==0) && (year%100 !=0))||(year%400==0)){
      return true;
    }
    else{
      return false;
    }
  }

  function DaysInMonth(currentMonth, isLeapYear){
    if(currentMonth == 2){
      if(isLeapYear == true){
        return 29;
      }
      else{
        return 28;
      }
    }
    else if(currentMonth == 7){
      return 31;
    }
    else if(currentMonth == 8){
      return 31;
    }
    else if(currentMonth == 9){
      return 30;
    }
    else if(currentMonth == 10){
      return 31;
    }
    else if(currentMonth == 11){
      return 30;
    }
    else if(currentMonth == 12){
      return 31;
    }
    else if(currentMonth % 2 == 0){
      return 30;
    }
    else{
      return 31;
    }
  }

  function buildCalendar(firstDay, currentMonth, totalDays){
    var counter = 1;
    var startDay = 1;
    data = {};
    while(counter <= 7){
      var dayList = [];
      var week = dayNames[firstDay]
      for (var k = startDay; k <= totalDays; k = k + 7){
        dayList.push(k);
      }
      data[week] = dayList;
      if (firstDay == 6){
        firstDay = 0;
      }
      else{
        firstDay++;
      }
      startDay++;
      counter++;
    }
    var temp = totalDays % 7;
    firstDay = firstDay + temp;
    if (firstDay < 7){
      return {data, firstDay};
    }
    else{
      firstDay = firstDay - 7;
      return {data, firstDay};
    }
  };

}());