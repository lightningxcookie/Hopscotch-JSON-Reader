// Table variables
var scenesTable = document.getElementById("scenes");
var abilitiesTable = document.getElementById("abilities");
var objectsTable = document.getElementById("objects");
var customObjectsTable = document.getElementById("customObjects");
var variablesTable = document.getElementById("variables");
var rulesTable = document.getElementById("rules");

// Cell variables
var cell;
var cell2;

var objects = [];
var objectIDs = [];
var objectTables = [];

var abilities = new Array();
var listOfBlocks = [];

var projectJson;

// Retrieves data from imported JSON file and send it to HTML file
function getHopscotchData(json)
{
    // Prints JSON data to the console.
    console.log(json); 
    
    projectJson = json;
    
    // Stage size
    document.getElementById("width").value = json.stageSize.width;
    document.getElementById("height").value = json.stageSize.height;
                 
    /* 
    
    Original user (only works for remixed projects)
    
    document.getElementById("originalUser").innerHTML = document.getElementById("originalUser").innerHTML + json.original_user.nickname;
    
    */
          
    populateAbilitiesTable(json)
    populateScenesTable(json)
    populateObjectsTable(json)
    populateVariablesTable(json)
    //populateRulesTable(json)
    populateObjectTables(json)
    
    // Loops through custom objects (images)
    for (var i = 0; i < json.customObjects.length; i++)
    {
        // Create new row in customObjectsTable,
        var row = customObjectsTable.insertRow(0);
        // insert new cell,
        cell = row.insertCell(0);
        // and set text of the cll to the name of the custom object.
        cell.innerHTML = json.customObjects[i].fileName;
    }
}

function populateAbilitiesTable(json) {
    
    // Loops through abilites.                
    for (var i = 0; i < json.abilities.length; i++)
    {
        // If the ability has a name index,
        if (json.abilities[i].name !== undefined)
        {
            // create new row in abilitesTable,
            var row = abilitiesTable.insertRow(1);
            // insert new cell,
            cell = row.insertCell(0);
            // and set text to cell to the name of the ability.
            cell.innerHTML = json.abilities[i].name;                
        } // end if          
        
        var keyToUse = json.abilities[i].abilityID;
        
        abilities[keyToUse] = "";
        
        for (key in json.abilities[i].blocks)
        {
            var parameters = json.abilities[i].blocks[key].parameters
            
            if (abilities[keyToUse] == "")
            {
                if(json.abilities[i].blocks[key].parameters != undefined)
                {
                    if (parameters.length == 2)
                    {
                        abilities[keyToUse] = json.abilities[i].blocks[key].description + "("  + parameters[0].value + ") " + "("  + parameters[1].value + ")";
                    }
                    else 
                    {
                        abilities[keyToUse] = json.abilities[i].blocks[key].description + "("  + parameters[0].value + ")";
                    }
                }
                else
                {
                    abilities[keyToUse] = json.abilities[i].blocks[key].description;    
                }
            }
            else
            {
                if(json.abilities[i].blocks[key].parameters != undefined)
                {
                    listOfBlocks.push(json.abilities[i].blocks[key].description + "(" + parameters[0].value +")")
                    
                    if (parameters.length == 2)
                    {
                        abilities[keyToUse] = abilities[json.abilities[i].abilityID] + "<br>" + json.abilities[i].blocks[key].description + "("  + parameters[0].value + ") " + "("  + parameters[1].value + ")";
                    }
                    else 
                    {
                        abilities[keyToUse] = abilities[json.abilities[i].abilityID] + "<br>" + json.abilities[i].blocks[key].description + "("  + parameters[0].value + ")";
                    }
                }
                else
                {
                    abilities[keyToUse] = abilities[json.abilities[i].abilityID] + "<br>" + json.abilities[i].blocks[key].description;
                }
                
            }
            
        }
        
    } // end for
}

