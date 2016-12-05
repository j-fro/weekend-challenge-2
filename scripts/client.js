/* --- GLOBALS --- */
var studentsArray = [];
var currentIndex = 0;
var timerCount = 10;

/* --- CONSTANTS --- */
var STUDENTS_URL = 'http://devjana.net/support/tau_students.json';
var ARRAY_PROPERTY = 'tau'; // Name of the property that contains the desired array

$(document).ready(function() {
    getStudentInfo(STUDENTS_URL);
    enableButtons();
    setInterval(function() {
        timerCount--;
        console.log(timerCount);
        if (timerCount <= 0) {
            console.log("Hit the zeroes!");
            nextClicked();
        }
    }, 1000);
});

function enableButtons() {
    /* Wires up all buttons to their click handlers */
    $(document).on('click', '#nextButton', nextClicked);
    $(document).on('click', '#prevButton', prevClicked);
    $(document).on('click', '.student-button', studentClicked);
}

function getStudentInfo(url) {
    /* Makes an AJAX call on the API endpoint and parses the returned data */
    $.ajax({
        url: url,
        dataType: 'JSON',
        success: parseStudentInfo
    });
}

function parseStudentInfo(data) {
    /* Parses the requested JSON data and stores it in the studentsArray */
    var studentData = data[ARRAY_PROPERTY];
    studentData.forEach(function(student) {
        studentsArray.push(student);
    });
    // Immediately display the first student
    displayStudentInfo(studentsArray[currentIndex]);
    // Add buttons for each student to the DOM
    displayStudentButtons(studentsArray);
    // Highlight the first student button
    highlightButton(currentIndex);
}

/* --- CLICK HANDLERS --- */

function nextClicked() {
    timerCount = 10;
    incrementIndex();
    displayStudentInfo(studentsArray[currentIndex]);
    highlightButton(currentIndex);
}

function prevClicked() {
    timerCount = 10;
    decrementIndex();
    displayStudentInfo(studentsArray[currentIndex]);
    highlightButton(currentIndex);
}

function studentClicked() {
    timerCount = 10;
    currentIndex = $(this).data().index;
    displayStudentInfo(studentsArray[currentIndex]);
    highlightButton(currentIndex);
}

/* --- DISPLAY FUNCTIONS --- */

function displayStudentInfo(student) {
    /* Displays a single student's information on the DOM and updates position
    indicator */
    var $container = $('#studentDisplay');
    $container.fadeOut(function() {
        var htmlString = '<h2>' + student.first_name + ' ' + student.last_name + '</h2>';
        htmlString += '<img class="portrait" src="' + student.picUrl + '" />';
        htmlString += '<p>' + student.info + '</p>';
        $container.html(htmlString);
        $container.fadeIn();
    });

    // Update the position indicator
    var $position = $('#positionIndicator');
    $position.html(currentIndex + 1 + '/' + studentsArray.length);
}

function displayStudentButtons(array) {
    /* Displays a button for each student between the prev and next buttons */
    var htmlString = '<button type="button" id="prevButton" class="btn btn-primary glyphicon glyphicon-menu-left"></button>';
    $container = $('#buttonBar');
    array.forEach(function(student, index) {
        if (student.first_name === 'Jacob') { //Flex-fro is the danger button
            htmlString += '<button class="btn btn-danger student-button" data-index="' + index + '">';
        } else {
            htmlString += '<button class="btn student-button" data-index="' + index + '">';
        }
        htmlString += '<img src=' + student.picUrl + ' /></button>';
    });
    htmlString += '<button type="button" id="nextButton" class="btn btn-primary glyphicon glyphicon-menu-right"></button>';
    $container.html(htmlString);
}

function highlightButton(index) {
    // Clear the highlight on all buttons
    $('.student-button').removeClass('btn-primary selected');
    // Highlight the button at the current index
    $('#buttonBar').find($('.student-button')[index]).addClass('btn-primary selected');
}

/* --- UTILITY FUNCTIONS --- */

function incrementIndex() {
    currentIndex = (currentIndex + 1) % studentsArray.length;
}

function decrementIndex() {
    currentIndex--;
    if (currentIndex < 0) {
        currentIndex = studentsArray.length - 1;
    }
}
