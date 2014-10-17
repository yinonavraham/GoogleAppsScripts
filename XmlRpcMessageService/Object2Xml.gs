function objToMethodCallXml_(methodCallObj) { 
  //<methodCall>
  var methodCallXml = XmlService.createElement('methodCall');
  //<methodName>
  var methodNameXml = XmlService.createElement('methodName');
  methodNameXml.setText(methodCallObj.methodName);
  methodCallXml.addContent(methodNameXml);
  //<params>
  if (methodCallObj.params) { 
    var paramsXml = XmlService.createElement('params');
    for (var i = 0; i < methodCallObj.params.length; i++) {
      var valueObj = methodCallObj.params[i];
      var paramXml = XmlService.createElement('param');
      var valueXml = objToValueXml_(valueObj);
      paramXml.addContent(valueXml);
      paramsXml.addContent(paramXml);
    }
    methodCallXml.addContent(paramsXml);
  }
  var document = XmlService.createDocument(methodCallXml);
  var xml = XmlService.getPrettyFormat().format(document);
  return xml;
}

function objToValueXml_(valueObj) {
  //<value>
  var valueXml = XmlService.createElement('value');
  var dataXml;
  switch (valueObj.type) {
    case 'string' : dataXml = objToStringValueXml_(valueObj.value);  break;
    case 'double' : dataXml = objToDoubleValueXml_(valueObj.value);  break;
    case 'boolean': dataXml = objToBooleanValueXml_(valueObj.value); break;
    case 'array'  : dataXml = objToArrayValueXml_(valueObj.value);   break;
    case 'struct' : dataXml = objToStructValueXml_(valueObj.value);  break;
    default: throw new Error("Unexpected value type: " + valueObj.type);
  }
  valueXml.addContent(dataXml);
  return valueXml;
}

function objToStringValueXml_(value) {
  //<string>
  var stringXml = XmlService.createElement('string');
  stringXml.setText(value);
  return stringXml;
}

function objToDoubleValueXml_(value) {
  //<double>
  var doubleXml = XmlService.createElement('double');
  doubleXml.setText(value);
  return doubleXml;
}

function objToBooleanValueXml_(value) {
  //<boolean>
  var booleanXml = XmlService.createElement('boolean');
  booleanXml.setText(value === true ? 1 : 0);
  return booleanXml;
}

function objToArrayValueXml_(value) {
  //<array>
  var arrayXml = XmlService.createElement('array');
  //<data>
  var dataXml = XmlService.createElement('data');
  for (var i = 0; i < value.length; i++) {
    var item = value[i];
    var itemXml = objToValueXml_(item);
    dataXml.addContent(itemXml);
  }
  arrayXml.addContent(dataXml);
  return arrayXml;
}

function objToStructValueXml_(value) {
  //<struct>
  var structXml = XmlService.createElement('struct');
  for (var i = 0; i < value.length; i++) {
    var member = value[i];
    var memberXml = objToMemberXml_(member);
    structXml.addContent(memberXml);
  }
  return structXml;
}

function objToMemberXml_(memberObj) {
  //<member>
  var memberXml = XmlService.createElement('member');
  //<name>
  var nameXml = XmlService.createElement('name');
  nameXml.setText(memberObj.name);
  memberXml.addContent(nameXml);
  //<value>
  var valueXml = objToValueXml_(memberObj.value);
  memberXml.addContent(valueXml);
  return memberXml;
}