function xmlToMethodResponseObj_(xml) {
  var document = XmlService.parse(xml);
  var methodResponseXml = document.getRootElement();
  var methodResponseObj = {};
  var paramsXml = methodResponseXml.getChild('params');
  if (paramsXml) {
    methodResponseObj.params = [];
    var paramsXmlChildren = paramsXml.getChildren('param');
    for (var i = 0; i < paramsXmlChildren.length; i++) {
      var paramXml = paramsXmlChildren[i];
      var valueXml = paramXml.getChild('value');
      var valueObj = xmlToValueObj_(valueXml);
      methodResponseObj.params.push(valueObj);
    }
  }
  return methodResponseObj;
}

function xmlToValueObj_(valueXml) {
  var valueObj = {};
  var dataXml = valueXml.getChildren()[0];
  var typeName = dataXml.getName();
  switch (typeName) {
    case 'string': valueObj.type = 'string';   valueObj.value = xmlToStringValueObj_(dataXml);  break;
    case 'double': valueObj.type = 'double';   valueObj.value = xmlToDoubleValueObj_(dataXml);  break;
    case 'boolean': valueObj.type = 'boolean'; valueObj.value = xmlToBooleanValueObj_(dataXml); break;
    case 'array':  valueObj.type = 'array';    valueObj.value = xmlToArrayValueObj_(dataXml);   break;
    case 'struct': valueObj.type = 'struct';   valueObj.value = xmlToStructValueObj_(dataXml);  break;
    default: throw new Error("Unexpected data type: " + typeName);
  }
  return valueObj;
}

function xmlToStringValueObj_(stringXml) {
  return stringXml.getText();
}

function xmlToDoubleValueObj_(doubleXml) {
  return parseFloat(doubleXml.getText());
}

function xmlToBooleanValueObj_(booleanXml) {
  var text = booleanXml.getText();
  return text === "true" || text === "1";
}

function xmlToArrayValueObj_(arrayXml) {
  var arrayValue = [];
  var dataXml = arrayXml.getChild('data');
  var valueXmls = dataXml.getChildren('value');
  for (var i = 0; i < valueXmls.length; i++) {
    var valueXml = valueXmls[i];
    var valueObj = xmlToValueObj_(valueXml);
    arrayValue.push(valueObj);
  }
  return arrayValue;
}

function xmlToStructValueObj_(structXml) {
  var membersArray = [];
  var memberXmls = structXml.getChildren('member');
  for (var i = 0; i < memberXmls.length; i++) {
    var memberXml = memberXmls[i];
    var memberObj = xmlToMemberObj_(memberXml);
    membersArray.push(memberObj);
  }
  return membersArray;
}

function xmlToMemberObj_(memberXml) {
  var memberObj = {};
  var nameXml = memberXml.getChild('name');
  memberObj.name = nameXml.getText();
  var valueXml = memberXml.getChild('value');
  memberObj.value = xmlToValueObj_(valueXml);
  return memberObj;
}