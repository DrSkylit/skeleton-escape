class BigZombie extends EnemyParent{
  	constructor (scene,group) {
	    super(0,0,scene,"enemyAtlas","big_zombie_idle_anim_f0.png",group);
	   	var delay = Math.floor(Math.random() * 4000) + 1000;  // returns a random integer from 1 to 10
	    this.movmentTimer = this.scene.time.addEvent({ delay: delay, callback: this.timerEvent, callbackScope: this, loop: false });
	}
    createAnimations(){
		var idleAnim = this.scene.anims.generateFrameNames('enemyAtlas', {
	        start: 0, end: 3,
	        prefix: 'big_zombie_idle_anim_f', suffix: '.png'
	    });

	    var walkAnim = this.scene.anims.generateFrameNames('enemyAtlas', {
	        start: 0, end: 3,
	        prefix: 'big_zombie_run_anim_f', suffix: '.png'
	    });

		this.scene.anims.create({
	        key: 'bigZombieIdle',
	        frames: idleAnim,
	        frameRate: 8,
	        repeat: -1
	    });

	    this.scene.anims.create({
	        key: 'bigZombieWalk',
	        frames: walkAnim,
	        frameRate: 8,
	        repeat: -1
	    });
  	}
  	playIdleAnimation(){
  		this.play('bigZombieIdle',true);
  	}

  	playWalkingAnimation(){
  		this.play('bigZombieWalk',true);
  	}

  	setVelocity(){
        var vX = (Math.floor(Math.random() * (40))+20);
        var vY = (Math.floor(Math.random() * (40))+20);
        // sets negative 50% of the time
        vX *= Math.floor(Math.random()*2) == 1 ? 1 : -1;
        vY *= Math.floor(Math.random()*2) == 1 ? 1 : -1;
  
        this.body.setVelocity(vX, vY);
        this.playWalkingAnimation();
    }

    stopVelocity(){
    	var vX = 0
        var vY = 0
  
        this.body.setVelocity(vX, vY);
        this.playIdleAnimation();
    }

    timerEvent(){
    	var delay = 0;
    	this.movmentTimer.remove();
    	if(this.body.velocity.x == 0 && this.body.velocity.y == 0){
    		this.body.immovable=false;
    		this.setVelocity();
    		delay = Math.floor(Math.random() * 7000) + 2000;  // returns a random integer from 1 to 10
    	}else{
    		this.stopVelocity();
    		this.body.immovable=true;
    		delay = 2000;
    	}
    	this.movmentTimer = this.scene.time.addEvent({ delay: delay, callback: this.timerEvent, callbackScope: this, loop: false });
    }

    beforeDestroy(){
    	this.movmentTimer.remove();
    }
}