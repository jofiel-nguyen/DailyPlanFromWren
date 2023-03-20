$(document).ready(function() {
  var currentDay = dayjs().format('dddd, MMMM D');
  $('#currentDay').text(currentDay);

  // Load saved data from local storage and color-code timeblocks
  $('.time-block').each(function() {
    var timeBlockId = $(this).attr('id');
    var userText = localStorage.getItem(timeBlockId);
    console.log("Loading data for", timeBlockId, "from local storage:", userText);
    if (userText !== null) {
      $(this).find('.description').val(userText);
    }

    var timeBlockHour = parseInt(timeBlockId.split('-')[1]);
    var currentHour = dayjs().hour();
    if (timeBlockHour < currentHour) {
      $(this).addClass('past').removeClass('present future');
    } else if (timeBlockHour === currentHour) {
      $(this).addClass('present').removeClass('past future');
    } else {
      $(this).addClass('future').removeClass('past present');
    }
  });

  // Save user input to local storage on save button click
  $('.saveBtn').on('click', function(event) {
    event.preventDefault();
    var timeBlockId = $(this).closest('.time-block').attr('id');
    console.log("Saving data for", timeBlockId, "to local storage:", $(this).siblings('.description').val());
    var userText = $(this).siblings('.description').val();
    console.log("User input:", userText);
    localStorage.setItem(timeBlockId, userText);
  });
  
  
});
