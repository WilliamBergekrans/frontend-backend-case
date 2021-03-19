/*
Functions for creating graph objects using charts.js. 
*/

/**
 * Load data from Populum's website. It should be in the from of a JSON array. 
 * When data is loaded: The function send the data to another function to create a graph. 
 */
$.getJSON("data.json",
    // Success function
    function (data) {
        // The data is already in json format, no need to parse through it. 
        // call function standrad_graph to create a graph from the data. 
        standard_graph(data);
    });

/**
 * Create a graph object
 * 
 */
function standard_graph(data) {
    var ctx = document.getElementById("mainChart").getContext('2d');

    var chart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'line',

        // The data for our dataset
        data: {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [{
                label: 'My First dataset',
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
                data: [0, 10, 5, 2, 20, 30, 45]
            }]
        },

        // Configuration options go here
        options: {}
    });
}
