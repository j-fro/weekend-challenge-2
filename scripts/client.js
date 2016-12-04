/* --- GLOBALS --- */
var studentsArray = [];
var currentIndex = 0;

/* --- CONSTANTS --- */
var STUDENTS_URL = 'http://devjana.net/support/tau_students.json';
var ARRAY_PROPERTY = 'tau'; // Name of the property that contains the desired array

$(document).ready(function() {
    getStudentInfo(STUDENTS_URL);
});

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
    console.log(studentsArray);
    // Immediately display the first student
    displayStudentInfo(studentsArray[currentIndex], currentIndex);
}

/* --- DISPLAY FUNCTIONS --- */
function displayStudentInfo(student, index) {
    /* Displays a single student's information on the DOM */
    var $container = $('#studentDisplay');
    $container.data('index', index);
    var htmlString = '<h2>' + student.first_name + ' ' + student.last_name + '</h2>';
    htmlString += '<img class="portrait" src="' + student.picUrl + '" />';
    htmlString += '<p>' + student.info + '</p>';
    $container.html(htmlString);
}
