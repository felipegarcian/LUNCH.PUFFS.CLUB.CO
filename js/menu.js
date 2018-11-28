var menuState = 
{
	create: function()
	{
		/*var nameLabel = game.add.text
			(80,80, 'RataPaloma :D',
			{font: '50px Arial',
			fill: '#ffffff'}
			);*/

		var startLabel = game.add.text
			(game.world.centerX - 125, game.world.height - 80,
			'Press space bar to start',
			{font: '25px Arial',
			fill: '#ffffff'}
			);

		var logo = game.add.sprite(game.world.centerX, game.world.centerY - 100, "logo");
		logo.anchor.setTo(0.5);

		var spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

		spaceKey.onDown.addOnce(this.start, this);

	},

	start: function()
	{
		game.state.start('pigeon');
	},

};