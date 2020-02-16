keyPickupCollision = function(player,key){
    player.scene.sound.play('keyPickupSound');
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

openDoorCollision = function(player,door){
    if(player.hasKey){
        player.scene.sound.play("openDoor");
        player.hasKey = false;
        door.layer.tilemapLayer.setAlpha(0);
        var closedDoorCollision = player.scene.physics.world.colliders.getActive().find(function(i){
            return i.name == 'closedDoor'
        })
        player.scene.physics.world.removeCollider(closedDoorCollision);
        player.key.destroy();

        var level = player.scene.sys.settings.data.level;
        var lvlNumber = parseInt(level.charAt(level.length-1));
        lvlNumber = lvlNumber + 1;
        player.scene.scene.restart({level:"level_" + lvlNumber,playerLife:player.getLife()});
    }
}

enemyCollision = function(player,enemy){
    let damageSound = player.scene.sound.play('damageSound');
    var pickup = player.scene.physics.add.collider(player, player.key, keyPickupCollision);
    const map = player.scene.make.tilemap({ key: "mainGame" });
    pickup.setName("keyPickup");
    enemy.destroy();
    if(player.hasKey){
        player.hasKey = false;
        player.key.picked = false;
        player.key.body.setVelocityY(0);
        player.key.body.setVelocityX(0);
        player.key.x = player.x;
        player.key.y = player.y;
    }
    player.setStartingPosition(map);
    player.life--;
    player.scene.events.emit('player_damage_taken', player.getLife());
}