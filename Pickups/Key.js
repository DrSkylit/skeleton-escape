class Key extends PickupParent{
	constructor (scene,group) {
	    super(0,0,scene,"pickupAtlas","key.png");
	    this.setDepth(0);
	}

	update(time, delta){
        this.angle++;
    }

    preUpdate(time, delta){
        super.preUpdate(time, delta);
        this.update(time, delta);
    }
}