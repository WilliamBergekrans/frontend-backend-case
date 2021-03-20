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
        bubbleGraph(data);
        // standard_graph(getIndex(data), getResponseRate(data));
    });



function bubbleGraph(data) {
    // Create two standard set
    var managerData = getManagerData(data)
    var companyData = [{
        "x": data[0]["responseRate"],
        "y": data[0]["index"],
        "r": data[0]["employees"]/5,
        "name": data[0]["name"]
    }]
    
    // Identify the canvas we want to render the chart in. 
    var target_element = $("#mainChart")[0].getContext('2d');

    console.log(data[0]["employees"])
    // Create the chart. The framework chart.js is used. 
    var chart = new Chart(target_element, {
        // The type of chart we want to create
        type: 'bubble',

        // The data for our dataset
        data: {
            datasets: [
                // First set is data about all managers
                {
                    label: 'Managers',
                    backgroundColor: 'rgb(165, 208, 168,0.5)',
                    borderColor: 'rgb(0,0,0,0.7)',
                    // Use the input points as points. 
                    data: managerData
                },
                // Data for the company
                {
                    label: 'Company Average',
                    backgroundColor: 'rgb(183, 153, 13,0.5)',
                    borderColor: 'rgb(183, 153, 13)',
                    data: companyData
                }
            ]
        },

        // Configuration of chart options 
        options: {
            // Put legend below the graph
            legend: {
                display: true,
                position: 'bottom',
                align: 'center', 
                onHover: function(e, legendItem) {
                    console.log(legendItem)
                }
            },
            // Add a title for the graph
            title: {
                display: true,
                text: 'Manager Response Rates',
                fontSize: 20,
            },
            // Add x and y axis labels. 
            scales: {
                xAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: 'Index'
                    }
                }],
                yAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: 'Response rate'
                    }
                }]
            },
            // To make it responsive with the object it is nested in (a div). 
            maintainAspectRatio: false,
            // The tooltip is what is shown when the mouse hovers over a point. 
            tooltips: {
                callbacks: {
                    // Edit what is displayed in the tooltip 
                    label: function (tooltipItem, data) {
                        // Get the name for the current point
                        var name = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index].name;
                        // Get the change index. 
                        return name;
                    }
                }
            }
        }
    });
}

/**
 * Convert the orginial dataset to be used for a bubblegraph
 * with x as index, y as responeRate and the size of the bubble determined
 * by employees. 
 * @param {*} data 
 * @returns x and y values + radius for each point
 */
function getManagerData(data) {
    // Initialize an array for storing the responseRate in.  
    var resp = []
    // Loop through the data set. 
    // The first position in the data set is for the entire company so we skip that. 
    for (i = 1; i < data.length; i++) {
        // Add the responeRate to the list. 
        resp[i - 1] = {
            "x": data[i]["responseRate"],
            "y": data[i]["index"],
            "r": data[i]["employees"],
            "name": data[i]["name"]
        }
    }
    // Return the list. 
    return (resp)
}