function populateScenesTable(json) {
    
    // Loops through scenes.
    for (var i = 0; i < json.scenes.length; i++)
    {
        // Create new row in scenesTable,
        var row = scenesTable.insertRow(1);
        // insert new cell,
        cell = row.insertCell(0);
        // and set text to cell to the name of the scene
        cell.innerHTML = json.scenes[i].name;
    } // end for
}

function populateObjectsTable(json) {
    
    // Loops through objects.
    for (var i = 0; i < json.objects.length; i++)
    {
        // Create new row in objectsTable,
        var row = objectsTable.insertRow(1);
        // insert new cells, for name, type, x position and y position,
        var nameCell = row.insertCell(0);
        
        var typeCell = row.insertCell(1);
        var xCell = row.insertCell(2);
        var yCell = row.insertCell(3);
        //var idCell = row.insertCell(4);
                    
        // and set text of cells to the corresponding data.
        nameCell.innerHTML = json.objects[i].name;
        //idCell.innerHTML = json.objects[i].objectID;
        typeCell.innerHTML = hopscotchObjects(json.objects[i].filename);
        xCell.innerHTML = json.objects[i].xPosition;
        yCell.innerHTML = json.objects[i].yPosition;
        
        // Add object and object ID to the respective arrays
        objects.push(json.objects[i].name);
        objectIDs.push(json.objects[i].objectID);
        
        // Create ID for object table,
        var objectTableID = json.objects[i].name.replace(/ /g,"_").toLowerCase() + "Table";
        // add the new ID to the array,
        objectTables.push(objectTableID);
        // create new table element and set attributes,
        var table = document.createElement("table");
        table.setAttribute("id", objectTableID);
        table.setAttribute("class", "objectTable");
        // add it to the left div,
        document.getElementById("left").appendChild(table);
        // and add a break below.
        var br = document.createElement("br");
        document.getElementById("left").appendChild(br);
        document.getElementById("left").appendChild(br);
    }
}

function populateVariablesTable(json) {
    // Loops through variables
    for (var i = 0; i < json.variables.length; i++)
    {
        // Create new row in variablesTable,
        var row = variablesTable.insertRow(1);
        // insert new cell,
        cell = row.insertCell(0);
        // and set text of the cell to the name of the variable.
        cell.innerHTML = json.variables[i].name;
    }
    
}

function populateRulesTable(json) {
    // Loops through rules (When blocks)
    for (var i = 0; i < json.rules.length; i++)
    {
        // Create new row in customObjectsTable,
        var row = rulesTable.insertRow(1);
        
        var nameCell = row.insertCell(0);
        var blocksCell = row.insertCell(1);
        var descriptionCell = row.insertCell(2);
        
        // Loops through the objectIDs array
        for (var x = 0; x < objectIDs.length; x++)
        {
            // Checks for matches with object IDs and the objectID of the rule
            if (objectIDs[x] == json.rules[i].objectID)
            {
                // If there is a match, set the text of the idCell to the name of the object.
                nameCell.innerHTML = objects[x];
            }
            
        }
        
        for (key in abilities)
        {
            if (key == json.rules[i].abilityID)
            {
                blocksCell.innerHTML = abilities[key]; 
            }
        }
        
        // and set text of cells to the corresponding data.
        //abilityCell.innerHTML = json.rules[i].abilityID;
        descriptionCell.innerHTML = json.rules[i].parameters[0].datum.description;
    }
}

function populateObjectTables(json) {
    for (var x = 0; x < objectTables.length; x++) {
        
        var id = objectTables[x];
        var currentTable = document.getElementById(id);
        
        var nameRow = currentTable.insertRow(0);
        var nameCell = nameRow.insertCell(0);
        nameCell.innerHTML = json.objects[x].name.bold();
        
        for (var i = 0; i < json.rules.length; i++)
        {
            if (json.rules[i].objectID == objectIDs[x]) {
                for (key in abilities)
                {
                    if (key == json.rules[i].abilityID)
                    {
                        var row = currentTable.insertRow(currentTable.rows.length);
            
                        var whenCell = row.insertCell(0);
                        whenCell.innerHTML = json.rules[i].parameters[0].datum.description;
                        var blocksCell = row.insertCell(1);
                        blocksCell.innerHTML = abilities[key]; 
                    }
                }
            }
        
        }
    }
}

