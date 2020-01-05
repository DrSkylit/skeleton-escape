
class MainGameScene extends Phaser.Scene{
	constructor(){
		super('MainGame');
	}
	preload(){

	}

	// create assets
	create(){
	    const map = this.make.tilemap({ key: "map" });
	    const tileset = map.addTilesetImage("skeletonEscapeTileset", "tileMapImage");

	    const lowerFloorLayer = map.createStaticLayer("floor_layer0", tileset, 0, 0);
	    const upperFloorLayer = map.createStaticLayer("floor_layer1", tileset, 0, 0);
	    const lowerWallsLayer = map.createStaticLayer("wall_layer0", tileset, 0, 0);
	    const upperWallsLayer = map.createStaticLayer("wall_layer1", tileset, 0, 0);
	    const doorClosedLayer = map.createStaticLayer("door_open", tileset, 0, 0);
	    const doorOpenLayer = map.createStaticLayer("door_closed", tileset, 0, 0);


	    const spawnPoint = map.findObject("spawner", obj => obj.name === "PlayerSpawn");
		var player = new Skeleton(spawnPoint.x,spawnPoint.y,this);


	}
	//update assets
	update(){


	}
}