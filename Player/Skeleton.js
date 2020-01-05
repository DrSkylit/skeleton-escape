class Skeleton extends PlayerParent{
  	constructor (x,y,scene) {
	    super(x,y,scene,"skel","skelet_idle_anim_f0.png");
	}
    addAnimations(){
		var skelIdle = this.scene.anims.generateFrameNames('skel', {
	        start: 0, end: 3,
	        prefix: 'skelet_idle_anim_f', suffix: '.png'
	    });

		this.scene.anims.create({
	        key: 'skeletonIdle',
	        frames: skelIdle,
	        frameRate: 8,
	        repeat: -1
	    });
  	}
  	playIdleAnimation(){
  		this.play('skeletonIdle',true);
  	}
}