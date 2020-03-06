class MainGameScene extends Phaser.Scene{
	constructor(){
		super('MainGame');
		var player;
	}
	preload(){
		// sets any preloaded assets 
		this.load.scenePlugin('AnimatedTiles', 'plugins/phaser-animated-tiles/dist/AnimatedTiles.js', 'animatedTiles', 'animatedTiles');
	}

	// create assets
	create(data){
		// get Level
		var level = data["level"];
		this.events.emit('set_level_hud',level);
		// hides mouse cursor when on the canvas 
		let canvas = this.sys.canvas;
		canvas.style.cursor = 'none';
		//  sets main camera to have a zoom
      	this.cameras.main.setZoom(1.5);

      	// grabs tilemap and tileset image
	    const map = this.make.tilemap({ key: "mainGame" });
	    const tileset = map.addTilesetImage("skeletonEscapeTileset", "tileMapImage");

	    // create static layers from tileMap
	    const lowerFloorLayer = map.createStaticLayer("floor_layer0", tileset, 0, 0);
	    map.createDynamicLayer("animated_floor_layer", tileset, 0, 0);
	    const upperFloorLayer = map.createStaticLayer("floor_layer1", tileset, 0, 0);
	    const lowerWallsLayer = map.createStaticLayer("wall_layer0", tileset, 0, 0);
	    map.createDynamicLayer("animated_wall_layer", tileset, 0, 0);
	    const upperWallsLayer = map.createStaticLayer("wall_layer1", tileset, 0, 0);
	    // sets depth so it appears that it is above the player
	    upperWallsLayer.setDepth(99);
	    const doorClosedLayer = map.createStaticLayer("door_closed", tileset, 0, 0);
	    const doorOpenLayer = map.createStaticLayer("door_open", tileset, 0, 0);

	    // add collision to some of the layers
	    upperWallsLayer.setCollisionByProperty({ collides: true });
      	lowerWallsLayer.setCollisionByProperty({ collides: true });
      	doorClosedLayer.setCollisionByProperty({ collides: true });
      	doorOpenLayer.setCollisionByProperty({ collides: true });

      	// add player and eneimes and pickups and sets their starting position
		this.player = new Skeleton(this);
		if(data["playerLife"]){
			this.player.setLife(data["playerLife"]);
		}
		this.player.setStartingPosition(map);
		this.player.setPlayerHudElements();
		var key = new Key(this);
		key.setStartingPosition(map);
		var enemiesGroup = this.physics.add.group();
		var elfGroup = this.physics.add.group();

		for (var property in levels[level]) {
		  	if (levels[level].hasOwnProperty(property)) {
		  		if (property == "tinyZombie") {
					for (var i = 0; i < levels[level][property]; i++) {
						var tinyZombie = new TinyZombie(this,enemiesGroup);
						tinyZombie.setStartingPosition(map);
					}
		  		}
		  		if (property == "elf") {
					for (var i = 0; i < levels[level][property]; i++) {
						var elf = new Elf(this,elfGroup);
						elf.setStartingPosition(map);
						elf.setAreaEffect(this.player);
					}
		  		}
		  	}
		}

		// adds who collides with who 
		this.physics.add.collider(this.player, upperWallsLayer);
      	this.physics.add.collider(this.player, lowerWallsLayer);
		this.physics.add.collider(this.player, enemiesGroup,enemyCollision);
		this.physics.add.collider(this.player, elfGroup,enemyCollision);
      	var closedDoor = this.physics.add.collider(this.player, doorClosedLayer,openDoorCollision);
      	var pickup = this.physics.add.collider(this.player, key, keyPickupCollision);
      	// sets name of some collisions to be accesed later
      	pickup.setName("keyPickup");
      	closedDoor.setName("closedDoor");

      	this.addCollisionWithWalls(enemiesGroup,upperWallsLayer,lowerWallsLayer);
      	this.addCollisionWithDoors(enemiesGroup, doorClosedLayer,doorOpenLayer);
      	this.physics.add.collider(enemiesGroup, enemiesGroup);

      	this.addCollisionWithWalls(elfGroup,upperWallsLayer,lowerWallsLayer);
      	this.addCollisionWithDoors(elfGroup, doorClosedLayer,doorOpenLayer);
      	this.physics.add.collider(elfGroup, elfGroup);

      	// start animated tile movment
      	this.sys.animatedTiles.init(map);
	}	
	//update assets
	update(){
		// center the camera on the player
		this.cameras.main.centerOn(this.player.x,this.player.y);
	}

	addCollisionWithWalls(group,upperWall,lowerWall){
		this.physics.add.collider(group, upperWall);
      	this.physics.add.collider(group, lowerWall);
	}
	addCollisionWithDoors(group,closedDoor,openDoor){
		this.physics.add.collider(group, closedDoor);
      	this.physics.add.collider(group, openDoor);
	}
}