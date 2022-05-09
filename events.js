// Create event instance
const EventEmitter = require("events");
const emitter = new EventEmitter();

module.exports.emitter = emitter;

// Raises myEvent
module.exports.emitMyEvent = (input, output, sum, multiplier) =>{
  return emitter.emit("myEvent", {
    input, 
    output:`${output.n1} ${output.n2}`, 
    sum, 
    multiplier 
  });
};