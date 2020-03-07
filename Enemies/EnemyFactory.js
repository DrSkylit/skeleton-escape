class EnemyFactory{
	constructor (scene,map) {
		this.scene = scene;
		this.map = map;
	}

	createEnemy = function(enemy){
		switch(enemy){
			case "tinyZombie":
				var tinyZombie = new TinyZombie(this.scene,this.scene.enemiesGroup);
				tinyZombie.setStartingPosition(this.map);
				break;
			case "elf":
						var elf = new Elf(this.scene,this.scene.elfGroup);
						elf.setStartingPosition(this.map);
						elf.setAreaEffect(this.scene.player);
				break;
			default:
				// if somthing fails just create a tiny zombie
                var tinyZombie = new TinyZombie(this.scene,this.scene.enemiesGroup);
				tinyZombie.setStartingPosition(this.map);
		}
	}
}