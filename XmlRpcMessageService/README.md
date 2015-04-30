# XmlRpcMessageService

A service for creating [XML-RPC](http://xmlrpc.scripting.com/spec.html)'s method call XML from a simple JavaScript object, and parsing method response XML to a JavaScript object.
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
  XmlRpcMessageService.execMethodCall(url, methodCall, function(mr) { methodResponse = mr; });
  var token = methodResponse.params[0].token;
  Logger.log('Logged in. Token: ' + token);
  return token;
}
```

A more simple API can be achieved using service binding. In this option, a service object is created with binding to a server URL. The service object then has native JavaScript functions for each remote server method. Calling a remote method is simple as calling any other JavaScript function. The example above can be changed to:
```javascript
var url = "http://api.opensubtitles.org/xml-rpc";
var service = XmlRpcMessageService.bind(url);
var result = service.LogIn("", "", "he", "OS Test User Agent");
var token = result.token;
```
This is done with the following assumptions:
* The server supports the `system.listMethods` method.  
  If this is not true, the array of method names can be given as the 2nd argument to the `bind` method.
* The response contains at most one `param` element (if not a `fault` response).
* Any fault response is handled as an `Error` and is thrown.
