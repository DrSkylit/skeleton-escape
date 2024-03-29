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
	    const lowerFloorLayer = map.createLayer("floor_layer0", tileset, 0, 0);
	    map.createLayer("animated_floor_layer", tileset, 0, 0);
	    const upperFloorLayer = map.createLayer("floor_layer1", tileset, 0, 0);
	    const lowerWallsLayer = map.createLayer("wall_layer0", tileset, 0, 0);
	    map.createLayer("animated_wall_layer", tileset, 0, 0);
	    const upperWallsLayer = map.createLayer("wall_layer1", tileset, 0, 0);
	    // sets depth so it appears that it is above the player
	    upperWallsLayer.setDepth(99);
	    const doorClosedLayer = map.createLayer("door_closed", tileset, 0, 0);
	    const doorOpenLayer = map.createLayer("door_open", tileset, 0, 0);

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
		this.enemiesGroup = this.physics.add.group();
		this.bigZombieGroup = this.physics.add.group();
		this.elfGroup = this.physics.add.group();
		// create enemy factory that creates all enemies
		var enemyFactory = new EnemyFactory(this,map);
		for (var property in levels[level]) {
		  	if (levels[level].hasOwnProperty(property)) {
		  		for (var i = 0; i < levels[level][property]; i++) {
		  			enemyFactory.createEnemy(property);
		  		}
		  	}
		}

		// adds who collides with who 
		this.physics.add.collider(this.player, upperWallsLayer);
      	this.physics.add.collider(this.player, lowerWallsLayer);
		this.physics.add.collider(this.player, this.enemiesGroup,enemyCollision);
		this.physics.add.collider(this.player, this.elfGroup,enemyCollision);
		this.physics.add.collider(this.player, this.bigZombieGroup,enemyCollision);
      	var closedDoor = this.physics.add.collider(this.player, doorClosedLayer,openDoorCollision);
      	var pickup = this.physics.add.collider(this.player, key, keyPickupCollision);
      	// sets name of some collisions to be accesed later
      	pickup.setName("keyPickup");
      	closedDoor.setName("closedDoor");

      	this.addCollisionWithWalls(this.enemiesGroup,upperWallsLayer,lowerWallsLayer);
      	this.addCollisionWithDoors(this.enemiesGroup, doorClosedLayer,doorOpenLayer);
      	this.physics.add.collider(this.enemiesGroup, this.enemiesGroup);

      	this.addCollisionWithWalls(this.bigZombieGroup,upperWallsLayer,lowerWallsLayer);
      	this.addCollisionWithDoors(this.bigZombieGroup, doorClosedLayer,doorOpenLayer);
      	this.physics.add.collider(this.bigZombieGroup, this.bigZombieGroup);

      	this.addCollisionWithWalls(this.elfGroup,upperWallsLayer,lowerWallsLayer);
      	this.addCollisionWithDoors(this.elfGroup, doorClosedLayer,doorOpenLayer);
      	this.physics.add.collider(this.elfGroup, this.elfGroup);

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