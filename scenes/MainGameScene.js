class MainGameScene extends Phaser.Scene{
	constructor(){
		super('MainGame');
		var player;
	}
	preload(){
		// sets any preloaded assets 
	}

	// create assets
	create(){
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
	    const upperFloorLayer = map.createStaticLayer("floor_layer1", tileset, 0, 0);
	    const lowerWallsLayer = map.createStaticLayer("wall_layer0", tileset, 0, 0);
	    const upperWallsLayer = map.createStaticLayer("wall_layer1", tileset, 0, 0);
	    // sets depth so it appears that it is above the player
	    upperWallsLayer.setDepth(99);
	    const doorClosedLayer = map.createStaticLayer("door_closed", tileset, 0, 0);
	    const doorOpenLayer = map.createStaticLayer("door_open", tileset, 0, 0);

	    // add collision to some of the layers
	    upperWallsLayer.setCollisionByProperty({ collides: true });
      	lowerWallsLayer.setCollisionByProperty({ collides: true });
      	doorClosedLayer.setCollisionByProperty({ collides: true });

      	// add player and eneimes and pickups and sets their starting position
		this.player = new Skeleton(this);
		this.player.setStartingPosition(map);
		var key = new Key(this);
		key.setStartingPosition(map);

		// adds who collides with who 
		this.physics.add.collider(this.player, upperWallsLayer);
      	this.physics.add.collider(this.player, lowerWallsLayer);
      	var closedDoor = this.physics.add.collider(this.player, doorClosedLayer,this.player.openDoorCollision);
      	var pickup = this.physics.add.collider(this.player, key, this.player.keyPickupCollision);
      	// sets name of some collisions to be accesed later
      	pickup.setName("keyPickup");
      	closedDoor.setName("closedDoor");
	}	
	//update assets
	update(){
		// center the camera on the player
		this.cameras.main.centerOn(this.player.x,this.player.y);

	}
}