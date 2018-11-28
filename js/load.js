var loadState = 
{
	preload: function()
	{
		//MENU
		game.load.image("logo", "assets/images/logo.png");

		//RAT
		game.load.image("floor", "assets/images/floor.png");
        game.load.image("rat", "assets/images/mouse.png");
        game.load.image("obstacle", "assets/images/obstacle.png");

        //PIGEON

	    //load game assets
	    game.load.spritesheet('dog', 'assets/images/dog_walk.png', 122, 92, 2);
	    game.load.spritesheet('playerScratch', 'assets/images/dog_scratch.png', 116, 100, 2);
	    game.load.spritesheet('playerDig', 'assets/images/dog_dig.png', 129, 100, 2);
	    game.load.image('ground', 'assets/images/ground.png');
	    game.load.image('grass', 'assets/images/grass.png');
	    game.load.audio('whine', ['assets/audio/whine.ogg', 'assets/audio/whine.mp3']);
	    game.load.audio('bark', ['assets/audio/bark.ogg', 'assets/audio/bark.mp3']);
	    
	    //from http://www.gamedevacademy.org/html5-phaser-tutorial-spacehipster-a-space-exploration-game/
	    game.load.image('mound', 'assets/images/rock.png');
	    
	    //Adapted from https://openclipart.org/detail/6570/flea:
	    game.load.image('flea', 'assets/images/flea.png');
	    
	    //https://openclipart.org/detail/188266/bone:
	    game.load.image('bone', 'assets/images/toys/bone.png');
	    
	    //https://openclipart.org/detail/139615/tennis-ball:
	    game.load.image('ball', 'assets/images/toys/tennisball.png');

	},

	create: function()
	{
		game.state.start('menu');
	}
};