class Key extends PickupParent{
	constructor (scene) {
	    super(0,0,scene,"pickupAtlas","key.png");
	    this.scene = scene;
	    this.picked = false;
	    this.player = null;
	}

	pickup(player,key){
		var pickupCollision = key.scene.physics.world.colliders.getActive().find(function(i){
    		return i.name == 'keyPickup'
		})
		key.picked = true;
		key.player = player;
		key.scene.physics.world.removeCollider(pickupCollision);
	}

	update(time, delta){
		if(this.picked == true){
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