var screepToolkit = {
    //TODO:choose source better
    /** @param {Creep} creep **/
    getEnergy: function(creep) {
        var closest_source = creep.pos.findClosestByRange(FIND_SOURCES);
        if(creep.harvest(closest_source) == ERR_NOT_IN_RANGE) {
            creep.moveTo(closest_source, {visualizePathStyle: {stroke: '#ffaa00'}});
        }
    }
};

module.exports = screepToolkit;