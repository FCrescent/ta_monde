

//document.getElementById("plop").innerHTML = "Yattaaaaaaa!";

class Character {
    constructor(typeTa, charX, charY, happiness) {
        this.charId = 0;
        this.typeTa = typeTa;
        this.charX = charX;
        this.charY = charY;
        this.happiness = happiness;
    }

   
}

class Area {
    constructor(name, areaX, areaY, width, height, bgColor) {
        this.name = name;
        this.areaX = areaX;
        this.areaY = areaY;
        this.width = width;
        this.height = height;
        this.bgColor = bgColor;
        this.middleX = areaX + (width / 2);
        this.middleY = areaY + (height / 2);
    }
}


var characters = [
    new Character("ent", 50, 50, 50),
    new Character("inf", 100, 50, 60),
    new Character("int", 50, 100, 50),
    new Character("ifn", 100, 100, 60)
];
var map = document.getElementsByClassName("map")[0];
var charsInfoList = document.getElementsByClassName("chars-info-list")[0];

var specialAreas = [
    new Area("Cuisine", 550, 202, 100, 100, "brown"),
    new Area("Chambres", 450, 300, 200, 100, "pink")
];

//ON MET EN PLACE LES PERSONNAGES
characters.forEach(function iterate(character, index, array) {  //character => {
    character.charId = index + 1; //on remplit l'Id du character !
    let characterDiv = document.createElement("div");
    characterDiv.id = "charDiv" + (character.charId).toString();
    characterDiv.classList.add("character", character.typeTa)
    characterDiv.style.left = character.charX.toString() + "px";
    characterDiv.style.top = character.charY.toString() + "px";
    map.appendChild(characterDiv);

    let charInfoLi = document.createElement("li");
    charInfoLi.innerHTML = "#" + (character.charId).toString() + " (" + character.typeTa.toUpperCase() + ") :";
    charsInfoList.appendChild(charInfoLi);

    let charInfoUl = document.createElement("ul");
    charInfoLi.appendChild(charInfoUl);
    let happinessInfoLi = document.createElement("li");
    happinessInfoLi.id = "happiness-char-" + (character.charId).toString();
    happinessInfoLi.innerHTML = "Bonheur : " + character.happiness.toString() + "/100"
    charInfoUl.appendChild(happinessInfoLi);

});

//ON MET EN PLACE LES ENDROITS SUR LA CARTE
specialAreas.forEach(function iterate(area, index, array) {
    let areaDiv = document.createElement("div");
    areaDiv.classList.add("area")
    areaDiv.innerHTML = area.name;
    areaDiv.style.left = area.areaX.toString() + "px";
    areaDiv.style.top = area.areaY.toString() + "px";
    areaDiv.style.width = area.width.toString() + "px";
    areaDiv.style.height = area.height.toString() + "px";
    areaDiv.style.backgroundColor = area.bgColor.toString();
    map.appendChild(areaDiv);
});

function happinessDecrease() {
    characters.forEach(function iterate(character, index, array) {
        character.happiness -= 0.1;
        let happinessInfoLi = document.getElementById("happiness-char-" + (character.charId).toString());
        happinessInfoLi.innerHTML = "Bonheur : " + character.happiness.toString().match(/^-?\d+(?:\.\d{0,1})?/)[0] + "/100"
    });
}

var characterSpeed = 2;

function walk(charToMove, targetPlace) {
    let xMove = 0;
    let yMove = 0;
    if (charToMove.charX < targetPlace.middleX) {
        xMove = characterSpeed;
    } else if (charToMove.charX > targetPlace.middleX) {
        xMove = - characterSpeed;
    }

    if (charToMove.charY < targetPlace.middleY) {
        yMove = characterSpeed;
    } else if (charToMove.charY > targetPlace.middleY) {
        yMove = - characterSpeed;
    }

    charToMove.charX += xMove;
    charToMove.charY += yMove;
    let charToMoveDiv = document.getElementById("charDiv" + (charToMove.charId).toString())
    charToMoveDiv.style.left = charToMove.charX.toString() + "px";
    charToMoveDiv.style.top = charToMove.charY.toString() + "px";
}

function charIsInArea(charToCheck, areaToCheck) {
    let charIsInArea = false;
    let areaEndX = areaToCheck.areaX + areaToCheck.width;
    let areaEndY = areaToCheck.areaY + areaToCheck.height;

    if (charToCheck.charX > areaToCheck.areaX && charToCheck.charX < areaEndX //vérif coordonnées horizontales
        && charToCheck.charY > areaToCheck.areaY && charToCheck.charY < areaEndY //vérif coordonnées verticales
        ) {
        charIsInArea = true;
    }
    return charIsInArea;
}

function charActions() {
    characters.forEach(function iterate(character, index, array) {
        if (character.happiness <= 40) {
            let solutionArea = specialAreas[0]; //kitchen par exemple

            if (charIsInArea(character, solutionArea) == false) {
                walk(character, solutionArea);
            }
        }
    });
}



function actualize() {
    happinessDecrease();
    charActions();
    //console.log("hello!");
}
setInterval(actualize, 100);



