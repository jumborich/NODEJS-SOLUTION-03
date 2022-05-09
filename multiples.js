const events = require("./events")

function isWithinLimit (n, multiplier, limit){ return n * multiplier <= limit} ;

function extractN1N2(input){
  let [ n1, n2 ] = input.trim().split(" ");
  return [parseInt(n1), parseInt(n2)]
};

function endEvent (sum){
  const id = setTimeout(() => {
    console.log(sum);
    events.emitter.removeAllListeners("myEvent");
    clearTimeout(id)
  }, 2000);
};

// Emits for only n1 or n2
function continueEvent(
  n1, n2, n1Multiple, 
  n2Multiple, sum, multiplier, 
){
  multiplier++;
  return events.emitMyEvent(`${n1} ${n2}`, {n1:n1Multiple, n2:n2Multiple }, sum, multiplier)
}

// Check to emit events
function continueEvents (n1, n2, sum, multiplier, limit){
  let n1Multiple = n1, n2Multiple = n2;

  const n1WithinLimit = isWithinLimit(n1, multiplier, limit);
  const n2WithinLimit = isWithinLimit(n2, multiplier, limit);

  if(n1WithinLimit) n1Multiple = n1 * multiplier;
  if(n2WithinLimit) n2Multiple = n2 * multiplier;

  if(n1WithinLimit && n2WithinLimit){
    sum += n1Multiple + n2Multiple;
    return continueEvent(n1, n2, n1Multiple, n2Multiple, sum, multiplier);
  }
  
  if(n1WithinLimit){
    sum += n1Multiple;
    return continueEvent(n1, n2, n1Multiple, n2Multiple, sum, multiplier)
  }
  
  if(n2WithinLimit <= 1000){
    sum += n2Multiple;
    continueEvent(n1, n2, n1Multiple, n2Multiple, sum, multiplier)
  };
}

// finds sum of multiples of n1 and n2
module.exports = ( value, sum, multiplier ) => {
  const [n1, n2] = extractN1N2(value);
  const limit = 1000;
  const minValue = Math.min(n1, n2);

  if(multiplier > limit / minValue) // break case
    return endEvent(sum)

  continueEvents(n1, n2, sum, multiplier, limit);
};