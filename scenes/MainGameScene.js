class MainGameScene extends Phaser.Scene{
	constructor(){
		super('MainGame');
		var player;
	}
	preload(){
		
	}

	// create assets
	create(){
      	this.cameras.main.setZoom(1.5);

	    const map = this.make.tilemap({ key: "mainGame" });
	    const tileset = map.addTilesetImage("skeletonEscapeTileset", "tileMapImage");

	    const lowerFloorLayer = map.createStaticLayer("floor_layer0", tileset, 0, 0);
	    const upperFloorLayer = map.createStaticLayer("floor_layer1", tileset, 0, 0);
	    const lowerWallsLayer = map.createStaticLayer("wall_layer0", tileset, 0, 0);
	    const upperWallsLayer = map.createStaticLayer("wall_layer1", tileset, 0, 0);
	    upperWallsLayer.setDepth(99);
	    const doorClosedLayer = map.createStaticLayer("door_closed", tileset, 0, 0);
	    const doorOpenLayer = map.createStaticLayer("door_open", tileset, 0, 0);

	    upperWallsLayer.setCollisionByProperty({ collides: true });
      	lowerWallsLayer.setCollisionByProperty({ collides: true });
      	doorClosedLayer.setCollisionByProperty({ collides: true });

		this.player = new Skeleton(this);
		this.player.setStartingPosition(map);

		var key = new Key(this);
		key.setStartingPosition(map);

		this.physics.add.collider(this.player, upperWallsLayer);
      	this.physics.add.collider(this.player, lowerWallsLayer);
      	var closedDoor = this.physics.add.collider(this.player, doorClosedLayer);
      	closedDoor.setName("closedDoor");
      	var pickup = this.physics.add.collider(this.player, key, key.pickup);
      	pickup.setName("keyPickup");

      	this.physics.add.collider(key,doorClosedLayer,key.openDoor);

	}
	//update assets
	update(){
		this.cameras.main.centerOn(this.player.x,this.player.y);

	}
}