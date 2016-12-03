Tau Weekend Challenge #2:
=========================
Classmate Carousel
==================

What it does:
-------------
Loads student data from an API endpoint and displays it in a rotating Carousel

Technologies:
-------------
* Javascript
* jQuery (v3.1.1)
* JSON/AJAX
* HTML/CSS

To-Do:
------
[] AJAX call out to API endpoint
  [] Parse received JSON
[] Display DOM elements:
  [] Student name
  [] Student image
  [] Student info
  [] Previous and next buttons
[] Wire up buttons
  [] Previous and next buttons should be aware of position in rotation
  [] On click, should go to the previous or next student in the rotation

Extensions:
-----------
[] Include student specific buttons
  [] On click, should go to that student and reassign the prev/next buttons
  [] STRETCH: Buttons should include a small photo of the student
[] Add animation (fade-in/out on student change)
[] Add a timer
  [] Every 10 seconds, carousel should advance
  [] User interaction with a button should reset the timer
[] STETCH: Add images to prev/next buttons
