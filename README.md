# populum-case
Author: William Bergekrans

I have done both the Frontend and Backend case. Short description below. 

## Frontend 
To run the application you need to have Flask (see requirements.txt). 

To provide an interactive chart I have used the chart.js framework and Jquery. The design and responsiveness of the page is achieved with Bootstrap. 
All these frameworks are served through a CDN. No need to download anything to run the app. 

## Backend 
Developed in .Net Core. One option for running is through VScode. Then the endpoint can be reached with the help of a browser or postman. 
The current address is: https://localhost:5001/, the only endpoint implemented is /list. Options available are a string of characters to be included in the anagram and minimum size of the list of anagrams. Example: https://localhost:5001/list?containsChar=adb&minSetSize=6
