/*
Functions for creating graph objects using charts.js. 
When this script is executed, the data is loaded and a bubble graph
is automatically created in the main canvas space. 
*/

/**
 * Load the data. No error handler is implemented.  
 */

// Ajax call to load the data from the server. Executes when script is loaded. 
$.getJSON("data.json",
    // Success function
    function (data) {
        // The data is already in json format, no need to parse through it. 

        // Store data in a global variable, assume that the data sent from the
        // server is meant for viewing (non-sensitive)
        gData = data;
        // Create a dataset for of the managers data. 
        var manager = getIndexData(gData);
        // Data for the company. 
        // Not in a function becuase only 1 observation. 
        var company = [{
            "x": gData[0]["responseRate"],
            "y": gData[0]["index"],
            "r": gData[0]["employees"]/5,
            "name": gData[0]["name"],
            "emp":gData[0]["employees"]
        }]

        // Create a graph in the canvas
        bubbleGraph(manager, company)
    }
);

/**
 * Function to create a datagraph consisting of two different data sets. 
 * @param {*} managerData 
 * @param {*} companyData 
 */
function bubbleGraph(managerData, companyData) {
    // Identify the canvas we want to render the chart in. 
    var target_element = $("#mainChart")[0].getContext('2d');

    // Create the chart. The framework chart.js is used. 
    // OBS. Set as a global variable so the graph can be updated. 
    chart = new Chart(target_element, {
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
                    // Data with null values are automatically left out. 
                    data: managerData
                },
                // Data for the company
                {
                    label: 'Company Average',
                    backgroundColor: 'rgb(0, 109, 119,0.5)',
                    borderColor: 'rgb(0, 109, 119)',
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
                align: 'center'
            },
            // Add a title for the graph
            title: {
                display: true,
                text: 'Index',
                fontSize: 20,
            },
            // Add x and y axis labels. 
            scales: {
                xAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: 'Response rate'
                    }
                }],
                yAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: 'Index'
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
                        // Get number of employees. 
                        var emp = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index].emp;
                        // Get the index
                        var ind = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index].index;
                        // employees multiplied by 5 because scaled down in data set for visual reasons. 
                        return [name,
                             emp + " employees.",
                            "Index: "+ind];
                    }
                }
            }
        }
    });

    Chart.defaults.global.defaultFontSize = 14;
}

/**
 * Convert the orginial dataset to be used for a bubblegraph
 * with x as index, y as responeRate and the size of the bubble determined
 * by employees. 
 * @param {*} data 
 * @returns x and y values + radius for each point
 */
function getIndexData(data) {
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
            "name": data[i]["name"], 
            "index": data[i]["index"],
            "emp":data[i]["employees"]
        }
    }
    // Return the list. 
    return (resp)
}
/**
 * Get all manager data from original set to showcase response rate
 * @param {*} data 
 * @returns 
 */
function getRespRateData(data) {
    // Initialize an array for storing the responseRate in.  
    var resp = []
    // Loop through the data set. 
    // The first position in the data set is for the entire company so we skip that. 
    for (i = 1; i < data.length; i++) {
        // Add the responeRate to the list. 
        resp[i - 1] = {
            "x": data[i]["indexChange"],
            "y": data[i]["responseRate"],
            "r": data[i]["employees"],
            "name": data[i]["name"],
            "index": data[i]["index"],
            "emp":data[i]["employees"]
        }
    }
    // Return the list. 
    return (resp)
}
/**
 * Get all manager data from the original set showing index change. 
 * @param {*} data 
 * @returns 
 */
function getIndexChangeData(data) {
    // Initialize an array for storing the responseRate in.  
    var resp = []
    // Loop through the data set. 
    // The first position in the data set is for the entire company so we skip that. 
    for (i = 1; i < data.length; i++) {
        // Add the responeRate to the list. 
        resp[i - 1] = {
            "x": data[i]["index"],
            "y": data[i]["indexChange"],
            "r": data[i]["employees"],
            "name": data[i]["name"],
            "index": data[i]["index"],
            "emp":data[i]["employees"]
        }
    }
    // Return the list. 
    return (resp)
}


