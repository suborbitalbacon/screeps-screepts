var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var tower = require('tower');
var screepsPerRole = {'harvester':2, 'upgrader':5, 'builder':6};
var SPAWN_NAME = 'Spawn1'

module.exports.loop = function () {

    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }

	for(var role in screepsPerRole){
		var numScreeps = _.filter(Game.creeps, (creep) => creep.memory.role == role);
		if(numScreeps.length < screepsPerRole[role]) {
            if(Game.spawns[SPAWN_NAME].store.getCapacity(RESOURCE_ENERGY) >= 300 || !Game.spawns[SPAWN_NAME].spawning){
                var newName = role + Game.time;
                console.log('Spawning new ' + role + ': ' + newName);
                Game.spawns[SPAWN_NAME].spawnCreep([WORK,CARRY,MOVE], newName, 
                    {memory: {'role': role}});
            }
		}
	}
    
    if(Game.spawns[SPAWN_NAME].spawning) { 
        var spawningCreep = Game.creeps[Game.spawns[SPAWN_NAME].spawning.name];
        Game.spawns[SPAWN_NAME].room.visual.text(
            '🛠️' + spawningCreep.memory.role,
            Game.spawns[SPAWN_NAME].pos.x + 1,
            Game.spawns[SPAWN_NAME].pos.y, 
            {align: 'left', opacity: 0.8});
    }

   var towers = Game.spawns.Spawn1.room.find(FIND_STRUCTURES, {filter: {structureType: STRUCTURE_TOWER, my: true}});
   towers.forEach(tower.run);

    for(var name in Game.creeps) {
		var creep = Game.creeps[name];
		
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
		}
		if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
    }
}