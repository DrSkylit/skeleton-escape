class LoaderScene extends Phaser.Scene {

    constructor (){
        super('loader');
        self = this;
    }

    preload(){
        // load all tilemaps
        this.load.image("tileMapImage", "assets/tilemap/skeletonEscapeTileset.png");
        this.load.tilemapTiledJSON("mainMenu", "assets/tilemap/skeletonEscapeMainMenu.json");
        this.load.tilemapTiledJSON("mainGame", "assets/tilemap/skeletonEscapeMap.json");
        this.load.tilemapTiledJSON("hud", "assets/tilemap/hudMap.json");

        //load all atlas
        this.load.atlas('playerAtlas', 'assets/atlas/player/playersSheet.png', 'assets/atlas/player/playersSheet.json');
        this.load.atlas('enemyAtlas', 'assets/atlas/enemies/enemySheet.png', 'assets/atlas/enemies/enemySheet.json');
        this.load.atlas('pickupAtlas', 'assets/atlas/pickups/pickupSheet.png', 'assets/atlas/pickups/pickupSheet.json');

        //load Sounds
        this.load.audio('damageSound', 'assets/sounds/damageTaken.wav');
        this.load.audio('keyPickupSound', 'assets/sounds/keyPickup.wav');
        this.load.audio('selectSound', 'assets/sounds/select.wav');
        this.load.audio('openDoor', 'assets/sounds/openDoor.wav');

        this.load.audio('backgroundMusic', 'assets/sounds/castleMusic.wav');

        // add graphics for loader bar
        var progressBar = this.add.graphics();
        var progressBox = this.add.graphics();

        var width = this.cameras.main.width;
        var height = this.cameras.main.height;

        var loadingText = this.add.text(width/2,(height/2)-20,"loading...",{
            fontFamily:'Alagard',
            fontSize: '30px',
            fill: '#ffffff'
        });

        var percentText = this.add.text(width/2,(height/2)+25,"0%",{
            fontFamily:'Alagard',
            fontSize: '25px',
            fill: '#ffffff'
        });

        var assetText = this.add.text(width/2,(height/2)+70,"",{
            fontFamily:'Alagard',
            fontSize: '25px',
            fill: '#ffffff'
        })

        progressBox.fillStyle(0x222222, 0.8);
        progressBox.fillRect(width/2-160, height/2, 320, 50);

        percentText.setOrigin(0.5, 0.5);
        loadingText.setOrigin(0.5, 0.5);
        assetText.setOrigin(0.5, 0.5);

        // Load functions for proggress bar
        this.load.on('progress', function (value) {
            progressBar.clear();
            progressBar.fillStyle(0xffffff, 1);
            progressBar.fillRect(width/2-150, height/2 + 10, 300 * value, 30);

            percentText.setText(parseInt(value * 100) + '%');
        });
                    
        this.load.on('fileprogress', function (file) {
            assetText.setText('Loading asset: ' + file.key);
        });
         
        this.load.on('complete', function () {
            loadingText.setText("Complete");
            assetText.destroy();
            self.scene.start('MainMenu');
        });
    }

    create (){

    }

    update(){

    }
}
