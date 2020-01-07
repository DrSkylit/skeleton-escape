class MainMenuScene extends Phaser.Scene{
	constructor(){
		super('MainMenu');
		var cursors;
	}
	preload(){
		// load all tilemaps
	    this.load.image("tileMapImage", "assets/tilemap/skeletonEscapeTileset.png");
	    this.load.tilemapTiledJSON("mainMenu", "assets/tilemap/skeletonEscapeMainMenu.json");
	    this.load.tilemapTiledJSON("mainGame", "assets/tilemap/skeletonEscapeMap.json");
	    //load all atlas
	    this.load.atlas('playerAtlas', 'assets/atlas/player/playersSheet.png', 'assets/atlas/player/playersSheet.json');
	    this.load.atlas('enemyAtlas', 'assets/atlas/enemies/enemySheet.png', 'assets/atlas/enemies/enemySheet.json');
	    this.load.atlas('pickupAtlas', 'assets/atlas/pickups/pickupSheet.png', 'assets/atlas/pickups/pickupSheet.json');
	}
	create(){
		// grabs tilemap and tileset image
		const map = this.make.tilemap({ key: "mainMenu" });
	    const tileset = map.addTilesetImage("skeletonEscapeTileset", "tileMapImage");

	    // create static layers from tileMap
	    const lowerFloorLayer = map.createStaticLayer("floor_layer0", tileset, 0, 0);
	    const upperFloorLayer = map.createStaticLayer("floor_layer1", tileset, 0, 0);
	    const lowerWallsLayer = map.createStaticLayer("wall_layer0", tileset, 0, 0);
	    const upperWallsLayer = map.createStaticLayer("wall_layer1", tileset, 0, 0);
	    const doorClosedLayer = map.createStaticLayer("door_open", tileset, 0, 0);
	    const doorOpenLayer = map.createStaticLayer("door_closed", tileset, 0, 0);

	    // add collision to some of the layers
	    upperWallsLayer.setCollisionByProperty({ collides: true });
      	lowerWallsLayer.setCollisionByProperty({ collides: true });
      	doorClosedLayer.setCollisionByProperty({ collides: true });

      	// grabs text from tilemap object called GameTitle and adds it canvas
	    const gameTitle = map.findObject("mainMenuText", obj => obj.name === "GameTitle");
	    this.add.text(gameTitle.x, gameTitle.y, gameTitle.text.text,{ fontFamily: gameTitle.text.fontfamily, fontSize: gameTitle.text.pixelsize, color:gameTitle.text.color});

	    // sets cursor keys for use later 
		this.cursors = this.input.keyboard.createCursorKeys();

		// add player and eneimes and pickups and sets their starting position
		var player = new Skeleton(this);
		player.setStartingPosition(map);
		var key = new Key(this);
		key.setStartingPosition(map);
		// creates a physics group so all enemies are treated the exact same when it comes to collisions
		var enemiesGroup = this.physics.add.group();
		for (var i = 0; i < 10; i++) {
			var tinyZombie = new TinyZombie(this,enemiesGroup);
			tinyZombie.setStartingPosition(map);
		}
		// adds who collides with who 
		this.physics.add.collider(enemiesGroup, upperWallsLayer);
      	this.physics.add.collider(enemiesGroup, lowerWallsLayer);
      	this.physics.add.collider(enemiesGroup, doorClosedLayer);
      	this.physics.add.collider(enemiesGroup, enemiesGroup);
	}
	update(){
		// if space is pressed change scene to start game
		if (this.cursors.space.isDown){
			this.scene.start('MainGame');
    	}

	}
}