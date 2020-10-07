//Create variables here
var dog,happyDog,database,foodS,foodStock;

function preload()
{
  //load images here
  dogimg=loadImage("images/dogImg.png");
  happyDogimg=loadImage("images/dogImg1.png");
}

function setup() {
  database = firebase.database();
  createCanvas(500, 500);
  
  dog=createSprite(250,250,40,40);
  dog.addImage(dogimg);
  dog.scale=0.25;

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
}


function draw() {  
background(46,139,87)

if(keyWentDown(UP_ARROW)){
  writeStock(foodS);
  dog.addImage(happyDogimg);
}
drawSprites();

textSize(30);
fill(0);
stroke(255);
text("food remaining:"+foodS,150,130);
textSize(20)
fill(0);
noStroke();
textStyle("jazzlet");
text("Note:Press UP_ARROW Key To Feed Drago Milk!",25,20);
  //add styles here

}

function writeStock(x){

  if(x<=0){
    x=0;
  }else{
    x=x-1;
  }

  database.ref('/').update({
    Food:x
  })
}


function readStock(data){
  foodS=data.val();
}
function showError(){
  console.log("Error occurred");
}


