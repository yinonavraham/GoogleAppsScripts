//NOTE: This method does not work with null values!

function semanticToMethodCallObj_(semanticMethodCall) {
  var methodCall = {};
  methodCall.methodName = semanticMethodCall.methodName;
  methodCall.params = [];
  for (var i = 0; i < semanticMethodCall.params.length; i++) {
    var value = semanticToValueObj_(semanticMethodCall.params[i]);
    methodCall.params.push(value);
  }
  return methodCall;
}

function semanticToValueObj_(semanticValue) {
  if (semanticValue == null) {
    throw new Error("null is not supported as a semantic value");
  }
  var valueType = typeof semanticValue;
  if (valueType === 'string') {
    return { type : 'string', value : semanticValue };
  } else if (valueType === 'number') {
    return { type : 'double', value : semanticValue };
  } else if (valueType === 'boolean') {
    return { type : 'boolean', value : semanticValue };
  } else if (isArray_(semanticValue)) {
    return { type : 'array', value : semanticToArrayValueObj_(semanticValue) };
  } else if (valueType === 'object') { // Must be after array since an array is an object...
    return { type : 'struct', value : semanticToStructValueObj_(semanticValue) };
  } else {
    throw new Error("Unexpected value type: " + valueType);
  }
}

function semanticToArrayValueObj_(arrayValue) {
  var arrayObj = [];
  for (var i = 0; i < arrayValue.length; i++) {
    var item = arrayValue[i];
    var valueObj = semanticToValueObj_(item);
    arrayObj.push(valueObj);
  }
  return arrayObj;
}

function semanticToStructValueObj_(obj) {
  var structObj = [];
  var props = Object.getOwnPropertyNames(obj);
  for (var i = 0; i < props.length; i++) {
    var propName = props[i];
    var valueObj = semanticToValueObj_(obj[propName]);
    var memberObj = { name : propName, value : valueObj };
    structObj.push(memberObj);
  }
  return structObj;
}