/**
 * Click event handlers. 
 */

/**
 * Listener for the index button 
 * Updates the chart labels and data. 
 */
$("#indexButton").click(function () {
    // Create a dataset for of the managers data. 
    var manager = getIndexData(gData);
    // Data for the company. 
    // Not in a function becuase only 1 observation. 
    var company = [{
        "x": gData[0]["responseRate"],
        "y": gData[0]["index"],
        "r": gData[0]["employees"]/5,
        "name": gData[0]["name"],
        "index": gData[0]["index"],
        "emp":gData[0]["employees"]
    }]
    // Update the datasets
    chart.data.datasets[0].data = manager;
    chart.data.datasets[1].data = company;
    // Update options for the chart. 
    chart.options.title.text = "Index"
    // Update x axis title
    chart.options.scales.xAxes[0] = {
        scaleLabel: {
            display: true,
            labelString: 'Response Rate'
        }
    }
    // Update y axis title
    chart.options.scales.yAxes[0] = {
        scaleLabel: {
            display: true,
            labelString: 'Index'
        }
    }
    // Display the legend
    chart.options.legend.display = true;
    // Update and render the graph. 
    chart.update();
});

/**
 * Response rate button listener
 * Updates chart labels and data. 
 */
$("#responseRateButton").click(function () {
    // Create a dataset for of the managers data. 
    var manager = getRespRateData(gData);
    // Data for the company. 
    // For this graph we do not want to include the company due to 
    // visibility issus. 
    var company = [{
        "x": gData[0]["indexChange"],
        "y": gData[0]["responseRate"],
        "r": gData[0]["employees"]/5,
        "name": gData[0]["name"],
        "index": gData[0]["index"],
        "emp":gData[0]["employees"]
    }]

    // Update datasets 
    chart.data.datasets[0].data = manager; // Updates the manager data set
    chart.data.datasets[1].data = company; // Updates the data for the company. Null in this case. 
    // Update options for the chart 
    chart.options.title.text = "Response Rates"
    // Update x axis title
    chart.options.scales.xAxes[0] = {
        scaleLabel: {
            display: true,
            labelString: 'Index Change'
        }
    }
    // Update y axis title
    chart.options.scales.yAxes[0] = {
        scaleLabel: {
            display: true,
            labelString: 'Response Rates'
        }
    }
    // Remove the legend
    chart.options.legend.display = true;
    // Update and render the graph
    chart.update();
});

/**
 * Index change button listener. 
 * Updates the graph with the correct labels and data. 
 */
$("#indexChangeButton").click(function () {
    // Create a dataset for of the managers data. 
    var manager = getIndexChangeData(gData);
    // Data for the company. 
    // For this graph we do not want to include the company due to 
    // visibility issus. 
    var company = [{
        "x": gData[0]["index"],
        "y": gData[0]["indexChange"],
        "r": gData[0]["employees"] / 5,
        "name": gData[0]["name"],
        "index": gData[0]["index"],
        "emp":gData[0]["employees"]
    }]

    // Update datasets 
    chart.data.datasets[0].data = manager; // Updates the manager data set
    chart.data.datasets[1].data = company; // Updates the data for the company. Null in this case. 
    // Update options for the chart 
    chart.options.title.text = "Index Change"
    // Update x axis title
    chart.options.scales.xAxes[0] = {
        scaleLabel: {
            display: true,
            labelString: 'Index'
        }
    }
    // Update y axis title
    chart.options.scales.yAxes[0] = {
        scaleLabel: {
            display: true,
            labelString: 'Index Change'
        }
    }
    // Remove the legend
    chart.options.legend.display = true;
    // Update and render the graph
    chart.update();
});