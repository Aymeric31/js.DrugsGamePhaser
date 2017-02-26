var InfiniteScroller = InfiniteScroller || {};

InfiniteScroller.Preload = function () { };

InfiniteScroller.Preload.prototype = {
    preload: function () {
        this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'preloadbar');
        this.preloadBar.anchor.setTo(0.5);
        this.preloadBar.scale.setTo(3);

        this.load.setPreloadSprite(this.preloadBar);

        this.load.spritesheet('lsdback', 'assets/images/lsdBackground2.jpg')
        this.load.spritesheet('girl', 'assets/images/girl.png', 82, 80, 6);
        this.load.spritesheet('playerScratch', 'assets/images/pls3.png', 53, 61, 2);
        this.load.spritesheet('playerDig', 'assets/images/open.png', 72, 80, 2);


        this.load.image('ground', 'assets/images/ground.png');
        this.load.image('background', 'assets/images/bckg2.png');


        this.load.audio('music', 'assets/audio/music_snoop.mp3');

        this.load.image('chest', 'assets/images/chest2.png');

        this.load.image('flag', 'assets/images/endGame.png');

        this.load.image('pills', 'assets/images/pill2.png');
        this.load.image('boobs', 'assets/images/boob.png');
        this.load.image('seringue', 'assets/images/seringue.png');
        this.load.image('wine', 'assets/images/wine.png');
        this.load.image('console', 'assets/images/console.png');
        this.load.image('canabi', 'assets/images/canabi.png');

        this.load.image('heart', 'assets/images/toys/heart.png');

        this.load.image('kit', 'assets/images/toys/medikit.jpg');
        this.load.image('lsdpill', 'assets/images/toys/lsdface.png');

        this.load.image('img', 'assets/images/start_sans_mckay.png');
        this.load.image('button', 'assets/images/mckay.png');

    },
    create: function () {
        this.state.start('GameStart');
    }
};