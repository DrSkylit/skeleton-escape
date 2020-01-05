class Skeleton extends PlayerParent{
  	constructor (x,y,scene) {
	    super(x,y,scene,"playerAtlas","skelet_idle_anim_f0.png");
	}
    createAnimations(){
		var skelIdle = this.scene.anims.generateFrameNames('playerAtlas', {
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