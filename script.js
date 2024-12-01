nums = [1,2,3,4,5,6,7,8,9,10]
nums2 = [1,2,3,4,5,6,7,8,9,10]

pickedcard = ""
reset = ""
score = 0
matches = 0

function shuffle(array) {
    let currentIndex = array.length;
    while (currentIndex != 0) {
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  }

shuffle(nums);
shuffle(nums2);
function loadImages() {
    console.log("loadImages called");
    for (let i = 1; i < 11; i++) {
        let element = " <img src=./images/card.png class='card' name=img-" + nums[i-1] + " onclick=cardPick('img-"+nums[i-1]+"')>";
        document.getElementById("gameframe").innerHTML += element;
        let element2 = "<img src=./images/card.png class='card' name=img2-" + nums2[i-1] +" onclick=cardPick('img2-"+nums2[i-1]+"')>";
        document.getElementById("gameframe").innerHTML += element2;
    }
    
      
}



function cardPick(card) {
    if (reset != "") {
        hideCards();
        reset = "";
        pickedcard = "";
    }
    if (pickedcard == "") {
        pickedcard = card
        document.getElementsByName(card)[0].src = "./images/" + card.split("-")[1] + ".jpg";
    } else if (pickedcard != card) {
        document.getElementsByName(card)[0].src = "./images/" + card.split("-")[1] + ".jpg";
        if (pickedcard.split("-")[1] != card.split("-")[1]) {
            console.log("no match", pickedcard.split("-")[1], card.split("-")[1]);
            score -= 20;
            reset = card;
        } else {
            console.log("match", pickedcard.split("-")[1], card.split("-")[1]);
            score += 100;
            matches += 1;
            document.getElementsByName(pickedcard)[0].onclick = "";
            document.getElementsByName(card)[0].onclick = "";
            pickedcard = "";
        }
    } 

    document.getElementById("score").innerHTML = "Score: " + score;
    if (matches == 10) {
        document.getElementById("gameover").style.display = "inline";
        document.getElementById("gameover").innerHTML += "Score: " + score + '<br><button id="newgame" onclick="location.reload()">Play Again!</button>';
    }
}

function hideCards() {
    document.getElementsByName(reset)[0].src = "./images/card.png";
    document.getElementsByName(pickedcard)[0].src = "./images/card.png";
}