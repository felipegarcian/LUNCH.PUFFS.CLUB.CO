var car;
var carColor = 0xff0000;
var carTurnSpeed = 250;

var obstacleGroup;

var obstacleSpeed = 500;
var obstacleDelay = 350;

var road;




var ratState =
{
     create: function(){
         road = game.add.image(game.width / 2, game.height / 2, "floor");
         road.anchor.x = 0.5;
         road.anchor.y = 0.5;

         game.physics.startSystem(Phaser.Physics.ARCADE);
         obstacleGroup = game.add.group();
         cursors = this.input.keyboard.createCursorKeys();

         car = game.add.sprite(game.width / 2, game.height - 40, "car");
         car.positions = [game.width / 6, game.width  / 2 , game.width - (game.width / 6)];
         car.anchor.set(0.5);
         car.canMove = true;
         car.side = 1;
         car.x = car.positions[car.side];
         game.physics.enable(car, Phaser.Physics.ARCADE);
         car.body.allowRotation = false;
         car.body.moves = false;


         game.time.events.loop(obstacleDelay, function(){
              var obstacle = new Obstacle(game);
              game.add.existing(obstacle);
              obstacleGroup.add(obstacle);
         });

         game.time.events.add(Phaser.Timer.SECOND * 5, switchToRat, this);
    },
    update: function(){
         game.physics.arcade.collide(car, obstacleGroup, function(){
              game.state.start("rat");
         });

         if (cursors.left.isDown)
         {
              moveCarLeft();
         }
         if (cursors.right.isDown)
         {
              moveCarRight();
         }

}};

function moveCarLeft(){

    if(car.canMove){
         car.canMove = false;
         car.side = (car.side - 1 > 0 ? car.side - 1 : 0);
         var moveTween = game.add.tween(car).to({
              x: car.positions[car.side],
         }, carTurnSpeed, Phaser.Easing.Linear.None, true);
         moveTween.onComplete.add(function(){
              car.canMove = true;
         })
    }
}

function moveCarRight(){

    if(car.canMove){
         car.canMove = false;
         car.side = (car.side + 1 > 0 ? car.side + 1 : 0);
         var moveTween = game.add.tween(car).to({
              x: car.positions[car.side],
         }, carTurnSpeed, Phaser.Easing.Linear.None, true);
         moveTween.onComplete.add(function(){
              car.canMove = true;
         })
    }
}

Obstacle = function (game) {
    var position = game.rnd.between(0, 2);
    Phaser.Sprite.call(this, game, game.width * (position * 2 + 1) / 6, -20, "obstacle");
    game.physics.enable(this, Phaser.Physics.ARCADE);
    this.anchor.set(0.5);
    this.tint = carColor;
};

Obstacle.prototype = Object.create(Phaser.Sprite.prototype);
Obstacle.prototype.constructor = Obstacle;

Obstacle.prototype.update = function() {
    this.body.velocity.y = obstacleSpeed;
    if(this.y > game.height){
        this.destroy();
    }
};

function switchToRat() {

    game.state.start("pigeon");

}




