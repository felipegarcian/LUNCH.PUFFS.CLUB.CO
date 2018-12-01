var loadState = 
{
	preload: function()
	{
		//MENU
		game.load.image("logo", "assets/images/logoRatPigeon.png");

		//RAT
		game.load.image("floor", "assets/images/floor.png");
        game.load.image("rat", "assets/images/mouse.png");
        game.load.image("obstacle", "assets/images/obstacle.png");

        //PIGEON
	    //load game assets
	    game.load.spritesheet('pigeon-fly', 'assets/images/pigeon-fly.png', 122, 92, 2);
	    game.load.spritesheet('playerScratch', 'assets/images/dog_scratch.png', 116, 100, 2);
	    game.load.spritesheet('playerDig', 'assets/images/dog_dig.png', 129, 100, 2);
	    game.load.image('ground', 'assets/images/ground.png');
	    game.load.image('wire', 'assets/images/wire.png');
	    game.load.image('sky', 'assets/images/sky.png');
	    game.load.audio('whine', ['assets/audio/whine.ogg', 'assets/audio/whine.mp3']);
	    game.load.audio('bark', ['assets/audio/bark.ogg', 'assets/audio/bark.mp3']);
	    
	    
	    
	    game.load.image('cat-down', 'assets/images/cat-down.png', 30,30);
	    game.load.image('cat-top', 'assets/images/cat-top.png', 30,30);

	},

	create: function()
	{
		game.state.start('menu');
	}
};