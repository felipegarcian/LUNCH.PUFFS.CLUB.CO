var rat;
var ratColor = 0xff0000;
var ratTurnSpeed = 250;

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

         rat = game.add.sprite(game.width / 2, game.height - 40, "rat");
         rat.positions = [game.width / 6, game.width  / 2 , game.width - (game.width / 6)];
         rat.anchor.set(0.5);
         rat.canMove = true;
         rat.side = 1;
         rat.x = rat.positions[rat.side];
         game.physics.enable(rat, Phaser.Physics.ARCADE);
         rat.body.allowRotation = false;
         rat.body.moves = false;


         game.time.events.loop(obstacleDelay, function(){
              var obstacle = new Obstacle(game);
              game.add.existing(obstacle);
              obstacleGroup.add(obstacle);
         });

         game.time.events.add(Phaser.Timer.SECOND * game.rnd.integerInRange(5, 10), switchToPigeon, this);
    },
    update: function(){
         game.physics.arcade.collide(rat, obstacleGroup, function(){

            message = "Your time: " + (game.time.totalElapsedSeconds() - menuTime).toFixed(2) + "s";
            game.state.start("menu");
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

    if(rat.canMove){
         rat.canMove = false;
         rat.side = (rat.side - 1 > 0 ? rat.side - 1 : 0);
         var moveTween = game.add.tween(rat).to({
              x: rat.positions[rat.side],
         }, ratTurnSpeed, Phaser.Easing.Linear.None, true);
         moveTween.onComplete.add(function(){
              rat.canMove = true;
         })
    }
}

function moveCarRight(){

    if(rat.canMove){
         rat.canMove = false;
         rat.side = (rat.side + 1 > 0 ? rat.side + 1 : 0);
         var moveTween = game.add.tween(rat).to({
              x: rat.positions[rat.side],
         }, ratTurnSpeed, Phaser.Easing.Linear.None, true);
         moveTween.onComplete.add(function(){
              rat.canMove = true;
         })
    }
}

Obstacle = function (game) {
    var position = game.rnd.between(0, 2);
    Phaser.Sprite.call(this, game, game.width * (position * 2 + 1) / 6, -20, "obstacle");
    game.physics.enable(this, Phaser.Physics.ARCADE);
    this.anchor.set(0.5);
};

Obstacle.prototype = Object.create(Phaser.Sprite.prototype);
Obstacle.prototype.constructor = Obstacle;

Obstacle.prototype.update = function() {
    this.body.velocity.y = obstacleSpeed;
    if(this.y > game.height){
        this.destroy();
    }
};

function switchToPigeon() {

    game.state.start("pigeon");

}




