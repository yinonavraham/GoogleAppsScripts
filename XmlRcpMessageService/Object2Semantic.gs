function objToSemanticMethodResponse_(methodResponseObj) {
  var semanticMethodResponse = { params : [] };
  for (var i = 0; i < methodResponseObj.params.length; i++) {
    var valueObj = methodResponseObj.params[i];
    var semanticValue = objToSemanticValue_(valueObj);
    semanticMethodResponse.params.push(semanticValue);
  }
  return semanticMethodResponse;
}

function objToSemanticValue_(valueObj) {
  switch (valueObj.type) {
    case 'string' : return valueObj.value;
    case 'double' : return valueObj.value;
    case 'boolean': return valueObj.value;
    case 'array'  : return objToSemanticArray_(valueObj.value);
    case 'struct' : return objToSemanticStruct_(valueObj.value);
    default: throw new Error("Unexpected value type: " + valueObj.type);
  }
}

function objToSemanticArray_(objArray) {
  var arr = [];
  for (var i = 0; i < objArray.length; i++) {
    var value = objArray[i];
    var semanticValue = objToSemanticValue_(value);
    arr.push(semanticValue);
  }
  return arr;
}

function objToSemanticStruct_(structObj) {
  var struct = {};
  for (var i = 0; i < structObj.length; i++) {
    var member = structObj[i];
    struct[member.name] = objToSemanticValue_(member.value);
  }
  return struct;
}