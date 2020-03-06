class Elf extends EnemyParent{
  	constructor (scene,group) {
  		super(0,0,scene,"enemyAtlas","elf_f_idle_anim_f0.png",group);
  		this.area;
	}
    createAnimations(){
    	var gender = Math.round(Math.random());
    	if(gender == 1){
    		this.gender = "m";
    	}
    	else{
    		this.gender = "f";
    	}
		var idleAnim = this.scene.anims.generateFrameNames('enemyAtlas', {
	        start: 0, end: 3,
	        prefix: 'elf_' + this.gender + '_idle_anim_f', suffix: '.png'
	    });

	    var walkAnim = this.scene.anims.generateFrameNames('enemyAtlas', {
	        start: 0, end: 3,
	        prefix: 'elf_' + this.gender + '_run_anim_f', suffix: '.png'
	    });

		this.scene.anims.create({
	        key: 'elf' + this.gender + 'Idle',
	        frames: idleAnim,
	        frameRate: 8,
	        repeat: -1
	    });

	    this.scene.anims.create({
	        key: 'elf' + this.gender + 'Walk',
	        frames: walkAnim,
	        frameRate: 8,
	        repeat: -1
	    });
  	}
  	playIdleAnimation(){
  		this.play('elf' + this.gender + 'Idle',true);
  	}

  	playWalkingAnimation(){
  		this.play('elf' + this.gender + 'Walk',true);
  	}

  	setAreaEffect(player){
  		this.area = this.scene.physics.add.image(this.x, this.y,"enemyAtlas",'elf_f_idle_anim_f0.png');
  		this.area.setCircle(80,-40 + -this.width*2,-38 + - this.height);
  		this.area.setAlpha(0);
  		this.area.elf = this;
  		this.scene.physics.add.overlap(this.area, player,elfAreaCollision);
  	}

    update(time, delta) {
    	if(this.area!=null){
    		this.area.x = this.x;
    		this.area.y = this.y;
    	}
        if(this.body.velocity.x < 0){
            this.setFlipX(true);
        }else{
            this.setFlipX(false);
        }
    }

    destroy(){
    	if(this.area!=null){
    		this.area.destroy();
    		this.area = null;
    	}
    	super.destroy();
    }
}