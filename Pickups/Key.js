class Key extends PickupParent{
	constructor (scene) {
	    super(0,0,scene,"pickupAtlas","key.png");
	    this.picked = false;
	}

	update(time, delta){
		if(this.picked == true){
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