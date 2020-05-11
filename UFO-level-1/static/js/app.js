// from data.js
var tableData = data;

// Reference to table body
var tableBody = d3.select("tbody");


//Function to add UFO data
function UfoData(UfoSight){
    var row = tableBody.append("tr");
    Object.entries(UfoSight).forEach(function([key,value]){
        var cell = row.append("td");
        cell.text(value);
});
}


//Adding ufo data to the table
tableData.forEach(UfoData);





// Reference to filter button
var filterBtn = d3.select("#filter-btn");


// Clicking the filter button
filterBtn.on("click",runEnter);


//Function to run on clicking the filter button
function runEnter(){
   // d3.eventpreventDefault();
    var inputDate= d3.select("#datetime");
    var inputValueDate= inputDate.property("value");
    console.log(inputValueDate);
    var filteredData = tableData.filter(UfoSight => UfoSight.datetime === inputValueDate);
    console.log(filteredData);
    tableBody.html("");
    filteredData.forEach(UfoData);
    
}



