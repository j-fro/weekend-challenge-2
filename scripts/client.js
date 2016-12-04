/* --- GLOBALS --- */
var studentsArray = [];
var currentIndex = 0;

/* --- CONSTANTS --- */
var STUDENTS_URL = 'http://devjana.net/support/tau_students.json';
var ARRAY_PROPERTY = 'tau'; // Name of the property that contains the desired array

$(document).ready(function() {
    getStudentInfo(STUDENTS_URL);
    enableButtons();
});

function enableButtons() {
    /* Wires up all buttons to their click handlers */
    $(document).on('click', '#nextButton', nextClicked);
    $(document).on('click', '#prevButton', prevClicked);
    $(document).on('click', '.studentButton', studentClicked);
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
}

/* --- CLICK HANDLERS --- */

function nextClicked() {
    incrementIndex();
    displayStudentInfo(studentsArray[currentIndex]);
}

function prevClicked() {
    decrementIndex();
    displayStudentInfo(studentsArray[currentIndex]);
}

function studentClicked() {
    console.log($(this).data());
    var index = $(this).data().index;
    currentIndex = index;
    displayStudentInfo(studentsArray[currentIndex]);
}

/* --- DISPLAY FUNCTIONS --- */

function displayStudentInfo(student) {
    /* Displays a single student's information on the DOM and updates position
    indicator */
    var $container = $('#studentDisplay');
    $container.fadeOut();
    var htmlString = '<h2>' + student.first_name + ' ' + student.last_name + '</h2>';
    htmlString += '<img class="portrait" src="' + student.picUrl + '" />';
    htmlString += '<p>' + student.info + '</p>';
    $container.html(htmlString);
    $container.fadeIn();

    var $position = $('#positionIndicator');
    $position.html(currentIndex + 1 + '/' + studentsArray.length);
}

function displayStudentButtons(array) {
    /* Displays a button for each student between the prev and next buttons */
    array.forEach(function(student, index) {
        var $container = $('#studentButtons');
        $container.append('<button class="studentButton" data-index="' + index + '"><img src=' + student.picUrl + ' /></button>');
    });
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
