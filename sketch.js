//Create variables here
var dog,happyDog,database,foodS,dogImg,happydogImg;
function preload()
{
  //load images here
  happydogImg = loadImage("images/dogImg1.png");
  dogImg = loadImage("images/dogImg.png");
}

function setup() {
  createCanvas(500, 500);
 dog=createSprite(200,200,30,30);
 dog.addImage(dogImg)
 dog.scale=0.4
  database=firebase.database();
  var foodLeft=database.ref('food');
  foodLeft.on("value",readStock,showerr);
}


function draw() {  
background(46,139,87)
if(keyWentDown(UP_ARROW)){
  writeStock(foodS);
  //foodLeft-=1;
  dog.addImage(happydogImg);
}
  drawSprites();
  //add styles here
  textSize(20);
  fill("white");
  stroke(10)
  text("Food Remaining:" + foodS,150,100);
  text("NOTE:"+ "Press Up Arrow key to feed milk to your dog",25,50);
}
function readStock(data){
  foodS=data.val();
}
function writeStock(x){
  if(x<=0){
    x=0;
  }else{
    x -= 1;
  }
  database.ref('/').update({
    food:x
})
}


function showerr(){
  console.log("errinreadingthedata")
}