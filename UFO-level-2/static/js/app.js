

// from data.js
var tableData = data;



// Reference to table body
var tableBody = d3.select("tbody");

//Function to display the table body
function UfoData(UfoSight){
    var row = tableBody.append("tr");
    Object.entries(UfoSight).forEach(function([key,value]){
        var cell = row.append("td");
        cell.text(value);
});
}



tableData.forEach(UfoData);

// Reference to filter button
var filterBtn = d3.select("#filter-btn");


//Adding more child elements corresponding to new filters
function createFilter(filterName){
var node = document.createElement("li"); 
var nodeSecond= document.createElement("label");
var nodeThird=document.createElement("input");
node.setAttribute("class","filter list-group-item");
nodeThird.setAttribute("class", "form-control");
nodeThird.setAttribute("type","text");


Object.entries(filterName).forEach(function([key,value]){
    if (key=== "for"){
    nodeSecond.setAttribute("for",value);
    }
    if (key === "id"){
    nodeThird.setAttribute("id",value);
    }
    if (key === "placeholder"){
    nodeThird.setAttribute("placeholder",value);
    }
    if (key=== "name"){
    nodeSecond.textContent= value;
    }
});

node.appendChild(nodeSecond);  
node.appendChild(nodeThird)  ;                   
document.getElementById("filters").appendChild(node); 


}

var texts=[{"name":"Enter a City","for":"city","id":"cityseen","placeholder":"benton"},{"name":"Enter a State","for":"state","id":"stateseen","placeholder":"ar"},{"name":"Enter a Country","for":"country","id":"countryseen","placeholder":"us"},{"name":"Enter a Shape","for":"shape","id":"ufoshape","placeholder":"circle"}]
texts.forEach(createFilter);

function runEnter(){
    // d3.eventpreventDefault();
     var inputDate= d3.select("#datetime");
     var inputCity= d3.select("#cityseen");
     var inputState= d3.select("#stateseen");
     var inputCountry= d3.select("#countryseen");
     var inputShape=d3.select("#ufoshape");
     
     var inputValueDate= inputDate.property("value");
     var inputValueCity= inputCity.property("value");
     var inputValueState= inputState.property("value");
     var inputValueCountry= inputCountry.property("value");
     var inputValueShape= inputShape.property("value");
     //console.log(inputValueDate);
     //console.log(inputValueCity);
     
     var my_query="";
     var queryCounter=0;

     
     if(inputValueDate !== ""){
         my_query=my_query.concat("(UfoSight.datetime === inputValueDate)");
         queryCounter++;
    }
    if(inputValueCity !== ""){
        if(queryCounter>0)
        {
            my_query=my_query.concat(" && (UfoSight.city === inputValueCity)");
        }
        if (queryCounter==0)
        {
            my_query=my_query.concat("(UfoSight.city === inputValueCity)");
            queryCounter++;
        }   
    }
    if(inputValueState !== ""){
        if(queryCounter>0)
        {
            my_query=my_query.concat(" && (UfoSight.state === inputValueState)");
        }
        if (queryCounter==0)
        {
            my_query=my_query.concat("(UfoSight.state === inputValueState)");
            queryCounter++;
        }   
    }
    if(inputValueCountry !== ""){
        if(queryCounter>0)
        {
            my_query=my_query.concat(" && (UfoSight.country === inputValueCountry)");
        }
        if (queryCounter==0)
        {
            my_query=my_query.concat("(UfoSight.country === inputValueCountry)");
            queryCounter++;
        }   
    }
    if(inputValueShape !== ""){
        if(queryCounter>0)
        {
            my_query=my_query.concat(" && (UfoSight.shape === inputValueShape)");
        }
        if (queryCounter==0)
        {
            my_query=my_query.concat("(UfoSight.shape === inputValueShape)");
            queryCounter++;
        }   
    }
    console.log(my_query);

    var filteredData;
    if(my_query === "")
    {
        //return entire table
        tableBody.html("");
        tableData.forEach(UfoData);
    }
    else if(my_query !== "")
    {
        //return filtered data
        filteredData = tableData.filter(UfoSight => eval(my_query));
        console.log(filteredData);
        tableBody.html("");
        filteredData.forEach(UfoData);
    }


    
     
 }
 
//Clicking on the filter button
filterBtn.on("click",runEnter);

