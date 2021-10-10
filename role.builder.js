var screepToolkit = require('get_energy');
var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {
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
	        var needs_repair = creep.room.find(FIND_STRUCTURES, {filter: (i) => i.ticksToDecay < 500})
	        var targets = creep.room.find(FIND_MY_CONSTRUCTION_SITES);
	        
            if(needs_repair.length) {
                if(creep.build(needs_repair[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(needs_repair[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            } else if(targets.length) {
                if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#fce747'}});
                }
            }
	    }
	    else {
	        screepToolkit.getEnergy(creep)
	    }
	}
};

module.exports = roleBuilder;