var pigeonState =
{
     create: function(){
         //set up background and ground layer
        this.game.world.setBounds(0, 0, 3500 , this.game.height);
        this.background1 = this.add.tileSprite(0,0,this.game.world.width,600,'sky');
        this.ground = this.add.tileSprite(0,this.game.height-70,this.game.world.width,70,'ground');
        this.wire = this.add.tileSprite(0,0,this.game.world.width,50,'wire');
        
        //create player and fly animation
        this.player = this.game.add.sprite(this.game.width/2, this.game.height/2, 'pigeon-fly');
        this.player.animations.add('fly');
        
        //create the Cats in the top and buttom of the screen
        this.generateCats();
        this.generateCatsDown();

        
        //put everything in the correct order (the grass will be camoflauge),
        this.game.world.bringToTop(this.background1);
        this.game.world.bringToTop(this.ground);
        this.game.world.bringToTop(this.wire);
        this.game.world.bringToTop(this.player);
        //enable physics on the player, sky and ground
        this.game.physics.arcade.enable(this.player);
        this.game.physics.arcade.enable(this.ground);
        this.game.physics.arcade.enable(this.wire);
        //player gravity
        this.player.body.gravity.y = 1000;
        
        //so player can walk on ground
        this.ground.body.immovable = true;
        this.ground.body.allowGravity = false;

        this.wire.body.immovable = true;
        this.wire.body.allowGravity = false;


        /*properties when the player scratching (diying) and standing, so we can use in update()*/
        var playerScratchImg = this.game.cache.getImage('playerScratch');
        this.player.animations.add('scratch');
        this.player.scratchDimensions = {width: playerScratchImg.width, height: playerScratchImg.height};
        
        this.player.standDimensions = {width: this.player.width, height: this.player.height};
        this.player.anchor.setTo(0.5, 1);
        this.player.alive=true; 
        this.stopped = false;
        //the camera will follow the player in the world
        this.game.camera.follow(this.player);
        
        //play the flying animation
        this.player.animations.play('fly', 10, true);

        //move player with cursor keys
        this.cursors = this.game.input.keyboard.createCursorKeys();
        
        //...or by swiping
        this.swipe = this.game.input.activePointer;

        //..or clicking :)
        this.game.input.mouse.capture = true;

        //sounds
        this.barkSound = this.game.add.audio('bark');
        this.whineSound = this.game.add.audio('whine');
        
        
        this.game.time.events.add(Phaser.Timer.SECOND * game.rnd.integerInRange(10, 15), switchTo, this);
    },
    update: function(){
    
    this.game.physics.arcade.collide(this.player, this.ground, this.playerBit, null, this);
    this.game.physics.arcade.collide(this.player, this.cats, this.playerBit, null, this);
    this.game.physics.arcade.collide(this.player, this.catsD, this.playerBit, null, this);
    this.game.physics.arcade.collide(this.player, this.wire, this.playerBit, null, this);

    //only respond to keys and keep the speed if the player is alive
    //we also don't want to do anything if the player is stopped for scratching or digging
    if(this.player.alive && !this.stopped) {
      
      this.player.body.velocity.x = game.rnd.integerInRange(140, 160);
      
      //We do a little math to determine whether the game world has wrapped around.
      //If so, we want to destroy everything and regenerate, so the game will remain random
      if(!this.wrapping && this.player.x < this.game.width) {
        //Not used yet, but may be useful to know how many times we've wrapped
        this.wraps++;
        
        //We only want to destroy and regenerate once per wrap, so we test with wrapping var
        this.wrapping = true;
        
        this.cats.destroy();
        this.catsD.destroy();
        this.generateCats();
        this.generateCatsDown();
        
        //put everything back in the proper order
        this.game.world.bringToTop(this.background1);
        this.game.world.bringToTop(this.cats);
        this.game.world.bringToTop(this.catsD);
        
        this.game.world.bringToTop(this.ground);
        
        this.game.world.bringToTop(this.wire);
        this.game.world.bringToTop(this.player);
      }
      else if(this.player.x >= this.game.width) {
        this.wrapping = false;
      }
      
      //take the appropriate action for swiping up or pressing up arrow on keyboard
      //we don't wait until the swipe is finished (this.swipe.isUp),
      //  because of latency problems (it takes too long to jump before hitting a flea)
      if (this.swipe.isDown && (this.swipe.positionDown.y > this.swipe.position.y)) {
        this.playerJump();
      }
      
      if (this.cursors.up.isDown) {
        this.playerJump();
      }
      if (this.game.input.activePointer.leftButton.isDown){

          this.playerJump();
      }
    
      //The game world is infinite in the x-direction, so we wrap around.
      //We subtract padding so the player will remain in the middle of the screen when
      //wrapping, rather than going to the end of the screen first.
      this.game.world.wrap(this.player, -(this.game.width/2), false, true, false);
    }


  },

refreshStats: function() {
    /*this.pointsText.text = this.points;
    this.fleasText.text = this.maxScratches - this.scratches;*/
  },

  playerBit: function(player, catBit) {
    //remove the flea that bit our player so it is no longer in the way
    catBit.destroy();

    
    //change sprite image
    this.player.loadTexture('playerScratch'); 
    this.player.animations.play('scratch', 10, true);
    
    //play audio
    this.whineSound.play();
    
    //wait a couple of seconds for the scratch animation to play before continuing
    this.stopped = true;
    this.player.body.velocity.x = 0;
    this.game.time.events.add(Phaser.Timer.SECOND * 2, this.playerScratch, this);
    this.game.time.events.add(1500, gameOver, this);


  },
  checkDig: function() {
    if (this.cursors.down.isDown || (this.swipe.isDown && (this.swipe.position.y > this.swipe.positionDown.y))) {
      return true;
    }
    else {
      return false;
    }
  },
  playerJump: function() {
    //when the ground is a sprite, we need to test for "touching" instead of "blocked"
   
      this.player.body.velocity.y -= this.game.rnd.integerInRange(48, 53);
    

  },
  playerScratch: function() {
    this.stopped = false;
    
    if (this.scratches >= 5) {
      //set to dead (even though our player isn't actually dead in this game, just running home)
      //doesn't affect rendering
      this.cats.destroy();
      this.catsD.destroy();
      //We switch back to the standing version of the player
      this.player.loadTexture('pigeon-fly');
      this.player.animations.play('fly', 10, true); //frame rate is faster for running
      this.player.body.setSize(this.player.standDimensions.width, this.player.standDimensions.height);
      
      //...then run home
      this.player.anchor.setTo(.5, 1);
      this.player.scale.x = -1;
      this.player.body.velocity.x = -1000;

      //we want the player to run off the screen in this case
      this.game.camera.unfollow();
      
      //go to gameover after a few miliseconds
      this.game.time.events.add(1500, this.gameOver, this);
    } else {
      //change image and update the body size for the physics engine
      this.player.loadTexture('pigeon-fly');
      this.player.animations.play('fly', 3, true);
      this.player.body.setSize(this.player.standDimensions.width, this.player.standDimensions.height);
    }
  },
  generateCats: function() {
    this.cats = this.game.add.group();
    var y ;
    y=this.game.height-150;
    //enable physics in them
    this.cats.enableBody = true;

    //phaser's random number generator
    var numCats = this.game.rnd.integerInRange(1, 5)
    var cat;

    for (var i = 0; i < numCats; i++) {
      //add sprite within an area excluding the beginning and ending
      //  of the game world so items won't suddenly appear or disappear when wrapping
      var x = this.game.rnd.integerInRange(this.game.width, this.game.world.width - this.game.width);
      cat = this.cats.create(x, y, 'cat-down');
      //physics properties
      cat.body.velocity.x = this.game.rnd.integerInRange(-20, 0);
      cat.body.immovable = true;
      cat.body.collideWorldBounds = false;
    }
  },
  generateCatsDown: function() {
    this.catsD = this.game.add.group();
    var y ;
    y=this.game.height-600;
    this.catsD.enableBody = true;
    var numCats = this.game.rnd.integerInRange(1, 5)
    var catD;
    for (var i = 0; i < numCats; i++) {
      var x = this.game.rnd.integerInRange(this.game.width, this.game.world.width - this.game.width);
      catD = this.catsD.create(x, y, 'cat-top');
      catD.body.velocity.x = this.game.rnd.integerInRange(-20, 0);
      catD.body.immovable = true;
      catD.body.collideWorldBounds = false;
    }
  },
  render: function()
    {
        //this.game.debug.text(this.game.time.fps || '--', 20, 70, "#00ff00", "40px Courier");   
    }
};

function switchTo() {
    game.state.start("rat");
};
function gameOver() {
    message = "Your time: " + (game.time.totalElapsedSeconds() - menuTime).toFixed(2) + "s";
    game.state.start("menu");
};
