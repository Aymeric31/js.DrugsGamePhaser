var InfiniteScroller = InfiniteScroller || {};
var ville;

InfiniteScroller.Game = function () { };
var lsd = false;
var kit = false;
var girl = true
var createFlag = false;
var test = true;

InfiniteScroller.Game.prototype = {
  preload: function () {
    this.game.time.advancedTiming = true;
  },
  create: function () {

    ville = InfiniteScroller.game.add.tileSprite(0, 0, 3495, 500, 'background');
    var lsdimage = this.game.cache.getImage('lsdback');

    this.game.world.setBounds(0, 0, 3500, this.game.height);
    this.ground = this.add.tileSprite(0, this.game.height - 70, this.game.world.width, 70, 'ground');
    if (girl) {
      this.player = this.game.add.sprite(this.game.width / 2, this.game.height - 90, 'girl');
    }

    this.player.animations.add('walk');

    this.generateDrugs();
    this.generateChests();

    this.game.world.bringToTop(this.ground);
    this.game.world.bringToTop(this.chests);

    this.game.physics.arcade.enable(this.player);
    this.game.physics.arcade.enable(this.ground);

    this.player.body.gravity.y = 1000;

    this.ground.body.immovable = true;
    this.ground.body.allowGravity = false;

    var playerDigImg = this.game.cache.getImage('playerDig');
    this.player.animations.add('dig');
    this.player.digDimensions = { width: playerDigImg.width, height: playerDigImg.height };

    var playerScratchImg = this.game.cache.getImage('playerScratch');
    this.player.animations.add('scratch');
    this.player.scratchDimensions = { width: playerScratchImg.width, height: playerScratchImg.height };

    this.player.standDimensions = { width: this.player.width, height: this.player.height };
    this.player.anchor.setTo(2, 1);

    this.game.camera.follow(this.player);

    this.player.animations.play('walk', 3, true);

    this.cursors = this.game.input.keyboard.createCursorKeys();

    this.swipe = this.game.input.activePointer;

    this.gameSound = this.game.add.audio('music');
    this.gameSound.loop = true;
    this.gameSound.play();

    this.hit = 0;
    this.wraps = 0;
    this.points = 0;
    this.heartpts;
    this.wrapping = true;
    this.stopped = false;
    this.currentLife = 5

    var heart = this.game.add.sprite(0, this.game.height - 130, 'heart');
    var kit = this.game.add.sprite(0, this.game.height - 130, 'kit');
    var lsdpill = this.game.add.sprite(-100, this.game.height - 130, 'lsdpill')
    heart.visible = false;
    kit.visible = false;
    heart.visible = false;
    kit.visible = false;
    this.items = [heart, kit, lsdpill];

    var style1 = { font: "20px Arial" };
    var t1 = this.game.add.text(10, 20, "Points:", style1);
    var t2 = this.game.add.text(this.game.width - 180, 20, "Vie restante:", style1);
    var t3 = this.game.add.text(this.game.width - 520, 20, "Étapes passées:", style1)
    t1.fixedToCamera = true;
    t2.fixedToCamera = true;
    t3.fixedToCamera = true;

    var style2 = { font: "26px Arial" };
    this.pointsText = this.game.add.text(80, 18);
    this.drugsText = this.game.add.text(this.game.width - 50, 18);
    this.wrapsText = this.game.add.text(this.game.width - 350, 18);

    this.pointsText.fixedToCamera = true;
    this.drugsText.fixedToCamera = true;
    this.wrapsText.fixedToCamera = true;

    this.refreshStats();

    lsdbackground = this.add.sprite(0, 0, "lsdback");
    lsdbackground.alpha = 0.6
    lsdbackground.scale.setTo(0.8)
    lsdbackground.anchor.setTo(0.5)
    lsdbackground.fixedToCamera = true
    lsdbackground.kill()
  },

  update: function () {
    this.game.physics.arcade.collide(this.player, this.ground, this.playerHit, null, this);
    this.game.physics.arcade.collide(this.player, this.drugs, this.playerBit, null, this);
    this.game.physics.arcade.overlap(this.player, this.chests, this.collect, this.checkDig, this);
    this.game.physics.arcade.overlap(this.player, this.flag, this.gameOver, null, this);
    ville.tilePosition.x -= 0;
    this.wrapsText.text = this.wraps;

    if (this.wraps == 5 && test == true) {
      createFlag = true
    }

    if (createFlag) {
      this.generateFlag()
    }

    if (lsd) {
      lsdbackground.revive();
    }
    if (kit) {
      lsdbackground.kill()
    }

    if (this.player.alive && !this.stopped) {

      this.player.body.velocity.x = 300;

      if (!this.wrapping && this.player.x < this.game.width) {
        this.wraps++;
        this.wrapping = true;
        this.drugs.destroy();
        this.generateDrugs();
        this.chests.destroy();
        this.generateChests();

        this.game.world.bringToTop(this.chests);
        this.game.world.bringToTop(this.ground);
      }
      else if (this.player.x >= this.game.width) {
        this.wrapping = false;
      }
      if (this.cursors.up.isDown) {
        this.playerJump();
      }

      this.game.world.wrap(this.player, -(this.game.width / 2), false, true, false);
    }

  },
  refreshStats: function () {
    this.pointsText.text = this.points;
    this.drugsText.text = this.currentLife

    if (this.heartpts == 1 && this.drugsText.text == this.currentLife) {
      this.drugsText.text = this.drugsText.text - this.hit + this.heartpts;
    }
    if (this.heartpts < 1) {
      this.drugsText.text = this.drugsText.text - this.hit;
    }
    this.heartpts = 0;

  },
  playerHit: function (player, blockedLayer) {
    if (player.body.touching.right) {
    }
  },
  playerBit: function (player, flea) {
    flea.destroy();

    this.hit++;
    this.refreshStats();

    this.player.loadTexture('playerScratch');
    this.player.animations.play('scratch', 10, true);

    this.stopped = true;
    this.player.body.velocity.x = 0;
    this.game.time.events.add(Phaser.Timer.SECOND * 2, this.playerScratch, this);
  },

  collect: function (player, chest) {

    if (!this.stopped) {

      this.player.loadTexture('playerDig');
      this.player.animations.play('dig', 10, true);
      this.player.body.setSize(this.player.digDimensions.width, this.player.digDimensions.height);

      this.currentChest = chest;

      this.stopped = true;
      this.player.body.velocity.x = 0;
      this.game.time.events.add(Phaser.Timer.SECOND * 2, this.playerDig, this);
    }
  },
  gameOver: function () {
    lsd = false;
    kit = true;
    this.gameSound.stop();

    this.game.state.start('GameStart');
  },
  checkDig: function () {
    if (this.cursors.down.isDown || (this.swipe.isDown && (this.swipe.position.y > this.swipe.positionDown.y))) {
      return true;
    }
    else {
      return false;
    }
  },
  playerJump: function () {
    var onTheGround = this.player.body.touching.down;
    if (onTheGround) {
      this.jumps = 2;
      this.jumping = false;
    }
    if (this.jumps > 0) {
      this.player.body.velocity.y -= 300;
      this.jumping = true;
    }
    if (this.jumping) {
      this.jumps--;
      this.jumping = false;
    }
  },
  playerDig: function () {
    var x = this.currentChest.x;
    this.currentChest.destroy();
    this.currentToy = this.items[Math.floor(Math.random() * this.items.length)];

    if (this.currentToy.key == "heart") {
      this.currentLife++;
    }
    if (this.currentToy.key == "lsdpill") {
      lsd = true;
      kit = false;
    }
    if (this.currentToy.key == "kit") {
      kit = true;
      lsd = false;
    }

    this.currentToy.visible = true;
    this.currentToy.x = x;
    this.points += 5;
    this.refreshStats();
    this.game.time.events.add(Phaser.Timer.SECOND, this.currentToyInvisible, this);

    this.player.loadTexture('girl');
    this.player.animations.play('walk', 3, true);
    this.player.body.setSize(this.player.standDimensions.width, this.player.standDimensions.height);
    this.stopped = false;
  },
  currentToyInvisible: function () {
    this.currentToy.visible = false;
  },
  playerScratch: function () {
    this.stopped = false;

    if (this.drugsText.text <= "0") {
      this.player.alive = false;
      this.drugs.destroy();
      this.chests.destroy();
      this.player.loadTexture('girl');

      this.player.animations.play('walk', 10, true);
      this.player.body.setSize(this.player.standDimensions.width, this.player.standDimensions.height);
      this.player.anchor.setTo(.5, 1);
      this.player.scale.x = -1;
      this.player.body.velocity.x = -1000;

      this.game.camera.unfollow();

      this.game.time.events.add(1500, this.gameOver, this);
    } else {
      this.player.loadTexture('girl');
      this.player.animations.play('walk', 6, true);
      this.player.body.setSize(this.player.standDimensions.width, this.player.standDimensions.height);
    }
  },
  generateChests: function () {
    this.chests = this.game.add.group();
    this.chests.enableBody = true;
    var numChests = this.game.rnd.integerInRange(0, 5)
    var chest;

    for (var i = 0; i < numChests; i++) {
      var x = this.game.rnd.integerInRange(this.game.width, this.game.world.width - this.game.width);
      chest = this.chests.create(x, this.game.height - 108, 'chest');
      chest.body.velocity.x = 0;
    }

  },
  generateFlag: function () {
    this.flag = this.game.add.group();
    this.flag.enableBody = true
    var flag;

    var x = this.game.rnd.integerInRange(this.game.width, this.game.world.width - this.game.width);
    flag = this.flag.create(x, this.game.height - 108, 'flag');
    flag.body.velocity.x = 0;

    createFlag = false;
    test = false
  },
  generateDrugs: function () {
    this.drugs = this.game.add.group();
    this.drugs.enableBody = true;
    var numDrugs = this.game.rnd.integerInRange(1, 6)
    var tab = ['pills', 'boobs', 'seringue', 'wine', "canabi", "console"]

    for (var i = 0; i < numDrugs; i++) {
      var baddie = Math.floor(Math.random() * 6)
      var x = this.game.rnd.integerInRange(this.game.width, this.game.world.width - this.game.width);
      flea = this.drugs.create(x, this.game.height - 115, tab[baddie]);

      flea.body.velocity.x = this.game.rnd.integerInRange(-20, 0);

      flea.body.immovable = true;
      flea.body.collideWorldBounds = false;
    }
  },
  render: function () {
  }

};