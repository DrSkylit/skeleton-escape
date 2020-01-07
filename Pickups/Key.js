class Key extends PickupParent{
	constructor (scene) {
	    super(0,0,scene,"pickupAtlas","key.png");
	    this.picked = false;
	    this.player = null;
	}

	pickup(player,key){
		var pickupCollision = key.scene.physics.world.colliders.getActive().find(function(i){
    		return i.name == 'keyPickup'
		})
		key.picked = true;
		key.player = player;
		key.x = player.x;
		key.y = player.y;
		key.scene.physics.world.removeCollider(pickupCollision);
	}

	openDoor(key,door){
		door.layer.tilemapLayer.setAlpha(0);
        var closedDoorCollision = key.scene.physics.world.colliders.getActive().find(function(i){
    		return i.name == 'closedDoor'
		})
		key.scene.physics.world.removeCollider(closedDoorCollision);
        key.destroy();
	}

	update(time, delta){
		if(this.picked == true){
			this.body.velocity = this.player.body.velocity;
			this.x = this.player.x;
			this.y = this.player.y;
			this.angle = 0;
		}else{
        	this.angle++;
    	}
    }

    preUpdate(time, delta){
        super.preUpdate(time, delta);
        this.update(time, delta);
    }
}