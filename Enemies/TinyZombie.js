class TinyZombie extends EnemyParent{
  	constructor (x,y,scene) {
	    super(x,y,scene,"enemyAtlas","tiny_zombie_idle_anim_f0.png");
	}
    createAnimations(){
		var skelIdle = this.scene.anims.generateFrameNames('enemyAtlas', {
	        start: 0, end: 3,
	        prefix: 'tiny_zombie_idle_anim_f', suffix: '.png'
	    });

		this.scene.anims.create({
	        key: 'tinyZombieIdle',
	        frames: skelIdle,
	        frameRate: 8,
	        repeat: -1
	    });
  	}
  	playIdleAnimation(){
  		this.play('tinyZombieIdle',true);
  	}
}