# XmlRcpMessageService

A service for creating XML-RCP's method call XML from a simple JavaScript object, and parsing method response XML to a JavaScript object.
This service also provides a method for posting method calls to a URL and parse the response.
For example, the following is a login method to [OpenSubtitles.org](http://www.opensubtitles.org) service:
```javascript
function login() {
  Logger.log("Logging in...");
  var methodCall = {
    methodName : "LogIn",
    params : [ "", "", "en", "OS Test User Agent" ]
  };
  var url = "http://api.opensubtitles.org/xml-rpc";
  var methodResponse;
  execMethodCall(url, methodCall, function(mr) { methodResponse = mr; });
  var token = methodResponse.params[0].token;
  Logger.log('Logged in. Token: ' + token);
  return token;
}
```