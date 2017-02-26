var InfiniteScroller = InfiniteScroller || {};

InfiniteScroller.Boot = function () { };

InfiniteScroller.Boot.prototype = {
  preload: function () {

    this.load.image('preloadbar', 'assets/images/preloader-bar.png');
  },
  create: function () {

    this.game.stage.backgroundColor = '#5555ff';

    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

    this.scale.pageAlignHorizontally = true;
    this.scale.pageAlignVertically = true;

    this.scale.setScreenSize(true);

    this.game.physics.startSystem(Phaser.Physics.ARCADE);

    this.state.start('Preload');
  }
};
