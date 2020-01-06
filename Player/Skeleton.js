class Skeleton extends PlayerParent{
  	constructor (scene) {
	    super(0,0,scene,"playerAtlas","skelet_idle_anim_f0.png");
	}
    createAnimations(){
		var idle = this.scene.anims.generateFrameNames('playerAtlas', {
	        start: 0, end: 3,
	        prefix: 'skelet_idle_anim_f', suffix: '.png'
	    });

      	var walk = this.scene.anims.generateFrameNames('playerAtlas', {
           	start: 0, end: 3,
           	prefix: 'skelet_run_anim_f', suffix: '.png'
       	});

		this.scene.anims.create({
	        key: 'skeletonIdle',
	        frames: idle,
	        frameRate: 8,
	        repeat: -1
	    });

	    this.scene.anims.create({
	        key: 'skeletonWalk',
	        frames: walk,
	        frameRate: 8,
	        repeat: -1
	    });
  	}
  	playIdleAnimation(){
  		this.play('skeletonIdle',true);
  	}

  	playWalkingAnimation(){
        this.play('skeletonWalk',true);
    }
}