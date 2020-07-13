// Define times in key value pairs to allow for easy reference to them
let workDay = {
    "8 AM": "",
    "9 AM": "",
    "10 AM": "",
    "11 AM": "",
    "12 PM": "",
    "1 PM": "",
    "2 PM": "",
    "3 PM": "",
    "4 PM": "",
    "5 PM": "",
  };

  $(document).ready(function () {
    // Checks to see if your calender is current, and if it's not, then this will update it
    if (!localStorage.getItem('workDay')) {
      updateCalendarTasks(workDay);
    } else {
      updateCalendarTasks(JSON.parse(localStorage.getItem('workDay')));
    }
  })
  // Plug in the current date and time using Moment
  $('#date-today h5').text(moment().format('dddd') + ", " + moment().format('MMMM Do YYYY, h:mm a'));

  
  