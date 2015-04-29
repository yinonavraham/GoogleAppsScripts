function semanticToMethodCallXml_(semanticMethodCall) {
  var methodCallObj = semanticToMethodCallObj_(semanticMethodCall);
  var methodCallXml = objToMethodCallXml_(methodCallObj);
  return methodCallXml;
}

function xmlToSemanticMethodResponse_(methodResponseXml) {
  var methodResponseObj = xmlToMethodResponseObj_(methodResponseXml);
  var semanticMethodResponse = objToSemanticMethodResponse_(methodResponseObj);
  return semanticMethodResponse;
}

// ###

function isArray_(o) {
  return (Object.prototype.toString.call(o) === '[object Array]');
}

function sendPostRequest_(url,xmlData,overrideOptions) {
  var options = {
    method : "post",
    contentType : "application/xml",
    payload : xmlData,
    muteHttpExceptions : true
  };
  var response = UrlFetchApp.fetch(url, options);
  return { code: response.getResponseCode(), contentText : response.getContentText() }
}

/**
 * Convert a method call object to XML string
 * @param {object} methodCall the method call descriptor - an object with the following structure: <pre>{ methodName : String, params : Array }</pre>
 * @return {string} an XML string
 */
function methodCallToXml(methodCall) {
  return semanticToMethodCallXml_(methodCall);
}

/**
 * Convert a method response XML string to an object
 * @param {string} methodResponseXml a string with the method response XML 
 * @return {object} the method response object with the structure: <pre>{ params : Array }</pre>
 */
function methodResponseFromXml(methodResponseXml) {
  return xmlToSemanticMethodResponse_(methodResponseXml);
}

/**
 * Execute a method call (synchronously)
 * @param {string} url the URL of the XML-RPC service
 * @param {object} methodCall the method call descriptor - an object with the following structure: <pre>{ methodName : String, params : Array }</pre>
 * @param {function(methodResponse)} onSuccess (optional) a callback in case of success - function(methodResponse), where methodResponse is an object with the following structure: <pre>{ params : Array }</pre>
 * @param {function(responseCode,responseBody)} onError (optional) a callback in case of an error. <pre>function(responseCode, responseBody) { ... }</pre>
 * @param {object} overrideOptions (optional) options for the POST request, to override default options (see UrlFetchApp.fetch(url, params))
 * @return {object} the response object with structure: <pre>{ code : Number, contentText : String }</pre>
 * @customfunction
 */
function execMethodCall(url,methodCall,onSuccess,onError,overrideOptions) {
  onSuccess = onSuccess || function() {};
  onError = onError || function(responseCode, responseBody) {
    Logger.log("responseCode=" + responseCode + ", responseBody=" + responseBody);
    switch (responseCode) {
      case 400: throw new Error("400- Bad request");
      case 404: throw new Error("404- Not found");
      case 401: throw new Error("401- Unauthorized");
      case 403: throw new Error("403- Forbidden");
      case 500: throw new Error("500- Internal server error");
      case 503: throw new Error("503- Service is unavailable");
      default: throw new Error("" + responseCode);
    }
  };
  Logger.log("Executing method call: %s", methodCall);
  var methodCallXml = methodCallToXml(methodCall);
  //Send the post request
  var responseObj = sendPostRequest_(url,methodCallXml,overrideOptions);
  if (responseObj.code === 200) {
    //Parse the response xml data to get the token
    var methodResponse = methodResponseFromXml(responseObj.contentText);
    onSuccess(methodResponse);
  } else {
    onError(responseObj.code,responseObj.contentText);
  }
  return responseObj;
}
