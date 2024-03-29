class TinyZombie extends EnemyParent{
  	constructor (scene,group) {
	    super(0,0,scene,"enemyAtlas","tiny_zombie_idle_anim_f0.png",group);
	}
    createAnimations(){
		var idleAnim = this.scene.anims.generateFrameNames('enemyAtlas', {
	        start: 0, end: 3,
	        prefix: 'tiny_zombie_idle_anim_f', suffix: '.png'
	    });

	    var walkAnim = this.scene.anims.generateFrameNames('enemyAtlas', {
	        start: 0, end: 3,
	        prefix: 'tiny_zombie_run_anim_f', suffix: '.png'
	    });
	    console.log(walkAnim);
		this.scene.anims.create({
	        key: 'tinyZombieIdle',
	        frames: idleAnim,
	        frameRate: 8,
	        repeat: -1
	    });

	    this.scene.anims.create({
	        key: 'tinyZombieWalk',
	        frames: walkAnim,
	        frameRate: 8,
	        repeat: -1
	    });
  	}
  	playIdleAnimation(){
  		this.play('tinyZombieIdle',true);
  	}

  	playWalkingAnimation(){
  		this.play('tinyZombieWalk',true);
  	}
}