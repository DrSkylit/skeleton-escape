class PickupParent extends Phaser.Physics.Arcade.Sprite {
  	constructor (x,y,scene,textureKey,image) {
	    super(scene,x,y,textureKey,image);
	    this.scene = scene;
	    this.scene.add.existing(this);
	    this.scene.physics.add.existing(this);
        this.setDepth(0);
	    this.body.immovable=true;
	    this.body.setCollideWorldBounds(true);
  	}
  	setStartingPosition(map){
        const spawnPoint = map.findObject("spawner", obj => obj.name === "areaSpawner");
        this.x = Math.floor(Math.random() * spawnPoint.width)+spawnPoint.x;
        this.y = Math.floor(Math.random() * spawnPoint.height)+spawnPoint.y;
    }
}