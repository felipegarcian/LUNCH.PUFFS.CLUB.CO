var game = new Phaser.Game(600, 600, Phaser.AUTO, "");
var message = "";
var menuTime = 0;
var ratTime = 0;

game.state.add('boot', bootState);
game.state.add('load', loadState);
game.state.add('menu', menuState);
game.state.add('rat', ratState);
game.state.add('pigeon', pigeonState);

game.state.start('boot');
