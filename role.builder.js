var screepToolkit = require('get_energy');
var roleBuilder = {
    

    /** @param {Creep} creep **/
    run: function(creep) {
        const REPAIR_THRESHOLD = 0.7

        if(typeof creep.memory.building == 'undefined'){
            creep.memory.building = false;
        }

	    if(creep.memory.building && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.building = false;
            creep.say('🔄 harvest');
	    }
	    if(!creep.memory.building && creep.store.getFreeCapacity() == 0) {
	        creep.memory.building = true;
	        creep.say('🚧 build');
	    }

	    if(creep.memory.building) {
	        var needs_repair = creep.room.find(FIND_STRUCTURES, {filter: (i) => i.hits < i.hitsMax/REPAIR_THRESHOLD})
	        var needs_build = creep.room.find(FIND_MY_CONSTRUCTION_SITES);
	        if(needs_build.length) {
                var target = creep.pos.findClosestByRange(needs_build)
                var range = creep.pos.getRangeTo(target);
                if (range > 1) {
                    creep.moveTo(target, {visualizePathStyle: {stroke: '#fce747'}});
                }
                if (range <= 3) {
                    creep.build(target);
                }
            } else if(needs_repair.length) {
                var target = creep.pos.findClosestByRange(needs_repair)
                var range = creep.pos.getRangeTo(target);
                if (range > 1) {
                    creep.moveTo(target, {visualizePathStyle: {stroke: '#fce747'}});
                }
                if (range <= 3) {
                    creep.repair(target);
                }
            }
            // TODO: else wait in out of way place
            
	    }
	    else {
	        screepToolkit.getEnergy(creep)
	    }
	}
};

module.exports = roleBuilder;