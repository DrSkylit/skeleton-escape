class MainMenuScene extends Phaser.Scene{
	constructor(){
		super('MainMenu');
		var cursors;
	}
	preload(){
		// tilemap
	    this.load.image("tileMapImage", "assets/tilemap/skeletonEscapeTileset.png");
	    this.load.tilemapTiledJSON("map", "assets/tilemap/skeletonEscapeMainMenu.json");
	    //atlas
	    this.load.atlas('skel', 'assets/atlas/spritesheet.png', 'assets/atlas/spritesheet.json');
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

	    const gameTitle = map.findObject("mainMenuText", obj => obj.name === "GameTitle");
	    this.add.text(gameTitle.x, gameTitle.y, gameTitle.text.text,{ fontFamily: gameTitle.text.fontfamily, fontSize: gameTitle.text.pixelsize, color:gameTitle.text.color});

		this.cursors = this.input.keyboard.createCursorKeys();

		const spawnPoint = map.findObject("spawner", obj => obj.name === "PlayerSpawn");
		var player = new Skeleton(spawnPoint.x,spawnPoint.y,this);

	}
	update(){
		if (this.cursors.space.isDown){
			this.scene.start('MainGame');
    	}

	}
}