function saveChanges() {
    
    if (projectJson !== undefined) {
        projectJson.stageSize.width = parseInt( document.getElementById("width").value);
        
        projectJson.stageSize.height = parseInt( document.getElementById("height").value);
        console.log(projectJson);
        
        document.getElementById("results").innerHTML = JSON.stringify(projectJson);
    }
    
}

// hopscotchObjects() takes one parameter, filename
// and depending on the filename of the object,
// return the correct object type.
function hopscotchObjects(filename){
                
    // New variable to store object type (string)
    var result = "";
    switch(filename) {
        case "text-object.png": result = "Text"; break;
        // Shapes
        case "heart.png": result = "Heart"; break;
        case "arch.png": result = "Arch"; break;
        case "squiggle.png": result = "Squiggle"; break;
        case "star.png": result = "Star"; break;
        case "parallelogram.png": result = "Parallelogram"; break;
        case "donut.png": result = "Donut"; break;
        case "threeProngedBoomerang.png": result = "Fan Blade"; break;
        case "circle.png": result = "Circle"; break;
        case "square.png": result = "Square"; break;
        case "hexagon.png": result = "Hexagon"; break;
        case "triangle.png": result = "Triangle"; break;
        case "rightTriangle.png": result = "Right Triangle"; break;
        case "rectangle.png": result = "Rectangle"; break;
        case "tetrisZ.png": result = "Z"; break;
        case "tetrisT.png": result = "T"; break;
        case "tetrisL.png": result = "L"; break;
        case "corner.png": result = "Corner"; break;
        case "flower.png": result = "Flower"; break;
        case "squishedBox.png": result = "Squished Box"; break;
        case "bead.png": result = "Bead"; break;
        case "chevron.png": result = "Chevron"; break;
        case "xShape.png": result = "X"; break;
        case "tetrisLine.png": result = "Platform"; break;
        // Characters
        case "chillanna.png": result = "Chillanna"; break;
        case "astro.png": result = "Cosmic Cody"; break;
        case "robo.png": result = "Robo"; break;
        case "stargirl.png": result = "Star Girl"; break;
        case "monkey.png": result = "Monkey"; break;
        case "octopus.png": result = "Octopus"; break;
        case "gorilla.png": result = "Gorilla"; break;
        case "cupcake.png": result = "Cupcake"; break;
        case "bear.png": result = "Bear"; break;
        case "dino.png": result = "Dino"; break;
        case "frog.png": result = "Frog"; break;
        case "greenman.png": result = "Jody"; break;
        case "mustache.png": result = "Mr. Mustache"; break;
        case "spacepod.png": result = "Space Pod"; break;
        case "raccoon.png": result = "Raccoon"; break;
        case "bird.png": result = "Bird"; break;
        case "crocodile.png": result = "Crocodile"; break;
        // Jungle
        case "banyan.png": result = "Banyan"; break;
        case "parrot-flying-object.png": result = "Parrot"; break;
        case "mandrill.png": result = "Mandrill"; break;
        case "miss-chief.png": result = "Miss Chief"; break;
        case "mosquito.png": result = "Mosquito"; break;
        case "jeepers.png": result = "Jeepers"; break;
        case "venus.png": result = "Venus"; break;
        case "toucan.png": result = "Toucan"; break;
        case "anteater.png": result = "Anteater"; break;
        case "iguana.png": result = "Iguana"; break;
        case "sloth.png": result = "Sloth"; break;
        case "hut.png": result = "Hut"; break
        default: result = "Image"
    }
         
    return result;
}