// Table variables
var scenesTable = document.getElementById("scenes");
var abilitiesTable = document.getElementById("abilities");
var objectsTable = document.getElementById("objects");
var customObjectsTable = document.getElementById("customObjects");
var variablesTable = document.getElementById("variables");

// Cell variables
var cell;
var cell2;

// Retrieves data from imported JSON file and send it to HTML file
function getHopscotchData(json)
{
    // Prints JSON data to the console.
    console.log(json); 
    
    // Stage size
    document.getElementById("width").innerHTML = document.getElementById("width").innerHTML + json.stageSize.width;
    document.getElementById("height").innerHTML = document.getElementById("height").innerHTML +  json.stageSize.height;
                 
    // Original user
    //document.getElementById("originalUser").innerHTML = document.getElementById("originalUser").innerHTML + json.original_user.nickname; 
                    
    // Loops through abilites.                
    for (var i = 0; i < json.abilities.length; i++)
    {
        // If the ability has a name index,
        if (json.abilities[i].name !== undefined)
        {
            // create new row in abilitesTable,
            var row = abilitiesTable.insertRow(0);
            // insert new cell,
            cell = row.insertCell(0);
            // and set text to cell to the name of the ability.
            cell.innerHTML = json.abilities[i].name;                
        } // end if          
    } // end for
                    
    // Loops through scenes.
    for (var i = 0; i < json.scenes.length; i++)
    {
        // Create new row in scenesTable,
        var row = scenesTable.insertRow(0);
        // insert new cell,
        cell = row.insertCell(0);
        // and set text to cell to the name of the scene
        cell.innerHTML = json.scenes[i].name;
    } // end for
     
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
                    
        // and set text of cells to the corresponding data.
        nameCell.innerHTML = json.objects[i].name;
        typeCell.innerHTML = hopscotchObjects(json.objects[i].filename);
        xCell.innerHTML = json.objects[i].xPosition;
        yCell.innerHTML = json.objects[i].yPosition;
    }
    
    // Loops through variables
    for (var i = 0; i < json.variables.length; i++)
    {
        // Create new row in variablesTable,
        var row = variablesTable.insertRow(0);
        // insert new cell,
        cell = row.insertCell(0);
        // and set text of the cell to the name of the variable
        cell.innerHTML = json.variables[i].name;
    }
                    
    // Loops through custom objects (images)
    for (var i = 0; i < json.customObjects.length; i++)
    {
        // Create new row in customObjectsTable,
        var row = customObjectsTable.insertRow(0);
        // insert new cell,
        cell = row.insertCell(0);
        // and set text of the cll to the name of the variable.
        cell.innerHTML = json.customObjects[i].name;
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
        default: result = ""
    }
         
    return result;
}