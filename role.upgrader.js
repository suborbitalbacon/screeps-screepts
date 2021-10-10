var screepToolkit = require('get_energy');
var roleUpgrader = {
    /** @param {Creep} creep **/
    run: function(creep) {
        if(typeof creep.memory.upgrading == 'undefined'){
            creep.memory.upgrading = false;
        }
        

        if(creep.memory.upgrading && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.upgrading = false;
            creep.say('🔄 harvest');
	    }
	    if(!creep.memory.upgrading && creep.store.getFreeCapacity() == 0) {
	        creep.memory.upgrading = true;
	        creep.say('⚡ upgrade');
	    }

	    if(creep.memory.upgrading) {
            var range = creep.pos.getRangeTo(creep.room.controller);
            if (range > 1) {
                creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffffff'}});
            }
            if (range <= 3) {
                creep.upgradeController(creep.room.controller);
            }
        }
        else {
            screepToolkit.getEnergy(creep)
        }
	}
};

module.exports = roleUpgrader;