var firstTime; 
var menuState = 
{
	create: function()
	{
		this.game.world.setBounds(0, 0, this.game.width , this.game.height);
		/*var nameLabel = game.add.text
			(80,80, 'RataPaloma :D',
			{font: '50px Arial',
			fill: '#ffffff'}
			);*/

		var messageLabel = game.add.text
			(game.world.centerX - 125, game.world.height - 160,
			message,
			{font: '25px VT323',
			fill: '#ffffff'}
			);

		var startLabel = game.add.text
			(game.world.centerX - 125, game.world.height - 80,
			'Press space bar to start',
			{font: '25px VT323',
			fill: '#ffffff'}
			);

		var logo = game.add.sprite(game.world.centerX, game.world.centerY - 100, "logo");
		logo.anchor.setTo(0.5);

		var spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

		spaceKey.onDown.addOnce(this.start, this);


	},
    update: function(){
        if (firstTime!=null){
        	var logo = game.add.sprite(game.world.centerX, game.world.centerY - 100, "logo");
			logo.anchor.setTo(0.5);
			} else {firstTime = false;}
	},

	start: function()
	{
		ratTime = 0;
		menuTime = game.time.totalElapsedSeconds();
		game.state.start('pigeon');
	},

};