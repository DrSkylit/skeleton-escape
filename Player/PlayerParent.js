class PlayerParent extends Phaser.Physics.Arcade.Sprite {
  	constructor (x,y,scene,textureKey,image) {
	    super(scene,x,y,textureKey,image);
	    this.scene = scene;
	    this.life = 3;

	    this.scene.add.existing(this);
	    this.scene.physics.add.existing(this);
	    this.body.immovable=true;
	    this.body.setCollideWorldBounds(true);
	    this.addAnimations();
	    this.playIdleAnimation();
  	}
  	setLife(life){
  		this.life = life; 
  	}

  	addAnimations(){
  		console.log("function addAnimations needs to be called");
  	}
  	
  	playIdleAnimation(){
  		console.log("function playIdleAnimation needs to be called");
  	}
}