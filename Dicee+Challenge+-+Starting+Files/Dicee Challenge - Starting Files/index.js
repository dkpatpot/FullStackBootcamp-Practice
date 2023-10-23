var randomizerDice1 = Math.floor(Math.random() * 6)+1;
var randomizerDice2 = Math.floor(Math.random() * 6)+1;
document.querySelector(".img1").setAttribute("src","images/dice" + randomizerDice1 +".png");
document.querySelector(".img2").setAttribute("src","images/dice" + randomizerDice2 +".png");
if(randomizerDice1>randomizerDice2){
    document.querySelector("h1").innerHTML = "Player 1 win!";
}
else if(randomizerDice1<randomizerDice2){
    document.querySelector("h1").innerHTML = "Player 2 win!";
}
else{
    document.querySelector("h1").innerHTML = "Draw!";
}