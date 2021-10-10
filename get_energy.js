var screepToolkit = {
    //TODO: choose source better
    /** @param {Creep} creep **/
    getEnergy: function(creep) {
        // var closest_source = creep.pos.findClosestByRange(FIND_SOURCES);
        // if(creep.harvest(closest_source) == ERR_NOT_IN_RANGE) {
        //     creep.moveTo(closest_source, {visualizePathStyle: {stroke: '#ffaa00'}});
        // return true;
        // }
        
        if(typeof creep.memory.source == 'undefined'){
			var sources = creep.room.find(FIND_SOURCES);
			var num_sources = sources.length;
			var num_creeps = creep.room.find(FIND_MY_CREEPS).length;
			var check=[];
				sources.forEach(function(srs){
					var tmp = creep.room.find(FIND_MY_CREEPS, {filter: (s) => s.memory.source == srs.id})
					if(tmp = '' || tmp.length < (num_creeps/num_sources) ){
						creep.memory.source = srs.id;
				}
			});
		}
        
        var container = creep.pos.findClosestByPath(FIND_STRUCTURES,{filter: (s) => s.structureType == STRUCTURE_CONTAINER && s.store[RESOURCE_ENERGY] > 0});
        var source = creep.pos.findClosestByPath(FIND_SOURCES,{filter: (s) => s.id == creep.memory.source});
        if (creep.harvest(container) == ERR_NOT_IN_RANGE) {
            creep.moveTo(container, {visualizePathStyle: {stroke: '#ff9900'}});
            return true;
        }
        if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
            creep.moveTo(source, {visualizePathStyle: {stroke: '#ff9900'}});
            return true;
        }
    }
};

module.exports = screepToolkit;