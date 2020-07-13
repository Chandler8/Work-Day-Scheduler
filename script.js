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


  let counter = 1;
for (const property in workDay) {
  // Defining the needed variables

  let textEntry = "#text-entry" + counter;
  $(textEntry).text(workDay[property]);
  let timeId = "#time" + counter;
  let presentHour = moment().hour();
  let timeString = $(timeId).text();
  let timeNumber = hourNumberFromHourString(timeString);
  // Making the different timeblock classes correlate to past, present or future to determine styling
  if (timeNumber < presentHour) {
    $(textEntry).addClass("past");
  } else if (timeNumber > presentHour) {
    $(textEntry).addClass("future");
  } else {
    $(textEntry).addClass("present");
  }
  counter++;
}
  

$("button").click(function () {
    // This will save the text in the respective sibling divs 

    value = $(this).siblings("textarea").val();
    hourString = $(this).siblings("div").text();
    saveSchedule(hourString, value);
  });

  function hourNumberFromHourString(hourString) {
    // Switching string with integers to eliminate the need to parse later on
    switch (hourString) {
      case "8 AM": return 8;
      case "9 AM": return 9;
      case "10 AM": return 10;
      case "11 AM": return 11;
      case "12 PM": return 12;
      case "1 PM": return 13;
      case "2 PM": return 14;
      case "3 PM": return 15;
      case "4 PM": return 16;
      case "5 PM": return 17;
    }
  }


  function loadCorrectDataset() {
    // Saving data submitted in timeblock to local storage
    result = localStorage.getItem('workDay')
    return (result ? result : workDay);
  }
  
  function initializeLocalStorage() {
    localStorage.setItem('workDay', JSON.stringify(workDay));
  };
  
  function saveToLocalStorage(dayObj) {
    localStorage.setItem('workDay', JSON.stringify(dayObj));
  }
  
  function saveSchedule(hourString, val) {
    if (!localStorage.getItem('workDay')) {
      initializeLocalStorage();
    }
  
    let workHours = JSON.parse(localStorage.getItem('workDay'));
    workHours[hourString] = val
  
    saveToLocalStorage(workHours);
  }
  
//   Ties back into earlier variable
  function updateCalendarTasks(dayObject) {
    $(".calendar-row").each(function (index) {
      let res = $(this).children("div");
      $(this).children("textarea").text(dayObject[res.text()]);
    })
  }

  