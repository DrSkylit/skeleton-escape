class EnemyParent extends Phaser.Physics.Arcade.Sprite {
    constructor (x,y,scene,textureKey,image) {
        super(scene,x,y,textureKey,image);
        this.scene = scene;
        this.createAnimations();
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.body.setCollideWorldBounds(true);
        this.playIdleAnimation();
        this.setVelocity();
        this.setBounce();
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
        const enemySpawnPoint = map.findObject("spawner", obj => obj.name === "enemySpawner");
        this.x = Math.floor(Math.random() * enemySpawnPoint.width)+enemySpawnPoint.x;
        this.y = Math.floor(Math.random() * enemySpawnPoint.height)+enemySpawnPoint.y;
    }

    setVelocity(){
        // var vX = (Math.floor(Math.random() * (250-50+1))+50);
        // var vY = (Math.floor(Math.random() * (250-50+1))+50);

        var vX = (Math.floor(Math.random() * (100))+25);
        var vY = (Math.floor(Math.random() * (100))+25);
        // sets negative 50% of the time
        vX *= Math.floor(Math.random()*2) == 1 ? 1 : -1;
        vY *= Math.floor(Math.random()*2) == 1 ? 1 : -1;
  
        this.body.setVelocity(vX, vY);
        this.playWalkingAnimation();
    }

    setBounce(){
        this.body.setBounce(1, 1);
    }

    update(time, delta) {
        if(this.body.velocity.x < 0){
            this.scaleX = 1;
            this.setFlipX(false);
        }else{
            this.scaleX = -1;
            this.setFlipX(true);
        }
    }
    
    preUpdate (time, delta) {
        // always call super when overriding preupdate
        super.preUpdate(time, delta);
        // Must Be Called in order for update to call
        this.update(time, delta); 
    }
}