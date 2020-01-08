class PlayerParent extends Phaser.Physics.Arcade.Sprite {
  	constructor (x,y,scene,textureKey,image) {
	    super(scene,x,y,textureKey,image);
	    this.scene = scene;
	    this.life = 3;
        this.vX = 100;
        this.vY = 100;
        this.hasKey = false;
        this.key = null;
	    this.scene.add.existing(this);
	    this.scene.physics.add.existing(this);
	    this.body.immovable=true;
	    this.body.setCollideWorldBounds(true);
        this.cursors = this.scene.input.keyboard.createCursorKeys();
        this.setDepth(1);
	    this.createAnimations();
	    this.playIdleAnimation();
  	}
  	setLife(life){
  		this.life = life; 
  	}

  	createAnimations(){
  		console.log("function addAnimations needs to be called");
  	}
  	
  	playIdleAnimation(){
  		console.log("function playIdleAnimation needs to be called");
  	}

    playWalkingAnimation(){
        console.log("function playWalkingAnimation needs to be called");
    }

  	setStartingPosition(map){
      const spawnPoint = map.findObject("spawner", obj => obj.name === "PlayerSpawn");
      this.x = spawnPoint.x
      this.y = spawnPoint.y
    }

    keyPickupCollision(player,key){
        var pickupCollision = player.scene.physics.world.colliders.getActive().find(function(i){
            return i.name == 'keyPickup'
        })
        key.picked = true;
        player.hasKey = true;
        player.key = key;
        key.x = player.x;
        key.y = player.y;
        player.scene.physics.world.removeCollider(pickupCollision);
    }

    openDoorCollision(player,door){
        player.hasKey = false;
        door.layer.tilemapLayer.setAlpha(0);
        var closedDoorCollision = player.scene.physics.world.colliders.getActive().find(function(i){
            return i.name == 'closedDoor'
        })
        player.scene.physics.world.removeCollider(closedDoorCollision);
        player.key.destroy();
    }

    update(time, delta){
        //pickups
        if(this.hasKey == true){
            this.key.body.velocity = this.body.velocity;
            this.key.x = this.x;
            this.key.y = this.y;
        }

        // player movment
        this.body.setVelocityY(0);
        this.body.setVelocityX(0);

        if (this.cursors.left.isDown) {
            this.setFlipX(true);
            this.body.setVelocityX(-this.vX);
            this.playWalkingAnimation();
        } else if (this.cursors.right.isDown) {
            this.setFlipX(false);
            this.body.setVelocityX(this.vX);
            this.playWalkingAnimation();
        }
        if (this.cursors.up.isDown) {
            this.body.setVelocityY(-this.vY);
              this.playWalkingAnimation();
        } else if (this.cursors.down.isDown) {
            this.body.setVelocityY(this.vY);
            this.playWalkingAnimation();
        }

        if(this.cursors.left.isUp && this.cursors.right.isUp && this.cursors.up.isUp && this.cursors.down.isUp){
            // Stop any previous movement from the last frame
            this.body.setVelocity(0);
            this.playIdleAnimation();
        }

        // Normalize and scale the velocity so that player can't move faster along a diagonal
        this.body.velocity.normalize().scale(this.vX);

    }

    preUpdate(time, delta){
        super.preUpdate(time, delta);
        if(this.scene.sys.config != "MainMenu"){
            this.update(time, delta);
        }
    }
}