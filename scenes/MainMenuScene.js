class MainMenuScene extends Phaser.Scene{
	constructor(){
		super('MainMenu');
		var cursors;
	}
	preload(){
		this.load.scenePlugin('AnimatedTiles', 'plugins/phaser-animated-tiles/dist/AnimatedTiles.js', 'animatedTiles', 'animatedTiles');
	}
	create(){

		// hides mouse cursor when on the canvas 
		let canvas = this.sys.canvas;
		canvas.style.cursor = 'none';
		// grabs tilemap and tileset image
		const map = this.make.tilemap({ key: "mainMenu" });
	    const tileset = map.addTilesetImage("skeletonEscapeTileset", "tileMapImage");

	    // create static layers from tileMap
	    const lowerFloorLayer = map.createStaticLayer("floor_layer0", tileset, 0, 0);
	   	map.createDynamicLayer("animated_floor_layer", tileset, 0, 0);
	    const upperFloorLayer = map.createStaticLayer("floor_layer1", tileset, 0, 0);
	    const lowerWallsLayer = map.createStaticLayer("wall_layer0", tileset, 0, 0);
	    map.createDynamicLayer("animated_wall_layer", tileset, 0, 0);
	    const upperWallsLayer = map.createStaticLayer("wall_layer1", tileset, 0, 0);
	    const doorClosedLayer = map.createStaticLayer("door_open", tileset, 0, 0);
	    const doorOpenLayer = map.createStaticLayer("door_closed", tileset, 0, 0);

	    // add collision to some of the layers
	    upperWallsLayer.setCollisionByProperty({ collides: true });
      	lowerWallsLayer.setCollisionByProperty({ collides: true });
      	doorClosedLayer.setCollisionByProperty({ collides: true });

      	// grabs text from tilemap object called GameTitle and adds it canvas
	    const gameTitle = map.findObject("mainMenuText", obj => obj.name === "GameTitle");
	    this.add.text(gameTitle.x, gameTitle.y, gameTitle.text.text,{ fontFamily: gameTitle.text.fontfamily, fontSize: gameTitle.text.pixelsize, color:gameTitle.text.color,align:'center',fixedWidth:gameTitle.width,fixedheight:gameTitle.height});
	    const startBtn = map.findObject("mainMenuItems", obj => obj.name === "startBtn");
	    this.add.text(startBtn.x, startBtn.y, startBtn.text.text,{ fontFamily: startBtn.text.fontfamily, fontSize: startBtn.text.pixelsize, color:startBtn.text.color,align:'center',fixedWidth:startBtn.width});
	    const howToBtn = map.findObject("mainMenuItems", obj => obj.name === "howToBtn");
	    var blah = this.add.text(howToBtn.x, howToBtn.y, howToBtn.text.text,{ fontFamily: howToBtn.text.fontfamily, fontSize: howToBtn.text.pixelsize, color:howToBtn.text.color,align:'center',fixedWidth:howToBtn.width});
	    const settingsBtn = map.findObject("mainMenuItems", obj => obj.name === "settingsBtn");
	    this.add.text(settingsBtn.x, settingsBtn.y, settingsBtn.text.text,{ fontFamily: settingsBtn.text.fontfamily, fontSize: settingsBtn.text.pixelsize, color:settingsBtn.text.color,align:'center',fixedWidth:settingsBtn.width});

	    // sets cursor keys for use later 
		this.cursors = this.input.keyboard.createCursorKeys();

		// add player and eneimes and pickups and sets their starting position
		var player = new Skeleton(this);
		player.setStartingPosition(map);
		var key = new Key(this);
		key.setStartingPosition(map);
		// creates a physics group so all enemies are treated the exact same when it comes to collisions
		this.enemiesGroup = this.physics.add.group();
		var enemyFactory = new EnemyFactory(this,map);
		for (var i = 0; i < 10; i++) {
			enemyFactory.createEnemy('tinyZombie');
		}
		// adds who collides with who 
		this.physics.add.collider(this.enemiesGroup, upperWallsLayer);
      	this.physics.add.collider(this.enemiesGroup, lowerWallsLayer);
      	this.physics.add.collider(this.enemiesGroup, doorClosedLayer);
      	this.physics.add.collider(this.enemiesGroup, this.enemiesGroup);

      	//start animated tile movment
      	this.sys.animatedTiles.init(map);
	}
	update(){
		// if space is pressed change scene to start game
		if (this.cursors.space.isDown){
			this.sound.play("selectSound");
			// launch the hud scene
			this.scene.launch('hud');
			this.scene.start('MainGame',{level:"level_1",playerLife:6});
    	}
	}
}