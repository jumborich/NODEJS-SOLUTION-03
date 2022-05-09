// Create event instance
const events = require("./events");
const sumMultiples = require("./multiples");

// Define event args
const n1 = "500", n2 = "1200";
const input = `${n1} ${n2}`;
const output = {n1, n2};
const sum = 0;
const multiplier = 1;

// Listen for event
events.emitter.on("myEvent", logInfo)

// Raise event
events.emitMyEvent(input, output, sum, multiplier)

// Log multiples
function logInfo(eventArgs){
  const { input, output, sum, multiplier } = eventArgs;
  console.log("Multiples: ",  output);

  sumMultiples(input, sum, multiplier);
};