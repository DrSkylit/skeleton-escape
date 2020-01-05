class EnemyParent extends Phaser.Physics.Arcade.Sprite {
    constructor (x,y,scene,textureKey,image) {
      super(scene,x,y,textureKey,image);
      this.scene = scene;

      this.scene.add.existing(this);
      this.scene.physics.add.existing(this);
      this.body.setCollideWorldBounds(true);
      this.createAnimations();
      this.playIdleAnimation();
    }

    createAnimations(){
      console.log("function addAnimations needs to be called");
    }
    
    playIdleAnimation(){
      console.log("function playIdleAnimation needs to be called");
    }
}