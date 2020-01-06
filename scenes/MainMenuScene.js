class MainMenuScene extends Phaser.Scene{
	constructor(){
		super('MainMenu');
		var cursors;
		var enemiesGroup;
	}
	preload(){
		// tilemap
	    this.load.image("tileMapImage", "assets/tilemap/skeletonEscapeTileset.png");
	    this.load.tilemapTiledJSON("map", "assets/tilemap/skeletonEscapeMainMenu.json");
	    //atlas
	    this.load.atlas('playerAtlas', 'assets/atlas/player/playersSheet.png', 'assets/atlas/player/playersSheet.json');
	    this.load.atlas('enemyAtlas', 'assets/atlas/enemies/enemySheet.png', 'assets/atlas/enemies/enemySheet.json');
	}
	create(){
		const map = this.make.tilemap({ key: "map" });
	    const tileset = map.addTilesetImage("skeletonEscapeTileset", "tileMapImage");

	    const lowerFloorLayer = map.createStaticLayer("floor_layer0", tileset, 0, 0);
	    const upperFloorLayer = map.createStaticLayer("floor_layer1", tileset, 0, 0);
	    const lowerWallsLayer = map.createStaticLayer("wall_layer0", tileset, 0, 0);
	    const upperWallsLayer = map.createStaticLayer("wall_layer1", tileset, 0, 0);
	    const doorClosedLayer = map.createStaticLayer("door_open", tileset, 0, 0);
	    const doorOpenLayer = map.createStaticLayer("door_closed", tileset, 0, 0);

	    upperWallsLayer.setCollisionByProperty({ collides: true });
      	lowerWallsLayer.setCollisionByProperty({ collides: true });

	    const gameTitle = map.findObject("mainMenuText", obj => obj.name === "GameTitle");
	    this.add.text(gameTitle.x, gameTitle.y, gameTitle.text.text,{ fontFamily: gameTitle.text.fontfamily, fontSize: gameTitle.text.pixelsize, color:gameTitle.text.color});

		this.cursors = this.input.keyboard.createCursorKeys();

		var player = new Skeleton(this);
		player.setStartingPosition(map);
		for (var i = 0; i < 10; i++) {
			var tinyZombie = new TinyZombie(this);
			tinyZombie.setStartingPosition(map);
			this.physics.add.collider(tinyZombie, upperWallsLayer);
      		this.physics.add.collider(tinyZombie, lowerWallsLayer);
		}
	}
	update(){
		if (this.cursors.space.isDown){
			this.scene.start('MainGame');
    	}

	}
}