class HudScene extends Phaser.Scene {

    constructor (){
        super('hud');
        this.heart0 = null;
        this.heart1 = null;
        this.heart2 = null;
    }

    preload(){

    }

    create (){
        const map = this.make.tilemap({ key: "hud" });
        const tileset = map.addTilesetImage("skeletonEscapeTileset", "tileMapImage");
        var mainGame = this.scene.get("MainGame");

        mainGame.events.on('player_set_hearts',function(life){
            const heart0Location = map.findObject("hudHealth", obj => obj.name === "heart0");
            const heart1Location = map.findObject("hudHealth", obj => obj.name === "heart1");
            const heart2Location = map.findObject("hudHealth", obj => obj.name === "heart2");
            this.heart0 = this.add.image(heart0Location.x,heart0Location.y,"pickupAtlas","ui_heart_full.png");
            this.heart1 = this.add.image(heart1Location.x,heart1Location.y,"pickupAtlas","ui_heart_full.png");
            this.heart2 = this.add.image(heart2Location.x,heart2Location.y,"pickupAtlas","ui_heart_full.png");
            this.heart0.setScale(1.5);
            this.heart1.setScale(1.5);
            this.heart2.setScale(1.5);
        },this);

        mainGame.events.on('player_damage_taken',function(life){
            if(life == 5){
                this.heart2.setTexture("pickupAtlas","ui_heart_half.png");
            }else if(life == 4){
                this.heart2.setTexture("pickupAtlas","ui_heart_empty.png");
            }else if(life == 3){
                this.heart1.setTexture("pickupAtlas","ui_heart_half.png");
            }else if(life == 2){
                this.heart1.setTexture("pickupAtlas","ui_heart_empty.png");
            }else if(life == 1){
                this.heart0.setTexture("pickupAtlas","ui_heart_half.png");
            }else if(life == 0){
                this.heart0.setTexture("pickupAtlas","ui_heart_empty.png");
            }
        },this);

        this.input.keyboard.on('keydown_P', function (event) {
            if(this.scene.scene.isPaused("MainGame")){
                // get the main game scene
                this.scene.scene.get("MainGame").input.keyboard.resetKeys();
                this.scene.scene.run("MainGame");
            }else{
                this.scene.scene.pause("MainGame");
            }
        });
    }

    update(){

    }
}
